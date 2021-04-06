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
	SET_THRESHOLD_REQUEST_START,
	SET_THRESHOLD_REQUEST_ERROR,
	SET_THRESHOLD_REQUEST_SUCCESS,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_START,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_ERROR,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_SUCCESS,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_START,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_ERROR,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_SUCCESS,
	SET_BALANCING_PERIOD_START,
	SET_BALANCING_PERIOD_ERROR,
	SET_BALANCING_PERIOD_SUCCESS,
	SET_LIQUIDATION_POOL_TOTAL_START,
	SET_LIQUIDATION_POOL_TOTAL_SUCCESS,
	SET_LIQUIDATION_POOL_TOTAL_ERROR,
} from './types';
import {
	txCallback,
	convertInputToPercent,
	convertToTokenValue,
} from '../util';

export const resetLiquidationAdminUpdateRequests = () => {
	return {
		type: RESET_LIQUIDATION_ADMIN_UPDATE_REQUESTS,
	};
};

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

export function setLiquidationFee(
	account: string,
	keyring: any,
	poolId: string,
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

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.riskManager.setLiquidationFee(
							poolId,
							convertNewLiquidationIncentive
						)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.riskManager.setLiquidationFee(
							poolId,
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
	currencyId: string,
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

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.currencies.updateBalance(
							accountId,
							currencyId,
							convertedAmount
						)
					) // @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.currencies.updateBalance(
							accountId,
							currencyId,
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
