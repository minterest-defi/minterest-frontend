import {
	DEPOSIT_UNDERLYING_REQUEST_START,
	DEPOSIT_UNDERLYING_REQUEST_ERROR,
	DEPOSIT_UNDERLYING_REQUEST_SUCCESS,
} from '../../actions/types';

const initialState = {
	isDepositUnderlyingResponseRunning: false,
	depositUnderlyingResponse: {},
};

export default function adminReducer(state = initialState, action) {
	switch (action.type) {
		case DEPOSIT_UNDERLYING_REQUEST_START: {
			return {
				...state,
				isDepositUnderlyingResponseRunning: false,
				depositUnderlyingResponse: {},
			};
		}
		case DEPOSIT_UNDERLYING_REQUEST_SUCCESS: {
			return {
				...state,
				isDepositUnderlyingResponseRunning: false,
				depositUnderlyingResponse: {},
			};
		}
		case DEPOSIT_UNDERLYING_REQUEST_ERROR: {
			return {
				...state,
				isDepositUnderlyingResponseRunning: false,
				depositUnderlyingResponse: {},
			};
		}

		default:
			return state;
	}
}
