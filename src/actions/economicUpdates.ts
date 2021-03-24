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
	GET_MINTEREST_MODEL_DATA_START,
	GET_MINTEREST_MODEL_DATA_SUCCESS,
	GET_MINTEREST_MODEL_DATA_ERROR,
	FEED_VALUES_REQUEST_START,
	FEED_VALUES_REQUEST_SUCCESS,
	FEED_VALUES_REQUEST_ERROR,
	LOCK_PRICE_REQUEST_START,
	LOCK_PRICE_REQUEST_SUCCESS,
	LOCK_PRICE_REQUEST_ERROR,
	UNLOCK_PRICE_REQUEST_START,
	UNLOCK_PRICE_REQUEST_SUCCESS,
	UNLOCK_PRICE_REQUEST_ERROR,
	GET_LOCKED_PRICES_START,
	GET_LOCKED_PRICES_ERROR,
	GET_LOCKED_PRICES_SUCCESS,
	GET_LIQUIDATION_POOLS_BALANCE_START,
	GET_LIQUIDATION_POOLS_BALANCE_ERROR,
	GET_LIQUIDATION_POOLS_BALANCE_SUCCESS,
	GET_LIQUIDATION_POOLS_PARAMETERS_START,
	GET_LIQUIDATION_POOLS_PARAMETERS_ERROR,
	GET_LIQUIDATION_POOLS_PARAMETERS_SUCCESS,
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
	GET_LIQUIDATION_POOL_PARAMS_START,
	GET_LIQUIDATION_POOL_PARAMS_SUCCESS,
	GET_LIQUIDATION_POOL_PARAMS_ERROR,
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

export const getMinterestModel = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_MINTEREST_MODEL_DATA_START });

			const dataArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((asset) =>
					API.query.minterestModel.minterestModelDates(asset)
				)
			);

			const initRates = UNDERLYING_ASSETS_TYPES.reduce(
				(old: any, item, index) => {
					old[item] = dataArray[index];
					return old;
				},
				{}
			);

			dispatch({
				type: GET_MINTEREST_MODEL_DATA_SUCCESS,
				payload: initRates,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_MINTEREST_MODEL_DATA_ERROR,
			});
		}
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

export const getLockedPrices = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_LOCKED_PRICES_START });

			const dataArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((currencyId) =>
					API.query.prices.lockedPrice(currencyId)
				)
			);

			const prices = UNDERLYING_ASSETS_TYPES.reduce((old: any, item, index) => {
				old[item] = dataArray[index];
				return old;
			}, {});

			dispatch({
				type: GET_LOCKED_PRICES_SUCCESS,
				payload: prices,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_LOCKED_PRICES_ERROR,
			});
		}
	};
};

export function getLiquidationPoolsBalance() {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_LIQUIDATION_POOLS_BALANCE_START });
			const accountId = API.consts.liquidationPools.liquidationPoolAccountId.toHuman();

			const dataBalanceArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((currencyId) =>
					// @ts-ignore
					API.query.tokens.accounts(accountId, currencyId)
				)
			);

			const data = UNDERLYING_ASSETS_TYPES.reduce((old: any, item, index) => {
				old[item] = dataBalanceArray[index];
				return old;
			}, {});

			dispatch({
				type: GET_LIQUIDATION_POOLS_BALANCE_SUCCESS,
				payload: data,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_LIQUIDATION_POOLS_BALANCE_ERROR,
			});
		}
	};
}

export function getLiquidationPoolsParameters() {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_LIQUIDATION_POOLS_PARAMETERS_START });

			const dataDeviationThresholdArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((currencyId) =>
					// @ts-ignore
					API.query.liquidationPools.liquidationPools(currencyId)
				)
			);

			const data = UNDERLYING_ASSETS_TYPES.reduce((old: any, item, index) => {
				old[item] = dataDeviationThresholdArray[index];
				return old;
			}, {});

			dispatch({
				type: GET_LIQUIDATION_POOLS_PARAMETERS_SUCCESS,
				payload: data,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_LIQUIDATION_POOLS_PARAMETERS_ERROR,
			});
		}
	};
}

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

export const setBalancingPeriod = (account, keyring, newPeriod) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SET_BALANCING_PERIOD_SUCCESS, SET_BALANCING_PERIOD_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SET_BALANCING_PERIOD_START });
			const currentUser = keyring.getPair(account);
			console.log(1);
			if (currentUser.isLocked) {
				console.log(2);
				const injector = await web3FromAddress(account);
				console.log(3);
				await API.tx.liquidationPools
					.setBalancingPeriod(newPeriod)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.liquidationPools
					.setBalancingPeriod(newPeriod)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
			console.log(5);
		} catch (err) {
			dispatch({
				type: SET_BALANCING_PERIOD_ERROR,
				payload: err.toString(),
			});
		}
	};
};

export const getLiquidationPoolParams = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_LIQUIDATION_POOL_PARAMS_START });
			const params = await API.query.liquidationPools.liquidationPoolParams();
			dispatch({
				type: GET_LIQUIDATION_POOL_PARAMS_SUCCESS,
				payload: params,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_LIQUIDATION_POOL_PARAMS_ERROR,
			});
		}
	};
};
