import { Dispatch, GetState } from '../util/types';
import {
	GET_LIQUIDATION_POOLS_BALANCE_START,
	GET_LIQUIDATION_POOLS_BALANCE_ERROR,
	GET_LIQUIDATION_POOLS_BALANCE_SUCCESS,
	GET_LIQUIDATION_POOL_PARAMS_START,
	GET_LIQUIDATION_POOL_PARAMS_SUCCESS,
	GET_LIQUIDATION_POOL_PARAMS_ERROR,
	GET_RISK_MANAGER_PARAMS_START,
	GET_RISK_MANAGER_PARAMS_SUCCESS,
	GET_RISK_MANAGER_PARAMS_ERROR,
} from './types';
import API from '../services';
import { toUnderlyingCurrencyIdAPI } from '../util/cast';

export function getLiquidationPoolsBalance() {
	return async (dispatch: Dispatch, getState: GetState) => {
		try {
			const {
				protocolData: { currencies },
			} = getState();
			dispatch({ type: GET_LIQUIDATION_POOLS_BALANCE_START });
			const accountId = API.consts.liquidationPools.liquidationPoolAccountId.toHuman();

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

export const getLiquidationPoolParams = () => {
	return async (dispatch: Dispatch, getState: GetState) => {
		try {
			const {
				protocolData: { currencies },
			} = getState();
			dispatch({ type: GET_LIQUIDATION_POOL_PARAMS_START });

			const poolParams = await Promise.all(
				currencies.map((currencyId) =>
					API.query.liquidationPools.liquidationPoolsData(
						toUnderlyingCurrencyIdAPI(currencyId)
					)
				)
			);
			const data = currencies.reduce((old: any, item, index) => {
				old[item] = poolParams[index];
				return old;
			}, {});

			dispatch({
				type: GET_LIQUIDATION_POOL_PARAMS_SUCCESS,
				payload: data,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_LIQUIDATION_POOL_PARAMS_ERROR,
			});
		}
	};
};

export const getRiskManagerParams = () => {
	return async (dispatch: Dispatch, getState: GetState) => {
		try {
			const {
				protocolData: { currencies },
			} = getState();
			dispatch({ type: GET_RISK_MANAGER_PARAMS_START });

			const dataArray = await Promise.all(
				currencies.map((currencyId) =>
					API.query.riskManager.riskManagerParams(
						toUnderlyingCurrencyIdAPI(currencyId)
					)
				)
			);

			const data = currencies.reduce((old: any, item, index) => {
				old[item] = dataArray[index];
				return old;
			}, {});

			dispatch({
				type: GET_RISK_MANAGER_PARAMS_SUCCESS,
				payload: data,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_RISK_MANAGER_PARAMS_ERROR,
			});
		}
	};
};
