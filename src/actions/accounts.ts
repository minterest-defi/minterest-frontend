import keyring from '@polkadot/ui-keyring';
import {
	CHECK_IS_ADMIN_ERROR,
	CHECK_IS_ADMIN_START,
	CHECK_IS_ADMIN_SUCCESS,
	SET_CURRENT_ACCOUNT,
} from './types';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { Dispatch } from '../util/types';
import config from '../config';
import API from '../services';

export function loadAccounts() {
	return async (dispatch: Dispatch) => {
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

export const setAccount = (account: string) => {
	return {
		type: SET_CURRENT_ACCOUNT,
		payload: account,
	};
};

export function checkIsAdmin(account: string) {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: CHECK_IS_ADMIN_START });
			// @ts-ignore
			const res = await API.rpc.accounts.isAdmin(account);
			const isAdmin = res.toString() === 'true';
			dispatch({
				type: CHECK_IS_ADMIN_SUCCESS,
				payload: isAdmin,
			});
		} catch (err) {
			dispatch({
				type: CHECK_IS_ADMIN_ERROR,
				payload: err.toString(),
			});
		}
	};
}
