import {
	GET_POOLS_BALANCE_START,
	GET_POOLS_BALANCE_ERROR,
	GET_POOLS_BALANCE_SUCCESS,
	RESET_POOLS_DATA,
} from '../../actions/types';

const initialState = {
	poolsBalance: null,
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

		case RESET_POOLS_DATA: {
			return {
				...initialState,
			};
		}

		default:
			return state;
	}
}
