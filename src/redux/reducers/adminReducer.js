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
	setInsuranceFactorResponse: null,
	isSetInsuranceFactorResponseRunning: false,
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
			return { ...state };
		}
		case DEPOSIT_UNDERLYING_REQUEST_SUCCESS: {
			return { ...state };
		}
		case DEPOSIT_UNDERLYING_REQUEST_ERROR: {
			return { ...state };
		}
		//======================================
		case REDEEM_REQUEST_START: {
			return { ...state };
		}
		case REDEEM_REQUEST_SUCCESS: {
			return { ...state };
		}
		case REDEEM_REQUEST_ERROR: {
			return { ...state };
		}
		//======================================
		case REDEEM_UNDERLYING_REQUEST_START: {
			return { ...state };
		}
		case REDEEM_UNDERLYING_REQUEST_SUCCESS: {
			return { ...state };
		}
		case REDEEM_UNDERLYING_REQUEST_ERROR: {
			return { ...state };
		}
		//======================================
		case REDEEM_WRAPPED_REQUEST_START: {
			return { ...state };
		}
		case REDEEM_WRAPPED_REQUEST_SUCCESS: {
			return { ...state };
		}
		case REDEEM_WRAPPED_REQUEST_ERROR: {
			return { ...state };
		}
		//======================================
		case BORROW_REQUEST_START: {
			return { ...state };
		}
		case BORROW_REQUEST_SUCCESS: {
			return { ...state };
		}
		case BORROW_REQUEST_ERROR: {
			return { ...state };
		}
		//======================================
		case REPAY_ALL_REQUEST_START: {
			return { ...state };
		}
		case REPAY_ALL_REQUEST_SUCCESS: {
			return { ...state };
		}
		case REPAY_ALL_REQUEST_ERROR: {
			return { ...state };
		}
		//======================================
		case REPAY_REQUEST_START: {
			return { ...state };
		}
		case REPAY_REQUEST_SUCCESS: {
			return { ...state };
		}
		case REPAY_REQUEST_ERROR: {
			return { ...state };
		}
		//======================================
		case REPAY_ON_BEHALF_REQUEST_START: {
			return { ...state };
		}
		case REPAY_ON_BEHALF_REQUEST_SUCCESS: {
			return { ...state };
		}
		case REPAY_ON_BEHALF_REQUEST_ERROR: {
			return { ...state };
		}
		//======================================
		case DEPOSIT_INSURANCE_REQUEST_START: {
			return { ...state };
		}
		case DEPOSIT_INSURANCE_REQUEST_SUCCESS: {
			return { ...state };
		}
		case DEPOSIT_INSURANCE_REQUEST_ERROR: {
			return { ...state };
		}
		//======================================
		case REDEEM_INSURANCE_REQUEST_START: {
			return { ...state };
		}
		case REDEEM_INSURANCE_REQUEST_SUCCESS: {
			return { ...state };
		}
		case REDEEM_INSURANCE_REQUEST_ERROR: {
			return { ...state };
		}

		default:
			return state;
	}
}
