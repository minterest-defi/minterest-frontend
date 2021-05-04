import { web3FromAddress } from '@polkadot/extension-dapp';
import API from '../services';
import { Dispatch } from '../util/types';
import {
	RESET_LIQUIDATION_ADMIN_UPDATE_REQUESTS,
	SET_BALANCE_RATIO_START,
	SET_BALANCE_RATIO_ERROR,
	SET_BALANCE_RATIO_SUCCESS,
	SET_DEVIATION_THRESHOLD_START,
	SET_DEVIATION_THRESHOLD_ERROR,
	SET_DEVIATION_THRESHOLD_SUCCESS,
	SET_LIQUIDATION_FEE_START,
	SET_LIQUIDATION_FEE_ERROR,
	SET_LIQUIDATION_FEE_SUCCESS,
	SET_MAX_IDEAL_BALANCE_START,
	SET_MAX_IDEAL_BALANCE_ERROR,
	SET_MAX_IDEAL_BALANCE_SUCCESS,
	SET_THRESHOLD_REQUEST_START,
	SET_THRESHOLD_REQUEST_ERROR,
	SET_THRESHOLD_REQUEST_SUCCESS,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_START,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_ERROR,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_SUCCESS,
	SET_MIN_PARTIAL_LIQUIDATION_SUM_START,
	SET_MIN_PARTIAL_LIQUIDATION_SUM_ERROR,
	SET_MIN_PARTIAL_LIQUIDATION_SUM_SUCCESS,
	SET_BALANCING_PERIOD_START,
	SET_BALANCING_PERIOD_ERROR,
	SET_BALANCING_PERIOD_SUCCESS,
	SET_LIQUIDATION_POOL_TOTAL_START,
	SET_LIQUIDATION_POOL_TOTAL_SUCCESS,
	SET_LIQUIDATION_POOL_TOTAL_ERROR,
	TRANSFER_TO_LIQUIDATION_POOL_ERROR,
	TRANSFER_TO_LIQUIDATION_POOL_START,
	TRANSFER_TO_LIQUIDATION_POOL_SUCCESS,
} from './types';
import {
	txCallback,
	convertInputToPercent,
	convertToTokenValue,
} from '../util';
import { toUnderlyingCurrencyIdAPI } from '../util/cast';

export const resetLiquidationAdminUpdateRequests = () => {
	return {
		type: RESET_LIQUIDATION_ADMIN_UPDATE_REQUESTS,
	};
};

export function setBalanceRatio(
	account: string,
	keyring: any,
	underlyingAssetId: string,
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
			const castedCurrencyId = toUnderlyingCurrencyIdAPI(underlyingAssetId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.liquidationPools.setBalanceRatio(
							castedCurrencyId,
							convertNewBalanceRatio
						)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.liquidationPools.setBalanceRatio(
							castedCurrencyId,
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

export function setDeviationThreshold(
	account: string,
	keyring: any,
	underlyingAssetId: string,
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

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(underlyingAssetId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.liquidationPools.setDeviationThreshold(
							castedCurrencyId,
							convertNewThreshold
						)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.liquidationPools.setDeviationThreshold(
							castedCurrencyId,
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

export function setLiquidationFee(
	account: string,
	keyring: any,
	underlyingAssetId: string,
	liquidationFee: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SET_LIQUIDATION_FEE_SUCCESS, SET_LIQUIDATION_FEE_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SET_LIQUIDATION_FEE_START });
			const currentUser = keyring.getPair(account);
			const convertNewLiquidationIncentive = convertInputToPercent(
				liquidationFee
			);
			const castedCurrencyId = toUnderlyingCurrencyIdAPI(underlyingAssetId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.riskManager.setLiquidationFee(
							castedCurrencyId,
							convertNewLiquidationIncentive
						)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.riskManager.setLiquidationFee(
							castedCurrencyId,
							convertNewLiquidationIncentive
						)
					)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_LIQUIDATION_FEE_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function setMaxIdealBalance(
	account: string,
	keyring: any,
	underlyingAssetId: string,
	maxIdealBalance: string | undefined
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SET_MAX_IDEAL_BALANCE_SUCCESS, SET_MAX_IDEAL_BALANCE_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SET_MAX_IDEAL_BALANCE_START });
			const currentUser = keyring.getPair(account);
			const convertMaxIdealBalance = !maxIdealBalance
				? maxIdealBalance
				: convertToTokenValue(maxIdealBalance);

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(underlyingAssetId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.liquidationPools.setMaxIdealBalance(
							castedCurrencyId,
							convertMaxIdealBalance
						)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.liquidationPools.setMaxIdealBalance(
							castedCurrencyId,
							convertMaxIdealBalance
						)
					)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_MAX_IDEAL_BALANCE_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export const setThreshold = (
	account: string,
	keyring: any,
	underlyingAssetId: string,
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

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(underlyingAssetId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.riskManager.setThreshold(castedCurrencyId, convertThreshold)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.riskManager.setThreshold(castedCurrencyId, convertThreshold)
					)
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
	underlyingAssetId: string,
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

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(underlyingAssetId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.riskManager.setMaxAttempts(castedCurrencyId, newMaxValue)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.riskManager.setMaxAttempts(castedCurrencyId, newMaxValue)
					)
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

export const setMinPartialLiquidationSum = (
	account: string,
	keyring: any,
	underlyingAssetId: string,
	newMaxValue: string
) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				SET_MIN_PARTIAL_LIQUIDATION_SUM_SUCCESS,
				SET_MIN_PARTIAL_LIQUIDATION_SUM_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: SET_MIN_PARTIAL_LIQUIDATION_SUM_START });
			const currentUser = keyring.getPair(account);
			const convertNewMaxValue = convertToTokenValue(newMaxValue);

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(underlyingAssetId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.riskManager.setMinPartialLiquidationSum(
							castedCurrencyId,
							convertNewMaxValue
						)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.riskManager.setMinPartialLiquidationSum(
							castedCurrencyId,
							convertNewMaxValue
						)
					)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_MIN_PARTIAL_LIQUIDATION_SUM_ERROR,
				payload: err.toString(),
			});
		}
	};
};

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

export const setLiquidationPoolTotal = (
	account: string,
	keyring: any,
	underlyingAssetId: string,
	amount: string
) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SET_LIQUIDATION_POOL_TOTAL_SUCCESS, SET_LIQUIDATION_POOL_TOTAL_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SET_LIQUIDATION_POOL_TOTAL_START });
			const currentUser = keyring.getPair(account);
			const accountId = API.consts.liquidationPools.liquidationPoolAccountId.toHuman();
			const convertedAmount = convertToTokenValue(amount);

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(underlyingAssetId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.currencies.updateBalance(
							accountId,
							castedCurrencyId,
							convertedAmount
						)
					) // @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.currencies.updateBalance(
							accountId,
							castedCurrencyId,
							convertedAmount
						)
					)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_LIQUIDATION_POOL_TOTAL_ERROR,
				payload: err.toString(),
			});
		}
	};
};

// SEED
export function transferToLiquidationPool(
	account: string,
	keyring: any,
	currencyId: string,
	amount: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				TRANSFER_TO_LIQUIDATION_POOL_SUCCESS,
				TRANSFER_TO_LIQUIDATION_POOL_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: TRANSFER_TO_LIQUIDATION_POOL_START });
			const currentUser = keyring.getPair(account);
			const convertedAmount = convertToTokenValue(amount);

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(currencyId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.liquidationPools
					.transferToLiquidationPool(castedCurrencyId, convertedAmount)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.liquidationPools
					.transferToLiquidationPool(castedCurrencyId, convertedAmount)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: TRANSFER_TO_LIQUIDATION_POOL_ERROR,
				payload: err.toString(),
			});
		}
	};
}
