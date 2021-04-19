import API from '../services';
import { Dispatch, GetState } from '../util/types';
import {
	GET_USER_BALANCE_START,
	GET_USER_BALANCE_ERROR,
	GET_USER_BALANCE_SUCCESS,
	GET_POOL_USER_PARAMS_START,
	GET_POOL_USER_PARAMS_ERROR,
	GET_POOL_USER_PARAMS_SUCCESS,
	GET_POOLS_BALANCE_START,
	GET_POOLS_BALANCE_ERROR,
	GET_POOLS_BALANCE_SUCCESS,
	GET_POOLS_BORROW_BALANCE_START,
	GET_POOLS_BORROW_BALANCE_ERROR,
	GET_POOLS_BORROW_BALANCE_SUCCESS,
	GET_RATES_DATA_START,
	GET_RATES_DATA_ERROR,
	GET_RATES_DATA_SUCCESS,
	RESET_DASHBOARD_DATA,
	RESET_USER_DATA,
	GET_BALANCE_ANNOTATION_START,
	GET_BALANCE_ANNOTATION_ERROR,
	GET_BALANCE_ANNOTATION_SUCCESS,
	GET_USER_BALANCE_USD_START,
	GET_USER_BALANCE_USD_SUCCESS,
	GET_USER_BALANCE_USD_ERROR,
	GET_OPERATION_INFO_START,
	GET_OPERATION_INFO_ERROR,
	GET_OPERATION_INFO_SUCCESS,
	RESET_OPERATION_INFO,
} from './types';
import { OPERATIONS } from '../util/constants';
import {
	toUnderlyingCurrencyIdAPI,
	toWrappedCurrencyIdAPI,
} from '../util/cast';

export function getUserBalance(account: string) {
	return async (dispatch: Dispatch, getState: GetState) => {
		try {
			const {
				protocolData: { currencies, wrappedCurrencies },
			} = getState();
			dispatch({ type: GET_USER_BALANCE_START });
			const allEnabledCastedCurrencies = [
				...currencies.map(toUnderlyingCurrencyIdAPI),
				...wrappedCurrencies.map(toWrappedCurrencyIdAPI),
			];
			const dataBalanceArray = await Promise.all(
				allEnabledCastedCurrencies.map((castedCurrencyId) =>
					API.query.tokens.accounts(account, castedCurrencyId)
				)
			);

			const allEnabledCurrencies = [...currencies, ...wrappedCurrencies];
			const data = allEnabledCurrencies.reduce((old: any, item, index) => {
				old[item] = dataBalanceArray[index];
				return old;
			}, {});

			dispatch({
				type: GET_USER_BALANCE_SUCCESS,
				payload: data,
			});
		} catch (err) {
			console.log(err);
			dispatch({ type: GET_USER_BALANCE_ERROR });
		}
	};
}

export function getPoolUserParams(account: string) {
	return async (dispatch: Dispatch, getState: GetState) => {
		try {
			const {
				protocolData: { currencies },
			} = getState();
			dispatch({ type: GET_POOL_USER_PARAMS_START });
			const dataBalanceArray = await Promise.all(
				currencies.map((currencyId) =>
					API.query.liquidityPools.poolUserParams(
						toUnderlyingCurrencyIdAPI(currencyId),
						account
					)
				)
			);

			const data = currencies.reduce((old: any, item, index) => {
				old[item] = dataBalanceArray[index];
				return old;
			}, {});

			dispatch({
				type: GET_POOL_USER_PARAMS_SUCCESS,
				payload: data,
			});
		} catch (err) {
			console.log(err);
			dispatch({ type: GET_POOL_USER_PARAMS_ERROR });
		}
	};
}

export function getPoolsBalance() {
	return async (dispatch: Dispatch, getState: GetState) => {
		try {
			const {
				protocolData: { currencies },
			} = getState();
			dispatch({ type: GET_POOLS_BALANCE_START });
			const accountId = API.consts.liquidityPools.liquidityPoolAccountId.toHuman();

			const dataBalanceArray = await Promise.all(
				currencies.map((currencyId) =>
					API.query.tokens.accounts(
						// @ts-ignore
						accountId,
						toUnderlyingCurrencyIdAPI(currencyId)
					)
				)
			);

			const data = currencies.reduce((old: any, item, index) => {
				old[item] = dataBalanceArray[index];
				return old;
			}, {});

			dispatch({
				type: GET_POOLS_BALANCE_SUCCESS,
				payload: data,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_POOLS_BALANCE_ERROR,
			});
		}
	};
}

export function getPoolsBorrowBalance() {
	return async (dispatch: Dispatch, getState: GetState) => {
		try {
			const {
				protocolData: { currencies },
			} = getState();
			dispatch({ type: GET_POOLS_BORROW_BALANCE_START });

			const dataBorrowBalanceArray = await Promise.all(
				currencies.map((currencyId) =>
					API.query.liquidityPools.pools(toUnderlyingCurrencyIdAPI(currencyId))
				)
			);

			const data = currencies.reduce((old: any, item, index) => {
				old[item] = dataBorrowBalanceArray[index];
				return old;
			}, {});

			dispatch({
				type: GET_POOLS_BORROW_BALANCE_SUCCESS,
				payload: data,
			});
		} catch (err) {
			console.log(err);
			dispatch({ type: GET_POOLS_BORROW_BALANCE_ERROR });
		}
	};
}

export function getRatesData() {
	return async (dispatch: Dispatch, getState: GetState) => {
		try {
			const {
				protocolData: { currencies },
			} = getState();
			dispatch({ type: GET_RATES_DATA_START });

			const dataRatesArray = await Promise.all(
				currencies.map((currencyId) =>
					// @ts-ignore
					API.rpc.controller.liquidityPoolState(
						toUnderlyingCurrencyIdAPI(currencyId)
					)
				)
			);

			const data = currencies.reduce((old: any, item, index) => {
				old[item] = dataRatesArray[index];
				return old;
			}, {});

			dispatch({
				type: GET_RATES_DATA_SUCCESS,
				payload: data,
			});
		} catch (err) {
			console.log(err);
			dispatch({ type: GET_RATES_DATA_ERROR });
		}
	};
}

export const resetDashboardData = () => {
	return {
		type: RESET_DASHBOARD_DATA,
	};
};

export const resetUserData = () => {
	return {
		type: RESET_USER_DATA,
	};
};

export function getBalanceAnnotation(account: string) {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_BALANCE_ANNOTATION_START });
			const data = await API.query.system.account(account);

			dispatch({
				type: GET_BALANCE_ANNOTATION_SUCCESS,
				payload: data.data.free.toHuman(),
			});
		} catch (err) {
			console.log(err);
			dispatch({ type: GET_BALANCE_ANNOTATION_ERROR });
		}
	};
}

export function getUserBalanceUSD(account: string) {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_USER_BALANCE_USD_START });
			// @ts-ignore
			const data = await API.rpc.controller.userBalanceInfo(account);

			dispatch({
				type: GET_USER_BALANCE_USD_SUCCESS,
				payload: data,
			});
		} catch (err) {
			console.log(err);
			dispatch({ type: GET_USER_BALANCE_USD_ERROR });
		}
	};
}

export const getOperationInfo = (
	account: string,
	operationType: string,
	params: any[]
) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_OPERATION_INFO_START });

			let info;
			switch (operationType) {
				case OPERATIONS.DEPOSIT_UNDERLYING: {
					const [underlyingAssetId, underlyingAmount] = params;
					info = await API.tx.minterestProtocol
						.depositUnderlying(
							toUnderlyingCurrencyIdAPI(underlyingAssetId),
							underlyingAmount
						)
						.paymentInfo(account);
					console.log(info);
					break;
				}
				case OPERATIONS.BORROW: {
					info = await API.tx.minterestProtocol
						.borrow(...params)
						.paymentInfo(account);
					break;
				}
				case OPERATIONS.REDEEM: {
					info = await API.tx.minterestProtocol
						.redeem(...params)
						.paymentInfo(account);
					break;
				}
				case OPERATIONS.REDEEM_UNDERLYING: {
					info = await API.tx.minterestProtocol
						.redeemUnderlying(...params)
						.paymentInfo(account);
					break;
				}
				case OPERATIONS.REDEEM_WRAPPED: {
					info = await API.tx.minterestProtocol
						.redeemWrapped(...params)
						.paymentInfo(account);
					break;
				}
				case OPERATIONS.REPAY_ALL: {
					info = await API.tx.minterestProtocol
						.repayAll(...params)
						.paymentInfo(account);
					break;
				}
				case OPERATIONS.REPAY: {
					info = await API.tx.minterestProtocol
						.repay(...params)
						.paymentInfo(account);
					break;
				}
				case OPERATIONS.REPAY_ON_BEHALF: {
					info = await API.tx.minterestProtocol
						.repayOnBehalf(...params)
						.paymentInfo(account);
					break;
				}
				case OPERATIONS.TRANSFER_WRAPPED: {
					info = await API.tx.minterestProtocol
						.transferWrapped(...params)
						.paymentInfo(account);
					break;
				}
				default: {
					dispatch({
						type: GET_OPERATION_INFO_ERROR,
						payload: 'Wrong operation type',
					});
					return;
				}
			}

			info = {
				weight: info.weight.toHuman(),
				class: info.class.toHuman(),
				partialFee: info.partialFee.toHuman(),
			};

			dispatch({
				type: GET_OPERATION_INFO_SUCCESS,
				payload: info,
			});
		} catch (err) {
			dispatch({
				type: GET_OPERATION_INFO_ERROR,
				payload: err.toString(),
			});
		}
	};
};

export const resetOperationInfo = () => {
	return {
		type: RESET_OPERATION_INFO,
	};
};
