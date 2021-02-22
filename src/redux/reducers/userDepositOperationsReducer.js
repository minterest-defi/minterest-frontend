import {
	DEPOSIT_UNDERLYING_REQUEST_START,
	DEPOSIT_UNDERLYING_REQUEST_ERROR,
	DEPOSIT_UNDERLYING_REQUEST_SUCCESS,
} from '../../actions/types';

const initialState = {
	isDepositUnderlyingResponseRunning: false,
	depositUnderlyingResponse: null,
};

export default function userDepositOperationsReducer(
	state = initialState,
	action
) {
	switch (action.type) {
		case DEPOSIT_UNDERLYING_REQUEST_START: {
			return {
				...state,
				isDepositUnderlyingResponseRunning: true,
				depositUnderlyingResponse: null,
			};
		}
		case DEPOSIT_UNDERLYING_REQUEST_SUCCESS: {
			return {
				...state,
				isDepositUnderlyingResponseRunning: false,
				depositUnderlyingResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case DEPOSIT_UNDERLYING_REQUEST_ERROR: {
			return {
				...state,
				isDepositUnderlyingResponseRunning: false,
				depositUnderlyingResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		default:
			return state;
	}
}
