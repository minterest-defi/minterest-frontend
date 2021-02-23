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

export function repayAll(account, keyring, underlyingAssetId) {
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
								type: REPAY_ALL_REQUEST_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: REPAY_ALL_REQUEST_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: REPAY_ALL_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.repayAll(underlyingAssetId)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.repayAll(underlyingAssetId)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: REPAY_ALL_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function repay(account, keyring, underlyingAssetId, repayAmount) {
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
								type: REPAY_REQUEST_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: REPAY_REQUEST_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: REPAY_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.repay(underlyingAssetId, repayAmount)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.repay(underlyingAssetId, repayAmount)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: REPAY_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function repayOnBehalf(
	account,
	keyring,
	underlyingAssetId,
	borrower,
	repayAmount
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
								type: REPAY_ON_BEHALF_REQUEST_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: REPAY_ON_BEHALF_REQUEST_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: REPAY_ON_BEHALF_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.repayOnBehalf(underlyingAssetId, borrower, repayAmount)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.repayOnBehalf(underlyingAssetId, borrower, repayAmount)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: REPAY_ON_BEHALF_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}
