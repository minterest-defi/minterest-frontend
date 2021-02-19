import {
	SET_INSURANCE_FACTOR_START,
	SET_INSURANCE_FACTOR_SUCCESS,
	SET_INSURANCE_FACTOR_ERROR,
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
