import { web3FromAddress } from '@polkadot/extension-dapp';
import {
	SET_INSURANCE_FACTOR_START,
	SET_INSURANCE_FACTOR_SUCCESS,
	SET_INSURANCE_FACTOR_ERROR,
	DEPOSIT_UNDERLYING_REQUEST_START,
	DEPOSIT_UNDERLYING_REQUEST_ERROR,
	DEPOSIT_UNDERLYING_REQUEST_SUCCESS,
	REDEEM_REQUEST_START,
	REDEEM_REQUEST_ERROR,
	REDEEM_REQUEST_SUCCESS,
	REDEEM_UNDERLYING_REQUEST_START,
	REDEEM_UNDERLYING_REQUEST_ERROR,
	REDEEM_UNDERLYING_REQUEST_SUCCESS,
	REDEEM_WRAPPED_REQUEST_START,
	REDEEM_WRAPPED_REQUEST_ERROR,
	REDEEM_WRAPPED_REQUEST_SUCCESS,
	BORROW_REQUEST_START,
	BORROW_REQUEST_ERROR,
	BORROW_REQUEST_SUCCESS,
	REPAY_ALL_REQUEST_START,
	REPAY_ALL_REQUEST_ERROR,
	REPAY_ALL_REQUEST_SUCCESS,
	REPAY_REQUEST_START,
	REPAY_REQUEST_ERROR,
	REPAY_REQUEST_SUCCESS,
	REPAY_ON_BEHALF_REQUEST_START,
	REPAY_ON_BEHALF_REQUEST_ERROR,
	REPAY_ON_BEHALF_REQUEST_SUCCESS,
	DEPOSIT_INSURANCE_REQUEST_START,
	DEPOSIT_INSURANCE_REQUEST_ERROR,
	DEPOSIT_INSURANCE_REQUEST_SUCCESS,
	REDEEM_INSURANCE_REQUEST_START,
	REDEEM_INSURANCE_REQUEST_ERROR,
	REDEEM_INSURANCE_REQUEST_SUCCESS,
} from './types';
import API from '../services';

export function setInsuranceFactor(
	account,
	keyring,
	poolId,
	newAmountN,
	newAmountD
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
								type: SET_INSURANCE_FACTOR_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: SET_INSURANCE_FACTOR_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: SET_INSURANCE_FACTOR_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.controller
					.setInsuranceFactor(poolId, newAmountN, newAmountD)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.controller
					.setInsuranceFactor(poolId, newAmountN, newAmountD)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_INSURANCE_FACTOR_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function depositUnderlying(account, keyring, asset, amount) {
	return async (dispatch) => {
		const callBack = ({ event = [], status }) => {
			dispatch({
				type: DEPOSIT_UNDERLYING_REQUEST_SUCCESS,
				payload: { event, status },
			});
		};

		try {
			dispatch({ type: DEPOSIT_UNDERLYING_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.depositUnderlying(asset, amount)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.depositUnderlying(asset, amount)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({ type: DEPOSIT_UNDERLYING_REQUEST_ERROR });
		}
	};
}

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

export function depositInsurance(account, keyring, asset, amount) {
	return async (dispatch) => {
		const callBack = ({ event = [], status }) => {
			dispatch({
				type: DEPOSIT_INSURANCE_REQUEST_SUCCESS,
				payload: { event, status },
			});
		};

		try {
			dispatch({ type: DEPOSIT_INSURANCE_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.controller
					.depositInsurance(asset, amount)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.controller
					.depositInsurance(asset, amount)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({ type: DEPOSIT_INSURANCE_REQUEST_ERROR });
		}
	};
}

export function redeemInsurance(account, keyring, asset, amount) {
	return async (dispatch) => {
		const callBack = ({ event = [], status }) => {
			dispatch({
				type: REDEEM_INSURANCE_REQUEST_SUCCESS,
				payload: { event, status },
			});
		};

		try {
			dispatch({ type: REDEEM_INSURANCE_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.controller
					.redeemInsurance(asset, amount)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.controller
					.redeemInsurance(asset, amount)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({ type: REDEEM_INSURANCE_REQUEST_ERROR });
		}
	};
}
