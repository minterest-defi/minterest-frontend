import {
	SET_INSURANCE_FACTOR_START,
	SET_INSURANCE_FACTOR_SUCCESS,
	SET_INSURANCE_FACTOR_ERROR,
	DEPOSIT_UNDERLYING_REQUEST_START,
	DEPOSIT_UNDERLYING_REQUEST_ERROR,
	DEPOSIT_UNDERLYING_REQUEST_SUCCESS,
	REDEEM_REQUEST_START,
	REDEEM_REQUEST_ERROR,
	REDEEM_REQUEST_SUCCESS,
	REDEEM_UNDERLYING_REQUEST_START,
	REDEEM_UNDERLYING_REQUEST_ERROR,
	REDEEM_UNDERLYING_REQUEST_SUCCESS,
	REDEEM_WRAPPED_REQUEST_START,
	REDEEM_WRAPPED_REQUEST_ERROR,
	REDEEM_WRAPPED_REQUEST_SUCCESS,
	BORROW_REQUEST_START,
	BORROW_REQUEST_ERROR,
	BORROW_REQUEST_SUCCESS,
	REPAY_ALL_REQUEST_START,
	REPAY_ALL_REQUEST_ERROR,
	REPAY_ALL_REQUEST_SUCCESS,
	REPAY_REQUEST_START,
	REPAY_REQUEST_ERROR,
	REPAY_REQUEST_SUCCESS,
	REPAY_ON_BEHALF_REQUEST_START,
	REPAY_ON_BEHALF_REQUEST_ERROR,
	REPAY_ON_BEHALF_REQUEST_SUCCESS,
	DEPOSIT_INSURANCE_REQUEST_START,
	DEPOSIT_INSURANCE_REQUEST_ERROR,
	DEPOSIT_INSURANCE_REQUEST_SUCCESS,
	REDEEM_INSURANCE_REQUEST_START,
	REDEEM_INSURANCE_REQUEST_ERROR,
	REDEEM_INSURANCE_REQUEST_SUCCESS,
} from '../../actions/types';

const initialState = {
	isSetInsuranceFactorResponseRunning: false,
	setInsuranceFactorResponse: null,
	isDepositUnderlyingResponseRunning: false,
	depositUnderlyingResponse: {},
	isRedeemResponseRunning: false,
	redeemResponse: {},
	isRedeemUnderlyingResponseRunning: false,
	redeemUnderlyingResponse: {},
	isRedeemWrappedResponseRunning: false,
	redeemWrappedResponse: {},
	isBorrowResponseRunning: false,
	borrowResponse: {},
	isRepayAllResponseRunning: false,
	repayAllResponse: {},
	isRepayResponseRunning: false,
	repayResponse: {},
	isRepayOnBehalfResponseRunning: false,
	repayOnBehalfResponse: {},
	isDepositInsuranceResponseRunning: false,
	depositInsuranceResponse: {},
	isRedeemInsuranceResponseRunning: false,
	redeemInsuranceResponse: {},
};

export default function adminReducer(state = initialState, action) {
	switch (action.type) {
		case SET_INSURANCE_FACTOR_START: {
			return {
				...state,
				isSetInsuranceFactorResponseRunning: true,
				setInsuranceFactorResponse: null,
			};
		}
		case SET_INSURANCE_FACTOR_SUCCESS: {
			return {
				...state,
				isSetInsuranceFactorResponseRunning: false,
				setInsuranceFactorResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SET_INSURANCE_FACTOR_ERROR: {
			return {
				...state,
				isSetInsuranceFactorResponseRunning: false,
				setInsuranceFactorResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		//======================================
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
		//======================================
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
		//======================================
		case BORROW_REQUEST_START: {
			return {
				...state,
				isBorrowResponseRunning: false,
				borrowResponse: {},
			};
		}
		case BORROW_REQUEST_SUCCESS: {
			return {
				...state,
				isBorrowResponseRunning: false,
				borrowResponse: {},
			};
		}
		case BORROW_REQUEST_ERROR: {
			return {
				...state,
				isBorrowResponseRunning: false,
				borrowResponse: {},
			};
		}
		//======================================
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
		//======================================
		case DEPOSIT_INSURANCE_REQUEST_START: {
			return {
				...state,
				isDepositInsuranceResponseRunning: false,
				depositInsuranceResponse: {},
			};
		}
		case DEPOSIT_INSURANCE_REQUEST_SUCCESS: {
			return {
				...state,
				isDepositInsuranceResponseRunning: false,
				depositInsuranceResponse: {},
			};
		}
		case DEPOSIT_INSURANCE_REQUEST_ERROR: {
			return {
				...state,
				isDepositInsuranceResponseRunning: false,
				depositInsuranceResponse: {},
			};
		}
		//======================================
		case REDEEM_INSURANCE_REQUEST_START: {
			return {
				...state,
				isRedeemInsuranceResponseRunning: false,
				redeemInsuranceResponse: {},
			};
		}
		case REDEEM_INSURANCE_REQUEST_SUCCESS: {
			return {
				...state,
				isRedeemInsuranceResponseRunning: false,
				redeemInsuranceResponse: {},
			};
		}
		case REDEEM_INSURANCE_REQUEST_ERROR: {
			return {
				...state,
				isRedeemInsuranceResponseRunning: false,
				redeemInsuranceResponse: {},
			};
		}

		default:
			return state;
	}
}
