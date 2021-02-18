import { web3FromAddress } from '@polkadot/extension-dapp';
import {
	BORROW_REQUEST_START,
	BORROW_REQUEST_ERROR,
	BORROW_REQUEST_SUCCESS,
} from './types';
import API from '../services';

export function borrow(account, keyring, asset, amount) {
	return async (dispatch) => {
		const callBack = ({ event = [], status }) => {
			dispatch({
				type: BORROW_REQUEST_SUCCESS,
				payload: { event, status },
			});
		};

		try {
			dispatch({ type: BORROW_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.borrow(asset, amount)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.borrow(asset, amount)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({ type: BORROW_REQUEST_ERROR });
		}
	};
}
