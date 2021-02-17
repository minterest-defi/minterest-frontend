import {
	SET_INSURANCE_FACTOR_START,
	SET_INSURANCE_FACTOR_SUCCESS,
	SET_INSURANCE_FACTOR_ERROR,
	RESET_INSURANCE_FACTOR_REQUESTS,
} from '../../actions/types';

const initialState = {
	setInsuranceFactorResponse: null,
	isSetInsuranceFactorResponseRunning: false,
};

export default function substrateReducer(state = initialState, action) {
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
		default:
			return state;
	}
}