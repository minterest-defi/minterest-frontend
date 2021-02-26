import { web3FromAddress } from '@polkadot/extension-dapp';
import {
	DEPOSIT_UNDERLYING_REQUEST_START,
	DEPOSIT_UNDERLYING_REQUEST_ERROR,
	DEPOSIT_UNDERLYING_REQUEST_SUCCESS,
	BORROW_REQUEST_START,
	BORROW_REQUEST_ERROR,
	BORROW_REQUEST_SUCCESS,
	REDEEM_REQUEST_START,
	REDEEM_REQUEST_ERROR,
	REDEEM_REQUEST_SUCCESS,
	REDEEM_UNDERLYING_REQUEST_START,
	REDEEM_UNDERLYING_REQUEST_ERROR,
	REDEEM_UNDERLYING_REQUEST_SUCCESS,
	REDEEM_WRAPPED_REQUEST_START,
	REDEEM_WRAPPED_REQUEST_ERROR,
	REDEEM_WRAPPED_REQUEST_SUCCESS,
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

export function depositUnderlying(
	keyring,
	account,
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
								type: DEPOSIT_UNDERLYING_REQUEST_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: DEPOSIT_UNDERLYING_REQUEST_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: DEPOSIT_UNDERLYING_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.depositUnderlying(underlyingAssetId, underlyingAmount)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.depositUnderlying(underlyingAssetId, underlyingAmount)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: DEPOSIT_UNDERLYING_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function borrow(keyring, account, underlyingAssetId, borrowAmount) {
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
								type: BORROW_REQUEST_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: BORROW_REQUEST_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: BORROW_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.borrow(underlyingAssetId, borrowAmount)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.borrow(underlyingAssetId, borrowAmount)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: BORROW_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function redeem(keyring, account, underlyingAssetId) {
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
	keyring,
	account,
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

export function redeemWrapped(keyring, account, wrappedId, wrappedAmount) {
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

export function repayAll(keyring, account, underlyingAssetId) {
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

export function repay(keyring, account, underlyingAssetId, repayAmount) {
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
	keyring,
	account,
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
