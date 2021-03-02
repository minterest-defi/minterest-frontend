import { web3FromAddress } from '@polkadot/extension-dapp';
import {
	SET_INSURANCE_FACTOR_START,
	SET_INSURANCE_FACTOR_SUCCESS,
	SET_INSURANCE_FACTOR_ERROR,
	SET_COLLATERAL_FACTOR_REQUEST_ERROR,
	SET_COLLATERAL_FACTOR_REQUEST_START,
	SET_COLLATERAL_FACTOR_REQUEST_SUCCESS,
	SET_COLLATERAL_THRESHOLD_REQUEST_ERROR,
	SET_COLLATERAL_THRESHOLD_REQUEST_SUCCESS,
	SET_COLLATERAL_THRESHOLD_REQUEST_START,
	RESET_ADMIN_REQUESTS,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_ERROR,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_START,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_SUCCESS,
	GET_ADMIN_CONTROLLER_DATA_START,
	GET_ADMIN_CONTROLLER_DATA_ERROR,
	GET_ADMIN_CONTROLLER_DATA_SUCCESS,
	GET_RISK_MANAGER_DATA_START,
	GET_RISK_MANAGER_DATA_SUCCESS,
	GET_RISK_MANAGER_DATA_ERROR,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_START,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_SUCCESS,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_ERROR,
	DEPOSIT_INSURANCE_REQUEST_START,
	DEPOSIT_INSURANCE_REQUEST_ERROR,
	DEPOSIT_INSURANCE_REQUEST_SUCCESS,
	REDEEM_INSURANCE_REQUEST_START,
	REDEEM_INSURANCE_REQUEST_ERROR,
	REDEEM_INSURANCE_REQUEST_SUCCESS,
} from './types';
import API from '../services';
import { UNDERLYING_ASSETS_TYPES } from '../util/constants';

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

export function setLiquidationMaxAttempts(
	account,
	keyring,
	poolId,
	newMaxValue
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
								type: SET_LIQUIDATIONS_MAX_ATTEMPTS_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: SET_LIQUIDATIONS_MAX_ATTEMPTS_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: SET_LIQUIDATIONS_MAX_ATTEMPTS_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.riskManager
					.setMaxAttempts(poolId, newMaxValue)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.riskManager
					.setMaxAttempts(poolId, newMaxValue)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_LIQUIDATIONS_MAX_ATTEMPTS_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export const resetAdminRequests = () => {
	return {
		type: RESET_ADMIN_REQUESTS,
	};
};

export const setCollateralThreshold = (
	account,
	keyring,
	poolId,
	newAmountN,
	newAmountD
) => {
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
								type: SET_COLLATERAL_THRESHOLD_REQUEST_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: SET_COLLATERAL_THRESHOLD_REQUEST_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: SET_COLLATERAL_THRESHOLD_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.riskManager
					.setThreshold(poolId, newAmountN, newAmountD)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.riskManager
					.setThreshold(poolId, newAmountN, newAmountD)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_COLLATERAL_THRESHOLD_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
};

export const setCollateralFactor = (
	account,
	keyring,
	poolId,
	newAmountN,
	newAmountD
) => {
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
								type: SET_COLLATERAL_FACTOR_REQUEST_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: SET_COLLATERAL_FACTOR_REQUEST_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: SET_COLLATERAL_FACTOR_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.controller
					.setCollateralFactor(poolId, newAmountN, newAmountD)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.controller
					.setCollateralFactor(poolId, newAmountN, newAmountD)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_COLLATERAL_FACTOR_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
};

export const getControllerData = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: GET_ADMIN_CONTROLLER_DATA_START });

			const dataArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((asset) =>
					API.query.controller.controllerDates(asset)
				)
			);

			const initRates = UNDERLYING_ASSETS_TYPES.reduce((old, item, index) => {
				old[item] = dataArray[index];
				return old;
			}, {});

			dispatch({
				type: GET_ADMIN_CONTROLLER_DATA_SUCCESS,
				payload: initRates,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_ADMIN_CONTROLLER_DATA_ERROR,
			});
		}
	};
};

export const getRiskManagerData = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: GET_RISK_MANAGER_DATA_START });

			const dataArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((asset) =>
					API.query.riskManager.riskManagerDates(asset)
				)
			);

			const data = UNDERLYING_ASSETS_TYPES.reduce((old, item, index) => {
				old[item] = dataArray[index];
				return old;
			}, {});

			dispatch({
				type: GET_RISK_MANAGER_DATA_SUCCESS,
				payload: data,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_RISK_MANAGER_DATA_ERROR,
			});
		}
	};
};

export const setLoanSizeLiquidationThreshold = (
	account,
	keyring,
	poolId,
	newMaxValue
) => {
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
								type: SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.riskManager
					.setMinSum(poolId, newMaxValue)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.riskManager
					.setMinSum(poolId, newMaxValue)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_ERROR,
				payload: err.toString(),
			});
		}
	};
};

export function depositInsurance(account, keyring, pollId, amount) {
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
								type: DEPOSIT_INSURANCE_REQUEST_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: DEPOSIT_INSURANCE_REQUEST_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: DEPOSIT_INSURANCE_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.controller
					.depositInsurance(pollId, amount)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.controller
					.depositInsurance(pollId, amount)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: DEPOSIT_INSURANCE_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function redeemInsurance(account, keyring, pollId, amount) {
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
								type: REDEEM_INSURANCE_REQUEST_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: REDEEM_INSURANCE_REQUEST_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: REDEEM_INSURANCE_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.controller
					.redeemInsurance(pollId, amount)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.controller
					.redeemInsurance(pollId, amount)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: REDEEM_INSURANCE_REQUEST_START,
				payload: err.toString(),
			});
		}
	};
}
