import {
	REDEEM_REQUEST_START,
	REDEEM_REQUEST_ERROR,
	REDEEM_REQUEST_SUCCESS,
	REDEEM_UNDERLYING_REQUEST_START,
	REDEEM_UNDERLYING_REQUEST_ERROR,
	REDEEM_UNDERLYING_REQUEST_SUCCESS,
	REDEEM_WRAPPED_REQUEST_START,
	REDEEM_WRAPPED_REQUEST_ERROR,
	REDEEM_WRAPPED_REQUEST_SUCCESS,
} from '../../actions/types';

const initialState = {
	isRedeemResponseRunning: false,
	redeemResponse: {},
	isRedeemUnderlyingResponseRunning: false,
	redeemUnderlyingResponse: {},
	isRedeemWrappedResponseRunning: false,
	redeemWrappedResponse: {},
};

export default function adminReducer(state = initialState, action) {
	switch (action.type) {
		case REDEEM_REQUEST_START: {
			return {
				...state,
				isRedeemResponseRunning: false,
				redeemResponse: {},
			};
		}
		case REDEEM_REQUEST_SUCCESS: {
			return {
				...state,
				isRedeemResponseRunning: false,
				redeemResponse: {},
			};
		}
		case REDEEM_REQUEST_ERROR: {
			return {
				...state,
				isRedeemResponseRunning: false,
				redeemResponse: {},
			};
		}
		//======================================
		case REDEEM_UNDERLYING_REQUEST_START: {
			return {
				...state,
				isRedeemUnderlyingResponseRunning: false,
				redeemUnderlyingResponse: {},
			};
		}
		case REDEEM_UNDERLYING_REQUEST_SUCCESS: {
			return {
				...state,
				isRedeemUnderlyingResponseRunning: false,
				redeemUnderlyingResponse: {},
			};
		}
		case REDEEM_UNDERLYING_REQUEST_ERROR: {
			return {
				...state,
				isRedeemUnderlyingResponseRunning: false,
				redeemUnderlyingResponse: {},
			};
		}
		//======================================
		case REDEEM_WRAPPED_REQUEST_START: {
			return {
				...state,
				isRedeemWrappedResponseRunning: false,
				redeemWrappedResponse: {},
			};
		}
		case REDEEM_WRAPPED_REQUEST_SUCCESS: {
			return {
				...state,
				isRedeemWrappedResponseRunning: false,
				redeemWrappedResponse: {},
			};
		}
		case REDEEM_WRAPPED_REQUEST_ERROR: {
			return {
				...state,
				isRedeemWrappedResponseRunning: false,
				redeemWrappedResponse: {},
			};
		}

		default:
			return state;
	}
}
