import { web3FromAddress } from '@polkadot/extension-dapp';
import {
	REDEEM_REQUEST_START,
	REDEEM_REQUEST_ERROR,
	REDEEM_REQUEST_SUCCESS,
	REDEEM_UNDERLYING_REQUEST_START,
	REDEEM_UNDERLYING_REQUEST_ERROR,
	REDEEM_UNDERLYING_REQUEST_SUCCESS,
	REDEEM_WRAPPED_REQUEST_START,
	REDEEM_WRAPPED_REQUEST_ERROR,
	REDEEM_WRAPPED_REQUEST_SUCCESS,
} from './types';
import API from '../services';

export function redeem(account, keyring, asset) {
	return async (dispatch) => {
		const callBack = ({ event = [], status }) => {
			dispatch({
				type: REDEEM_REQUEST_SUCCESS,
				payload: { event, status },
			});
		};

		try {
			dispatch({ type: REDEEM_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.redeem(asset)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.redeem(asset)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({ type: REDEEM_REQUEST_ERROR });
		}
	};
}

export function redeemUnderlying(account, keyring, asset, amount) {
	return async (dispatch) => {
		const callBack = ({ event = [], status }) => {
			dispatch({
				type: REDEEM_UNDERLYING_REQUEST_SUCCESS,
				payload: { event, status },
			});
		};

		try {
			dispatch({ type: REDEEM_UNDERLYING_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.redeemUnderlying(asset, amount)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.redeemUnderlying(asset, amount)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({ type: REDEEM_UNDERLYING_REQUEST_ERROR });
		}
	};
}

export function redeemWrapped(account, keyring, asset, amount) {
	return async (dispatch) => {
		const callBack = ({ event = [], status }) => {
			dispatch({
				type: REDEEM_WRAPPED_REQUEST_SUCCESS,
				payload: { event, status },
			});
		};

		try {
			dispatch({ type: REDEEM_WRAPPED_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.redeemWrapped(asset, amount)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.redeemWrapped(asset, amount)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({ type: REDEEM_WRAPPED_REQUEST_ERROR });
		}
	};
}
