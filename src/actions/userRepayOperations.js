import { web3FromAddress } from '@polkadot/extension-dapp';
import {
	REPAY_ALL_REQUEST_START,
	REPAY_ALL_REQUEST_ERROR,
	REPAY_ALL_REQUEST_SUCCESS,
	REPAY_REQUEST_START,
	REPAY_REQUEST_ERROR,
	REPAY_REQUEST_SUCCESS,
	REPAY_ON_BEHALF_REQUEST_START,
	REPAY_ON_BEHALF_REQUEST_ERROR,
	REPAY_ON_BEHALF_REQUEST_SUCCESS,
} from './types';
import API from '../services';

export function repayAll(account, keyring, asset) {
	return async (dispatch) => {
		const callBack = ({ event = [], status }) => {
			dispatch({
				type: REPAY_ALL_REQUEST_SUCCESS,
				payload: { event, status },
			});
		};

		try {
			dispatch({ type: REPAY_ALL_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.repayAll(asset)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.repayAll(asset)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({ type: REPAY_ALL_REQUEST_ERROR });
		}
	};
}

export function repay(account, keyring, asset, amount) {
	return async (dispatch) => {
		const callBack = ({ event = [], status }) => {
			dispatch({
				type: REPAY_REQUEST_SUCCESS,
				payload: { event, status },
			});
		};

		try {
			dispatch({ type: REPAY_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.repay(asset, amount)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.repay(asset, amount)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({ type: REPAY_REQUEST_ERROR });
		}
	};
}

export function repayOnBehalf(account, keyring, asset, publickKey, amount) {
	return async (dispatch) => {
		const callBack = ({ event = [], status }) => {
			dispatch({
				type: REPAY_ON_BEHALF_REQUEST_SUCCESS,
				payload: { event, status },
			});
		};

		try {
			dispatch({ type: REPAY_ON_BEHALF_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.repayOnBehalf(asset, publickKey, amount)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.repayOnBehalf(asset, publickKey, amount)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({ type: REPAY_ON_BEHALF_REQUEST_ERROR });
		}
	};
}
