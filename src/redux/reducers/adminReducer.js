import {
	SET_INSURANCE_FACTOR_START,
	SET_INSURANCE_FACTOR_SUCCESS,
	SET_INSURANCE_FACTOR_ERROR,
	RESET_INSURANCE_FACTOR_REQUESTS,
	SET_COLLATERAL_THRESHOLD_REQUEST_START,
	SET_COLLATERAL_THRESHOLD_REQUEST_SUCCESS,
	SET_COLLATERAL_THRESHOLD_REQUEST_ERROR,
	SET_COLLATERAL_FACTOR_REQUEST_ERROR,
	SET_COLLATERAL_FACTOR_REQUEST_SUCCESS,
	SET_COLLATERAL_FACTOR_REQUEST_START,
} from '../../actions/types';

const initialState = {
	setInsuranceFactorResponse: null,
	isSetInsuranceFactorResponseRunning: false,
	setCollateralFactorResponse: null,
	isSetCollateralFactorResponseRunning: false,
	setCollateralThresholdResponse: null,
	isSetCollateralThresholdResponseRunning: false,
};

export default function substrateReducer(state = initialState, action) {
	switch (action.type) {
		case RESET_INSURANCE_FACTOR_REQUESTS: {
			return {
				...state,
				setInsuranceFactorResponse: null,
				isSetInsuranceFactorResponseRunning: false,
				setCollateralFactorResponse: null,
				isSetCollateralFactorResponseRunning: false,
				setCollateralThresholdResponse: null,
				isSetCollateralThresholdResponseRunning: false,
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

		case SET_COLLATERAL_THRESHOLD_REQUEST_START: {
			return {
				...state,
				isSetCollateralThresholdResponseRunning: true,
				setCollateralThresholdResponse: null,
			};
		}
		case SET_COLLATERAL_THRESHOLD_REQUEST_SUCCESS: {
			return {
				...state,
				isSetCollateralThresholdResponseRunning: false,
				setCollateralThresholdResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SET_COLLATERAL_THRESHOLD_REQUEST_ERROR: {
			return {
				...state,
				isSetCollateralThresholdResponseRunning: false,
				setCollateralThresholdResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case SET_COLLATERAL_FACTOR_REQUEST_START: {
			return {
				...state,
				isSetCollateralFactorResponseRunning: true,
				setCollateralFactorResponse: null,
			};
		}
		case SET_COLLATERAL_FACTOR_REQUEST_SUCCESS: {
			return {
				...state,
				isSetCollateralFactorResponseRunning: false,
				setCollateralFactorResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SET_COLLATERAL_FACTOR_REQUEST_ERROR: {
			return {
				...state,
				isSetCollateralFactorResponseRunning: false,
				setCollateralFactorResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		default:
			return state;
	}
}
