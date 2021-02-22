import {
	SET_INSURANCE_FACTOR_START,
	SET_INSURANCE_FACTOR_SUCCESS,
	SET_INSURANCE_FACTOR_ERROR,
	RESET_INSURANCE_FACTOR_REQUESTS,
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
	isDepositInsuranceResponseRunning: false,
	depositInsuranceResponse: null,
	isRedeemInsuranceResponseRunning: false,
	redeemInsuranceResponse: null,
};

export default function adminReducer(state = initialState, action) {
	switch (action.type) {
		case RESET_INSURANCE_FACTOR_REQUESTS: {
			return {
				...state,
				setInsuranceFactorResponse: null,
				isSetInsuranceFactorResponseRunning: false,
			};
		}

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

		case DEPOSIT_INSURANCE_REQUEST_START: {
			return {
				...state,
				isDepositInsuranceResponseRunning: true,
				depositInsuranceResponse: null,
			};
		}
		case DEPOSIT_INSURANCE_REQUEST_SUCCESS: {
			return {
				...state,
				isDepositInsuranceResponseRunning: false,
				depositInsuranceResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case DEPOSIT_INSURANCE_REQUEST_ERROR: {
			return {
				...state,
				isDepositInsuranceResponseRunning: false,
				depositInsuranceResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case REDEEM_INSURANCE_REQUEST_START: {
			return {
				...state,
				isRedeemInsuranceResponseRunning: true,
				redeemInsuranceResponse: null,
			};
		}
		case REDEEM_INSURANCE_REQUEST_SUCCESS: {
			return {
				...state,
				isRedeemInsuranceResponseRunning: false,
				redeemInsuranceResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case REDEEM_INSURANCE_REQUEST_ERROR: {
			return {
				...state,
				isRedeemInsuranceResponseRunning: false,
				redeemInsuranceResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		default:
			return state;
	}
}
