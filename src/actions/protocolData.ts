import API from '../services';
import { Dispatch } from '../util/types';
import {
	GET_PROTOCOL_ENABLED_CURRENCIES_START,
	GET_PROTOCOL_ENABLED_CURRENCIES_SUCCESS,
	GET_PROTOCOL_ENABLED_CURRENCIES_ERROR,
	GET_PROTOCOL_ENABLED_WRAPPED_CURRENCIES_START,
	GET_PROTOCOL_ENABLED_WRAPPED_CURRENCIES_SUCCESS,
	GET_PROTOCOL_ENABLED_WRAPPED_CURRENCIES_ERROR,
} from './types';

export const getCurrencies = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_PROTOCOL_ENABLED_CURRENCIES_START });
			let currencies = API.consts.liquidityPools.enabledUnderlyingAssetsIds;
			// @ts-ignore
			currencies = currencies.map(
				(item: any) => item.toHuman().UnderlyingAsset
			);
			dispatch({
				type: GET_PROTOCOL_ENABLED_CURRENCIES_SUCCESS,
				payload: currencies,
			});
		} catch (err) {
			console.log(err);
			dispatch({ type: GET_PROTOCOL_ENABLED_CURRENCIES_ERROR });
		}
	};
};

export const getWrappedCurrencies = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_PROTOCOL_ENABLED_WRAPPED_CURRENCIES_START });
			let wrCurrencies = API.consts.liquidityPools.enabledWrappedTokensId;
			// @ts-ignore
			wrCurrencies = wrCurrencies.map(
				(item: any) => item.toHuman().WrappedToken
			);
			dispatch({
				type: GET_PROTOCOL_ENABLED_WRAPPED_CURRENCIES_SUCCESS,
				payload: wrCurrencies,
			});
		} catch (err) {
			console.log(err);
			dispatch({ type: GET_PROTOCOL_ENABLED_WRAPPED_CURRENCIES_ERROR });
		}
	};
};
