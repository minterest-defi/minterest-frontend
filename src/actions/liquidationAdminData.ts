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
	GET_LIQUIDATION_BALANCING_PERIOD_START,
	GET_LIQUIDATION_BALANCING_PERIOD_ERROR,
	GET_LIQUIDATION_BALANCING_PERIOD_SUCCESS,
} from './types';
import API from '../services';

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
					// @ts-ignore
					API.query.tokens.accounts(accountId, currencyId)
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
					API.query.liquidationPools.liquidationPoolsData(currencyId)
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
				currencies.map((asset) =>
					API.query.riskManager.riskManagerParams(asset)
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

export function getLiquidationBalancingPeriod() {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_LIQUIDATION_BALANCING_PERIOD_START });

			const data = await API.query.liquidationPools.balancingPeriod();

			dispatch({
				type: GET_LIQUIDATION_BALANCING_PERIOD_SUCCESS,
				payload: data,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_LIQUIDATION_BALANCING_PERIOD_ERROR,
			});
		}
	};
}
