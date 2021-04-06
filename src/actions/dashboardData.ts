import API from '../services';
import { Dispatch } from '../util/types';
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
} from './types';

import { UNDERLYING_ASSETS_TYPES, SUPPORT_CURRENCIES } from '../util/constants';

export function getUserBalance(account: string) {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_USER_BALANCE_START });
			const dataBalanceArray = await Promise.all(
				SUPPORT_CURRENCIES.map((currencyId) =>
					API.query.tokens.accounts(account, currencyId)
				)
			);

			const data = SUPPORT_CURRENCIES.reduce((old: any, item, index) => {
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
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_POOL_USER_PARAMS_START });
			const dataBalanceArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((currencyId) =>
					API.query.liquidityPools.poolUserParams(currencyId, account)
				)
			);

			const data = UNDERLYING_ASSETS_TYPES.reduce((old: any, item, index) => {
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
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_POOLS_BALANCE_START });
			const accountId = API.consts.liquidityPools.liquidityPoolAccountId.toHuman();

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
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_POOLS_BORROW_BALANCE_START });

			const dataBorrowBalanceArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((currencyId) =>
					API.query.liquidityPools.pools(currencyId)
				)
			);

			const data = UNDERLYING_ASSETS_TYPES.reduce((old: any, item, index) => {
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
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_RATES_DATA_START });

			const dataRatesArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((currencyId) =>
					// @ts-ignore
					API.rpc.controller.liquidityPoolState(currencyId)
				)
			);

			const data = UNDERLYING_ASSETS_TYPES.reduce((old: any, item, index) => {
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
