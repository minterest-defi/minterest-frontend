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
	repayAllResponse: {},
	isRepayResponseRunning: false,
	repayResponse: {},
	isRepayOnBehalfResponseRunning: false,
	repayOnBehalfResponse: {},
};

export default function adminReducer(state = initialState, action) {
	switch (action.type) {
		case REPAY_ALL_REQUEST_START: {
			return {
				...state,
				isRepayAllResponseRunning: false,
				repayAllResponse: {},
			};
		}
		case REPAY_ALL_REQUEST_SUCCESS: {
			return {
				...state,
				isRepayAllResponseRunning: false,
				repayAllResponse: {},
			};
		}
		case REPAY_ALL_REQUEST_ERROR: {
			return {
				...state,
				isRepayAllResponseRunning: false,
				repayAllResponse: {},
			};
		}
		//======================================
		case REPAY_REQUEST_START: {
			return { ...state, isRepayResponseRunning: false, repayResponse: {} };
		}
		case REPAY_REQUEST_SUCCESS: {
			return { ...state, isRepayResponseRunning: false, repayResponse: {} };
		}
		case REPAY_REQUEST_ERROR: {
			return { ...state, isRepayResponseRunning: false, repayResponse: {} };
		}
		//======================================
		case REPAY_ON_BEHALF_REQUEST_START: {
			return {
				...state,
				isRepayOnBehalfResponseRunning: false,
				repayOnBehalfResponse: {},
			};
		}
		case REPAY_ON_BEHALF_REQUEST_SUCCESS: {
			return {
				...state,
				isRepayOnBehalfResponseRunning: false,
				repayOnBehalfResponse: {},
			};
		}
		case REPAY_ON_BEHALF_REQUEST_ERROR: {
			return {
				...state,
				isRepayOnBehalfResponseRunning: false,
				repayOnBehalfResponse: {},
			};
		}

		default:
			return state;
	}
}
