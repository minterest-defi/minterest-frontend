import { web3FromAddress } from '@polkadot/extension-dapp';
import API from '../services';
import { Dispatch } from '../util/types';
import {
	SET_BASE_RATE_PER_YEAR_REQUEST_START,
	SET_BASE_RATE_PER_YEAR_REQUEST_ERROR,
	SET_BASE_RATE_PER_YEAR_REQUEST_SUCCESS,
	SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_START,
	SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_SUCCESS,
	SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_ERROR,
	SET_KINK_REQUEST_START,
	SET_KINK_REQUEST_ERROR,
	SET_KINK_REQUEST_SUCCESS,
	SET_MULTIPLIER_PER_YEAR_REQUEST_START,
	SET_MULTIPLIER_PER_YEAR_REQUEST_ERROR,
	SET_MULTIPLIER_PER_YEAR_REQUEST_SUCCESS,
	RESET_ECONOMIC_UPDATE_REQUESTS,
	FEED_VALUES_REQUEST_START,
	FEED_VALUES_REQUEST_SUCCESS,
	FEED_VALUES_REQUEST_ERROR,
	LOCK_PRICE_REQUEST_START,
	LOCK_PRICE_REQUEST_SUCCESS,
	LOCK_PRICE_REQUEST_ERROR,
	UNLOCK_PRICE_REQUEST_START,
	UNLOCK_PRICE_REQUEST_SUCCESS,
	UNLOCK_PRICE_REQUEST_ERROR,
	SET_DEVIATION_THRESHOLD_START,
	SET_DEVIATION_THRESHOLD_ERROR,
	SET_DEVIATION_THRESHOLD_SUCCESS,
	SET_BALANCE_RATIO_START,
	SET_BALANCE_RATIO_ERROR,
	SET_BALANCE_RATIO_SUCCESS,
	SET_BORROW_CAP_START,
	SET_BORROW_CAP_ERROR,
	SET_BORROW_CAP_SUCCESS,
	SET_BALANCING_PERIOD_SUCCESS,
	SET_BALANCING_PERIOD_ERROR,
	SET_BALANCING_PERIOD_START,
	SET_INSURANCE_FACTOR_START,
	SET_INSURANCE_FACTOR_SUCCESS,
	SET_INSURANCE_FACTOR_ERROR,
	SET_COLLATERAL_FACTOR_REQUEST_ERROR,
	SET_COLLATERAL_FACTOR_REQUEST_START,
	SET_COLLATERAL_FACTOR_REQUEST_SUCCESS,
	SET_THRESHOLD_REQUEST_ERROR,
	SET_THRESHOLD_REQUEST_SUCCESS,
	SET_THRESHOLD_REQUEST_START,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_ERROR,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_START,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_SUCCESS,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_START,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_SUCCESS,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_ERROR,
	SWITCH_MODE_START,
	SWITCH_MODE_ERROR,
	SWITCH_MODE_SUCCESS,
	PAUSE_SPECIFIC_OPERATION_START,
	PAUSE_SPECIFIC_OPERATION_SUCCESS,
	PAUSE_SPECIFIC_OPERATION_ERROR,
	UNPAUSE_SPECIFIC_OPERATION_START,
	UNPAUSE_SPECIFIC_OPERATION_SUCCESS,
	UNPAUSE_SPECIFIC_OPERATION_ERROR,
	SET_MNT_RATE_FOR_SIDE_START,
	SET_MNT_RATE_FOR_SIDE_SUCCESS,
	SET_MNT_RATE_FOR_SIDE_ERROR,
	GET_MNT_RATE_START,
	GET_MNT_RATE_SUCCESS,
	GET_MNT_RATE_ERROR,
	GET_MNT_SPEED_START,
	GET_MNT_SPEED_SUCCESS,
	GET_MNT_SPEED_ERROR,
	ENABLE_MNT_MINTING_ERROR,
	ENABLE_MNT_MINTING_START,
	ENABLE_MNT_MINTING_SUCCESS,
	DISABLE_MNT_MINTING_START,
	DISABLE_MNT_MINTING_SUCCESS,
	DISABLE_MNT_MINTING_ERROR,
} from './types';
import { UNDERLYING_ASSETS_TYPES } from '../util/constants';
import {
	txCallback,
	convertToTokenValue,
	convertInputToPercent,
} from '../util';

export function setBaseRatePerYear(
	account: string,
	keyring: any,
	poolId: string,
	baseRatePerYear: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				SET_BASE_RATE_PER_YEAR_REQUEST_SUCCESS,
				SET_BASE_RATE_PER_YEAR_REQUEST_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: SET_BASE_RATE_PER_YEAR_REQUEST_START });
			const currentUser = keyring.getPair(account);
			const convertBaseRatePerYear = convertInputToPercent(baseRatePerYear);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.minterestModel.setBaseRatePerYear(
							poolId,
							convertBaseRatePerYear
						)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.minterestModel.setBaseRatePerYear(
							poolId,
							convertBaseRatePerYear
						)
					)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_BASE_RATE_PER_YEAR_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function setJumpMultiplierPerYear(
	account: string,
	keyring: any,
	poolId: string,
	jumpMultiplierRatePerYear: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_SUCCESS,
				SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_START });
			const currentUser = keyring.getPair(account);
			const convertJumpMultiplierRatePerYear = convertInputToPercent(
				jumpMultiplierRatePerYear
			);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.minterestModel.setJumpMultiplierPerYear(
							poolId,
							convertJumpMultiplierRatePerYear
						)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.minterestModel.setJumpMultiplierPerYear(
							poolId,
							convertJumpMultiplierRatePerYear
						)
					)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function setKink(
	account: string,
	keyring: any,
	poolId: string,
	kink: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SET_KINK_REQUEST_SUCCESS, SET_KINK_REQUEST_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SET_KINK_REQUEST_START });
			const currentUser = keyring.getPair(account);
			const convertKink = convertInputToPercent(kink);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.minterestModel.setKink(poolId, convertKink))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.minterestModel.setKink(poolId, convertKink))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({ type: SET_KINK_REQUEST_ERROR, payload: err.toString() });
		}
	};
}

export function setMultiplierPerYear(
	account: string,
	keyring: any,
	poolId: string,
	multiplierRatePerYear: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				SET_MULTIPLIER_PER_YEAR_REQUEST_SUCCESS,
				SET_MULTIPLIER_PER_YEAR_REQUEST_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: SET_MULTIPLIER_PER_YEAR_REQUEST_START });
			const currentUser = keyring.getPair(account);
			const convertMultiplierPerYear = convertInputToPercent(
				multiplierRatePerYear
			);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.minterestModel.setMultiplierPerYear(
							poolId,
							convertMultiplierPerYear
						)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.minterestModel.setMultiplierPerYear(
							poolId,
							convertMultiplierPerYear
						)
					)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_MULTIPLIER_PER_YEAR_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export const resetEconomicUpdateRequests = () => {
	return {
		type: RESET_ECONOMIC_UPDATE_REQUESTS,
	};
};

export const feedValues = (account: string, keyring: any, values: any) => {
	const newValues = values.map((item: any) => [
		item.currencyId,
		convertToTokenValue(item.price),
	]);
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[FEED_VALUES_REQUEST_SUCCESS, FEED_VALUES_REQUEST_ERROR],
			dispatch
		);

		try {
			dispatch({ type: FEED_VALUES_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestOracle
					.feedValues(newValues)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestOracle
					.feedValues(newValues)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			console.log(err);
			dispatch({
				type: FEED_VALUES_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
};

export const lockPrice = (
	account: string,
	keyring: any,
	currencyId: string
) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[LOCK_PRICE_REQUEST_SUCCESS, LOCK_PRICE_REQUEST_ERROR],
			dispatch
		);

		try {
			dispatch({ type: LOCK_PRICE_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.prices.lockPrice(currencyId))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.prices.lockPrice(currencyId))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			console.log(err);
			dispatch({
				type: LOCK_PRICE_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
};

export const unlockPrice = (
	account: string,
	keyring: any,
	currencyId: string
) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[UNLOCK_PRICE_REQUEST_SUCCESS, UNLOCK_PRICE_REQUEST_ERROR],
			dispatch
		);

		try {
			dispatch({ type: UNLOCK_PRICE_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.prices.unlockPrice(currencyId))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.prices.unlockPrice(currencyId))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			console.log(err);
			dispatch({
				type: UNLOCK_PRICE_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
};

export function setDeviationThreshold(
	account: string,
	keyring: any,
	poolId: string,
	newThreshold: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SET_DEVIATION_THRESHOLD_SUCCESS, SET_DEVIATION_THRESHOLD_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SET_DEVIATION_THRESHOLD_START });
			const currentUser = keyring.getPair(account);
			const convertNewThreshold = convertInputToPercent(newThreshold);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.liquidationPools.setDeviationThreshold(
							poolId,
							convertNewThreshold
						)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.liquidationPools.setDeviationThreshold(
							poolId,
							convertNewThreshold
						)
					)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_DEVIATION_THRESHOLD_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function setBalanceRatio(
	account: string,
	keyring: any,
	poolId: string,
	newBalanceRatio: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SET_BALANCE_RATIO_SUCCESS, SET_BALANCE_RATIO_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SET_BALANCE_RATIO_START });
			const currentUser = keyring.getPair(account);
			const convertNewBalanceRatio = convertInputToPercent(newBalanceRatio);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.liquidationPools.setBalanceRatio(
							poolId,
							convertNewBalanceRatio
						)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.liquidationPools.setBalanceRatio(
							poolId,
							convertNewBalanceRatio
						)
					)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_BALANCE_RATIO_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function setBorrowCap(
	account: string,
	keyring: any,
	poolId: string,
	borrowCap: string | undefined
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SET_BORROW_CAP_SUCCESS, SET_BORROW_CAP_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SET_BORROW_CAP_START });
			const currentUser = keyring.getPair(account);
			const convertBorrowCap = !borrowCap
				? borrowCap
				: convertToTokenValue(borrowCap);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.controller.setBorrowCap(poolId, convertBorrowCap))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.controller.setBorrowCap(poolId, convertBorrowCap))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_BORROW_CAP_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export const setBalancingPeriod = (
	account: string,
	keyring: any,
	newPeriod: string
) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SET_BALANCING_PERIOD_SUCCESS, SET_BALANCING_PERIOD_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SET_BALANCING_PERIOD_START });
			const currentUser = keyring.getPair(account);
			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.liquidationPools.setBalancingPeriod(newPeriod)) // @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.liquidationPools.setBalancingPeriod(newPeriod))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_BALANCING_PERIOD_ERROR,
				payload: err.toString(),
			});
		}
	};
};

export function setInsuranceFactor(
	account: string,
	keyring: any,
	poolId: string,
	newAmount: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SET_INSURANCE_FACTOR_SUCCESS, SET_INSURANCE_FACTOR_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SET_INSURANCE_FACTOR_START });
			const currentUser = keyring.getPair(account);
			const convertInsuranceFactor = convertInputToPercent(newAmount);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.controller.setInsuranceFactor(poolId, convertInsuranceFactor)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.controller.setInsuranceFactor(poolId, convertInsuranceFactor)
					)
					// @ts-ignore
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

export const setCollateralFactor = (
	account: string,
	keyring: any,
	poolId: string,
	newAmount: string
) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				SET_COLLATERAL_FACTOR_REQUEST_SUCCESS,
				SET_COLLATERAL_FACTOR_REQUEST_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: SET_COLLATERAL_FACTOR_REQUEST_START });
			const currentUser = keyring.getPair(account);
			const convertCollateralFactor = convertToTokenValue(newAmount);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.controller.setCollateralFactor(
							poolId,
							convertCollateralFactor
						)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.controller.setCollateralFactor(
							poolId,
							convertCollateralFactor
						)
					)
					// @ts-ignore
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

export const setThreshold = (
	account: string,
	keyring: any,
	poolId: string,
	newAmount: string
) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SET_THRESHOLD_REQUEST_SUCCESS, SET_THRESHOLD_REQUEST_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SET_THRESHOLD_REQUEST_START });
			const currentUser = keyring.getPair(account);
			const convertThreshold = convertInputToPercent(newAmount);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.riskManager.setThreshold(poolId, convertThreshold))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.riskManager.setThreshold(poolId, convertThreshold))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_THRESHOLD_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
};

export function setLiquidationMaxAttempts(
	account: string,
	keyring: any,
	poolId: string,
	newMaxValue: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				SET_LIQUIDATIONS_MAX_ATTEMPTS_SUCCESS,
				SET_LIQUIDATIONS_MAX_ATTEMPTS_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: SET_LIQUIDATIONS_MAX_ATTEMPTS_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.riskManager.setMaxAttempts(poolId, newMaxValue))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.riskManager.setMaxAttempts(poolId, newMaxValue))
					// @ts-ignore
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

export const setLoanSizeLiquidationThreshold = (
	account: string,
	keyring: any,
	poolId: string,
	newMaxValue: string
) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_SUCCESS,
				SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.riskManager.setMinSum(poolId, newMaxValue))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.riskManager.setMinSum(poolId, newMaxValue))
					// @ts-ignore
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

export function switchMode(account: string, keyring: any) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SWITCH_MODE_SUCCESS, SWITCH_MODE_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SWITCH_MODE_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.controller.switchMode())
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.controller.switchMode())
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SWITCH_MODE_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function pauseSpecificOperation(
	account: string,
	keyring: any,
	poolId: string,
	operation: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[PAUSE_SPECIFIC_OPERATION_SUCCESS, PAUSE_SPECIFIC_OPERATION_ERROR],
			dispatch
		);

		try {
			dispatch({ type: PAUSE_SPECIFIC_OPERATION_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.controller.pauseSpecificOperation(poolId, operation))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.controller.pauseSpecificOperation(poolId, operation))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: PAUSE_SPECIFIC_OPERATION_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function unpauseSpecificOperation(
	account: string,
	keyring: any,
	poolId: string,
	operation: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[UNPAUSE_SPECIFIC_OPERATION_SUCCESS, UNPAUSE_SPECIFIC_OPERATION_ERROR],
			dispatch
		);

		try {
			dispatch({ type: UNPAUSE_SPECIFIC_OPERATION_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.controller.unpauseSpecificOperation(poolId, operation))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.controller.unpauseSpecificOperation(poolId, operation))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: UNPAUSE_SPECIFIC_OPERATION_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export const setMNTRateForSide = (
	account: string,
	keyring: any,
	rateForSide: string
) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SET_MNT_RATE_FOR_SIDE_SUCCESS, SET_MNT_RATE_FOR_SIDE_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SET_MNT_RATE_FOR_SIDE_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.mntToken.setMntRate(rateForSide))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.mntToken.setMntRate(rateForSide))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			console.log(err);
			dispatch({
				type: SET_MNT_RATE_FOR_SIDE_ERROR,
				payload: err.toString(),
			});
		}
	};
};

export const getMNTRate = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_MNT_RATE_START });

			const rate = await API.query.mntToken.mntRate();

			dispatch({
				type: GET_MNT_RATE_SUCCESS,
				payload: rate,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_MNT_RATE_ERROR,
			});
		}
	};
};
export const getMNTSpeeds = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_MNT_SPEED_START });

			const speeds = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((currencyId) =>
					API.query.mntToken.mntSpeeds(currencyId)
				)
			);
			const data = UNDERLYING_ASSETS_TYPES.reduce((old: any, item, index) => {
				old[item] = speeds[index];
				return old;
			}, {});

			dispatch({
				type: GET_MNT_SPEED_SUCCESS,
				payload: data,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_MNT_SPEED_ERROR,
			});
		}
	};
};

export const enableMNTMinting = (
	account: string,
	keyring: any,
	currencyId: string
) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[ENABLE_MNT_MINTING_SUCCESS, ENABLE_MNT_MINTING_ERROR],
			dispatch
		);

		try {
			dispatch({ type: ENABLE_MNT_MINTING_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.mntToken.enableMntMinting(currencyId))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.mntToken.enableMntMinting(currencyId))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			console.log(err);
			dispatch({
				type: ENABLE_MNT_MINTING_ERROR,
				payload: err.toString(),
			});
		}
	};
};
export const disableMNTMinting = (
	account: string,
	keyring: any,
	currencyId: string
) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[DISABLE_MNT_MINTING_SUCCESS, DISABLE_MNT_MINTING_ERROR],
			dispatch
		);

		try {
			dispatch({ type: DISABLE_MNT_MINTING_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.mntToken.disableMntMinting(currencyId))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.mntToken.disableMntMinting(currencyId))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			console.log(err);
			dispatch({
				type: DISABLE_MNT_MINTING_ERROR,
				payload: err.toString(),
			});
		}
	};
};
