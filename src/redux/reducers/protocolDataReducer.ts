import { Action, ProtocolDataReducerType } from '../../util/types';
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
	GET_USER_PRICES_START,
	GET_USER_PRICES_SUCCESS,
	GET_USER_PRICES_ERROR,
} from '../../actions/types';

const initialState: ProtocolDataReducerType = {
	currencies: [],
	currenciesOptions: [],
	wrappedCurrencies: [],
	wrappedCurrenciesOptions: [],
	metadata: { modules: [] },
	prices: null,
};

const protocolDataReducer = (
	state = initialState,
	action: Action
): ProtocolDataReducerType => {
	switch (action.type) {
		case GET_PROTOCOL_ENABLED_CURRENCIES_START: {
			return state;
		}
		case GET_PROTOCOL_ENABLED_CURRENCIES_SUCCESS: {
			return {
				...state,
				currencies: action.payload,
				currenciesOptions: action.payload.map((currency: string) => ({
					key: currency,
					text: currency,
					value: currency,
				})),
			};
		}
		case GET_PROTOCOL_ENABLED_CURRENCIES_ERROR: {
			return state;
		}
		case GET_PROTOCOL_ENABLED_WRAPPED_CURRENCIES_START: {
			return state;
		}
		case GET_PROTOCOL_ENABLED_WRAPPED_CURRENCIES_SUCCESS: {
			return {
				...state,
				wrappedCurrencies: action.payload,
				wrappedCurrenciesOptions: action.payload.map((currency: string) => ({
					key: currency,
					text: currency,
					value: currency,
				})),
			};
		}
		case GET_PROTOCOL_ENABLED_WRAPPED_CURRENCIES_ERROR: {
			return state;
		}

		case GET_METADATA_START: {
			return state;
		}

		case GET_METADATA_SUCCESS: {
			return {
				...state,
				metadata: action.payload,
			};
		}

		case GET_METADATA_ERROR: {
			return state;
		}

		case GET_USER_PRICES_START: {
			return state;
		}

		case GET_USER_PRICES_SUCCESS: {
			return {
				...state,
				prices: action.payload,
			};
		}

		case GET_USER_PRICES_ERROR: {
			return state;
		}

		default:
			return state;
	}
};

export default protocolDataReducer;
