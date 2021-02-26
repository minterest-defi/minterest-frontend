import API from '../services';
import {
	GET_POOLS_BALANCE_START,
	GET_POOLS_BALANCE_ERROR,
	GET_POOLS_BALANCE_SUCCESS,
	GET_POOLS_BORROW_BALANCE_START,
	GET_POOLS_BORROW_BALANCE_ERROR,
	GET_POOLS_BORROW_BALANCE_SUCCESS,
	GET_RATES_DATA_START,
	GET_RATES_DATA_ERROR,
	GET_RATES_DATA_SUCCESS,
	RESET_POOLS_DATA,
} from './types';

import { UNDERLYING_ASSETS_TYPES } from '../util/constants';

export function getPoolsBalance() {
	return async (dispatch) => {
		try {
			dispatch({ type: GET_POOLS_BALANCE_START });
			const accountId = API.consts.liquidityPools.poolAccountId.toHuman();

			const dataBalanceArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((currencyId) =>
					API.query.tokens.accounts(accountId, currencyId)
				)
			);

			const data = UNDERLYING_ASSETS_TYPES.reduce((old, item, index) => {
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
	return async (dispatch) => {
		try {
			dispatch({ type: GET_POOLS_BORROW_BALANCE_START });

			const dataBorrowBalanceArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((currencyId) =>
					API.query.liquidityPools.pools(currencyId)
				)
			);

			const data = UNDERLYING_ASSETS_TYPES.reduce((old, item, index) => {
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
	return async (dispatch) => {
		try {
			dispatch({ type: GET_RATES_DATA_START });

			const dataRatesArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((currencyId) =>
					API.rpc.controller.liquidityPoolState(currencyId)
				)
			);

			const data = UNDERLYING_ASSETS_TYPES.reduce((old, item, index) => {
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

export const resetPoolsData = () => {
	return {
		type: RESET_POOLS_DATA,
	};
};
