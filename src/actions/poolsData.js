import API from '../services';
import {
	GET_POOLS_DATA_START,
	GET_POOLS_DATA_ERROR,
	GET_POOLS_DATA_SUCCESS,
} from './types';

export function getPoolsData(currencyId) {
	return async (dispatch) => {
		try {
			dispatch({ type: GET_POOLS_DATA_START });
			const accountId = API.consts.liquidityPools.poolAccountId.toHuman();
			const decimals = API.registry.chainDecimals;
			const data = await API.query.tokens.accounts(accountId, currencyId);
			dispatch({
				type: GET_POOLS_DATA_SUCCESS,
				decimals: decimals,
				data: data,
			});
		} catch (err) {
			dispatch({
				type: GET_POOLS_DATA_ERROR,
				payload: err.toString(),
			});
		}
	};
}
