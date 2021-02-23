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

export function redeem(account, keyring, underlyingAssetId) {
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
								type: REDEEM_REQUEST_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: REDEEM_REQUEST_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: REDEEM_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.redeem(underlyingAssetId)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.redeem(underlyingAssetId)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: REDEEM_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function redeemUnderlying(
	account,
	keyring,
	underlyingAssetId,
	underlyingAmount
) {
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
								type: REDEEM_UNDERLYING_REQUEST_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: REDEEM_UNDERLYING_REQUEST_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: REDEEM_UNDERLYING_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.redeemUnderlying(underlyingAssetId, underlyingAmount)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.redeemUnderlying(underlyingAssetId, underlyingAmount)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: REDEEM_UNDERLYING_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function redeemWrapped(account, keyring, wrappedId, wrappedAmount) {
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
								type: REDEEM_WRAPPED_REQUEST_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: REDEEM_WRAPPED_REQUEST_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: REDEEM_WRAPPED_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.redeemWrapped(wrappedId, wrappedAmount)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.redeemWrapped(wrappedId, wrappedAmount)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: REDEEM_WRAPPED_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}
