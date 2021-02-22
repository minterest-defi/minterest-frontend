import {
	REPAY_ALL_REQUEST_START,
	REPAY_ALL_REQUEST_ERROR,
	REPAY_ALL_REQUEST_SUCCESS,
	REPAY_REQUEST_START,
	REPAY_REQUEST_ERROR,
	REPAY_REQUEST_SUCCESS,
	REPAY_ON_BEHALF_REQUEST_START,
	REPAY_ON_BEHALF_REQUEST_ERROR,
	REPAY_ON_BEHALF_REQUEST_SUCCESS,
} from '../../actions/types';

const initialState = {
	isRepayAllResponseRunning: false,
	repayAllResponse: null,
	isRepayResponseRunning: false,
	repayResponse: null,
	isRepayOnBehalfResponseRunning: false,
	repayOnBehalfResponse: null,
};

export default function userRepayOperationsReducer(
	state = initialState,
	action
) {
	switch (action.type) {
		case REPAY_ALL_REQUEST_START: {
			return {
				...state,
				isRepayAllResponseRunning: true,
				repayAllResponse: null,
			};
		}
		case REPAY_ALL_REQUEST_SUCCESS: {
			return {
				...state,
				isRepayAllResponseRunning: false,
				repayAllResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case REPAY_ALL_REQUEST_ERROR: {
			return {
				...state,
				isRepayAllResponseRunning: false,
				repayAllResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case REPAY_REQUEST_START: {
			return { ...state, isRepayResponseRunning: true, repayResponse: null };
		}
		case REPAY_REQUEST_SUCCESS: {
			return {
				...state,
				isRepayResponseRunning: false,
				repayResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case REPAY_REQUEST_ERROR: {
			return {
				...state,
				isRepayResponseRunning: false,
				repayResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case REPAY_ON_BEHALF_REQUEST_START: {
			return {
				...state,
				isRepayOnBehalfResponseRunning: true,
				repayOnBehalfResponse: null,
			};
		}
		case REPAY_ON_BEHALF_REQUEST_SUCCESS: {
			return {
				...state,
				isRepayOnBehalfResponseRunning: false,
				repayOnBehalfResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case REPAY_ON_BEHALF_REQUEST_ERROR: {
			return {
				...state,
				isRepayOnBehalfResponseRunning: false,
				repayOnBehalfResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		default:
			return state;
	}
}
