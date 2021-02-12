// import {} from '../services';
// import {} from './types';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import config from '../config';
import keyring from '@polkadot/ui-keyring';

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
