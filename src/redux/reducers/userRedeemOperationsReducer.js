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
	redeemResponse: null,
	isRedeemUnderlyingResponseRunning: false,
	redeemUnderlyingResponse: null,
	isRedeemWrappedResponseRunning: false,
	redeemWrappedResponse: null,
};

export default function userRedeemOperationsReducer(
	state = initialState,
	action
) {
	switch (action.type) {
		case REDEEM_REQUEST_START: {
			return {
				...state,
				isRedeemResponseRunning: true,
				redeemResponse: null,
			};
		}
		case REDEEM_REQUEST_SUCCESS: {
			return {
				...state,
				isRedeemResponseRunning: false,
				redeemResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case REDEEM_REQUEST_ERROR: {
			return {
				...state,
				isRedeemResponseRunning: false,
				redeemResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}
		//======================================
		case REDEEM_UNDERLYING_REQUEST_START: {
			return {
				...state,
				isRedeemUnderlyingResponseRunning: true,
				redeemUnderlyingResponse: null,
			};
		}
		case REDEEM_UNDERLYING_REQUEST_SUCCESS: {
			return {
				...state,
				isRedeemUnderlyingResponseRunning: false,
				redeemUnderlyingResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case REDEEM_UNDERLYING_REQUEST_ERROR: {
			return {
				...state,
				isRedeemUnderlyingResponseRunning: false,
				redeemUnderlyingResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}
		//======================================
		case REDEEM_WRAPPED_REQUEST_START: {
			return {
				...state,
				isRedeemWrappedResponseRunning: true,
				redeemWrappedResponse: null,
			};
		}
		case REDEEM_WRAPPED_REQUEST_SUCCESS: {
			return {
				...state,
				isRedeemWrappedResponseRunning: false,
				redeemWrappedResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case REDEEM_WRAPPED_REQUEST_ERROR: {
			return {
				...state,
				isRedeemWrappedResponseRunning: false,
				redeemWrappedResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		default:
			return state;
	}
}
