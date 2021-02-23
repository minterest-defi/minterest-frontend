import {
	GET_POOLS_DATA_START,
	GET_POOLS_DATA_ERROR,
	GET_POOLS_DATA_SUCCESS,
} from '../../actions/types';

const initialState = {
	isPoolDataResponseRuning: false,
	poolDataResponse: '0',
};

export default function poolDataReducer(state = initialState, action) {
	switch (action.type) {
		case GET_POOLS_DATA_START: {
			return {
				...state,
				isPoolDataResponseRuning: true,
				poolDataResponse: '0',
			};
		}

		case GET_POOLS_DATA_SUCCESS: {
			return {
				...state,
				isPoolDataResponseRuning: false,
				poolDataResponse: {
					decimals: action.decimals,
					data: action.data,
				},
			};
		}

		case GET_POOLS_DATA_ERROR: {
			return {
				...state,
				isPoolDataResponseRuning: false,
				poolDataResponse: {
					errorMessage: action.payload,
				},
			};
		}

		default:
			return state;
	}
}
