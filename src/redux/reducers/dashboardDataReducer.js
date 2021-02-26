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
} from '../../actions/types';

const initialState = {
	poolsBalance: null,
	poolsBorrowBalance: null,
	ratesData: null,
};

export default function dashboardDataReducer(state = initialState, action) {
	switch (action.type) {
		case GET_POOLS_BALANCE_START: {
			return state;
		}

		case GET_POOLS_BALANCE_SUCCESS: {
			return {
				...state,
				poolsBalance: action.payload,
			};
		}

		case GET_POOLS_BALANCE_ERROR: {
			return state;
		}

		case GET_POOLS_BORROW_BALANCE_START: {
			return state;
		}

		case GET_POOLS_BORROW_BALANCE_SUCCESS: {
			return {
				...state,
				poolsBorrowBalance: action.payload,
			};
		}

		case GET_POOLS_BORROW_BALANCE_ERROR: {
			return state;
		}

		case GET_RATES_DATA_START: {
			return state;
		}

		case GET_RATES_DATA_SUCCESS: {
			return {
				...state,
				ratesData: action.payload,
			};
		}

		case GET_RATES_DATA_ERROR: {
			return state;
		}

		case RESET_POOLS_DATA: {
			return {
				...initialState,
			};
		}

		default:
			return state;
	}
}
