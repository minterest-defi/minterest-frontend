import API from '../services';
import { Dispatch, GetState } from '../util/types';
import {
	GET_PROTOCOL_ENABLED_CURRENCIES_START,
	GET_PROTOCOL_ENABLED_CURRENCIES_SUCCESS,
	GET_PROTOCOL_ENABLED_CURRENCIES_ERROR,
	GET_PROTOCOL_ENABLED_WRAPPED_CURRENCIES_START,
	GET_PROTOCOL_ENABLED_WRAPPED_CURRENCIES_SUCCESS,
	GET_PROTOCOL_ENABLED_WRAPPED_CURRENCIES_ERROR,
	GET_METADATA_START,
	GET_METADATA_SUCCESS,
	GET_METADATA_ERROR,
	GET_USER_PRICES_ERROR,
	GET_USER_PRICES_START,
	GET_USER_PRICES_SUCCESS,
} from './types';
import { parseMetadata } from '../util/calculations';
import { toUnderlyingCurrencyIdAPI } from '../util/cast';

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

export function getMetadata() {
	return (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_METADATA_START });

			const parsedMetadata = parseMetadata(API.runtimeMetadata);

			dispatch({ type: GET_METADATA_SUCCESS, payload: parsedMetadata });
		} catch (err) {
			console.log(err);
			dispatch({ type: GET_METADATA_ERROR });
		}
	};
}

export function getUserPrices() {
	return async (dispatch: Dispatch, getState: GetState) => {
		try {
			dispatch({ type: GET_USER_PRICES_START });
			const {
				protocolData: { currencies },
			} = getState();

			const data = await Promise.all(
				currencies.map((cur: any) =>
					// @ts-ignore
					API.rpc.prices.getCurrentPrice(toUnderlyingCurrencyIdAPI(cur))
				)
			);

			const convertedData: any = {};
			data.forEach((el: any, index) => {
				convertedData[currencies[index]] = (
					el.value.toBigInt() /
					10n ** 18n
				).toString();
			});

			dispatch({ type: GET_USER_PRICES_SUCCESS, payload: convertedData });
		} catch (err) {
			console.log(err);
			dispatch({ type: GET_USER_PRICES_ERROR });
		}
	};
}
