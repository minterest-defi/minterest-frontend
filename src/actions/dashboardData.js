import API from '../services';
import {
	GET_POOLS_BALANCE_START,
	GET_POOLS_BALANCE_ERROR,
	GET_POOLS_BALANCE_SUCCESS,
	RESET_POOLS_DATA,
} from './types';

import { UNDERLYING_ASSETS_TYPES } from '../util/constants';

export function getPoolsBalance() {
	return async (dispatch) => {
		try {
			dispatch({ type: GET_POOLS_BALANCE_START });

			const accountId = API.consts.liquidityPools.poolAccountId.toHuman();

			const dataArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((currencyId) =>
					API.query.tokens.accounts(accountId, currencyId)
				)
			);

			const data = UNDERLYING_ASSETS_TYPES.reduce((old, item, index) => {
				old[item] = dataArray[index];
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

export const resetPoolsData = () => {
	return {
		type: RESET_POOLS_DATA,
	};
};
