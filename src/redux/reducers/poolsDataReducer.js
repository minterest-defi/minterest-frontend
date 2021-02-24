import {
	GET_POOLS_DATA_START,
	GET_POOLS_DATA_ERROR,
	GET_POOLS_DATA_SUCCESS,
	RESET_POOLS_DATA,
} from '../../actions/types';

const initialState = {
	poolsData: null,
};

export default function poolDataReducer(state = initialState, action) {
	switch (action.type) {
		case GET_POOLS_DATA_START: {
			return state;
		}

		case GET_POOLS_DATA_SUCCESS: {
			return {
				...state,
				poolsData: action.payload,
			};
		}

		case GET_POOLS_DATA_ERROR: {
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
