import {
	CHECK_IS_ADMIN_ERROR,
	CHECK_IS_ADMIN_START,
	CHECK_IS_ADMIN_SUCCESS,
	SET_CURRENT_ACCOUNT,
} from './types';
import {
	web3Accounts,
	web3Enable,
	web3FromAddress,
} from '@polkadot/extension-dapp';
import config from '../config';
import keyring from '@polkadot/ui-keyring';
import API from '../services';

export function loadAccounts() {
	return async (dispatch) => {
		dispatch({ type: 'LOAD_KEYRING' });

		try {
			await web3Enable(config.APP_NAME);
			let allAccounts = await web3Accounts();
			allAccounts = allAccounts.map(({ address, meta }) => ({
				address,
				meta: { ...meta, name: `${meta.name} (${meta.source})` },
			}));
			keyring.loadAll(
				{ isDevelopment: config.DEVELOPMENT_KEYRING },
				allAccounts
			);
			dispatch({ type: 'SET_KEYRING', payload: keyring });
		} catch (e) {
			console.error(e);
			dispatch({ type: 'KEYRING_ERROR' });
		}
	};
}

export const setAccount = (account) => {
	return {
		type: SET_CURRENT_ACCOUNT,
		payload: account,
	};
};

export function checkIsAdmin(account, keyring) {
	return async (dispatch) => {
		const callBack = ({ events = [], status }) => {
			if (status.isFinalized) {
				events.forEach(
					({
						event: {
							method,
							section,
							data: [error],
						},
					}) => {
						if (section === 'system' && method === 'ExtrinsicSuccess') {
							dispatch({
								type: CHECK_IS_ADMIN_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: CHECK_IS_ADMIN_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: CHECK_IS_ADMIN_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.accounts
					.isAdmin()
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.accounts.isAdmin().signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: CHECK_IS_ADMIN_ERROR,
				payload: err.toString(),
			});
		}
	};
}
