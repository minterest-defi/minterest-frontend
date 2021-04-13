import { Action, ProtocolDataReducerType } from '../../util/types';
import {
	GET_PROTOCOL_ENABLED_CURRENCIES_START,
	GET_PROTOCOL_ENABLED_CURRENCIES_SUCCESS,
	GET_PROTOCOL_ENABLED_CURRENCIES_ERROR,
	GET_PROTOCOL_ENABLED_WRAPPED_CURRENCIES_START,
	GET_PROTOCOL_ENABLED_WRAPPED_CURRENCIES_SUCCESS,
	GET_PROTOCOL_ENABLED_WRAPPED_CURRENCIES_ERROR,
} from '../../actions/types';

const initialState: ProtocolDataReducerType = {
	currencies: [],
	currenciesOptions: [],
	wrappedCurrencies: [],
	wrappedCurrenciesOptions: [],
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
		default:
			return state;
	}
};

export default protocolDataReducer;
