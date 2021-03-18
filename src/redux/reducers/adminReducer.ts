import { Action, AdminReducerType } from '../../util/types';
import {
	SET_INSURANCE_FACTOR_START,
	SET_INSURANCE_FACTOR_SUCCESS,
	SET_INSURANCE_FACTOR_ERROR,
	RESET_ADMIN_REQUESTS,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_ERROR,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_START,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_SUCCESS,
	SET_COLLATERAL_THRESHOLD_REQUEST_START,
	SET_COLLATERAL_THRESHOLD_REQUEST_SUCCESS,
	SET_COLLATERAL_THRESHOLD_REQUEST_ERROR,
	SET_COLLATERAL_FACTOR_REQUEST_ERROR,
	SET_COLLATERAL_FACTOR_REQUEST_SUCCESS,
	SET_COLLATERAL_FACTOR_REQUEST_START,
	GET_ADMIN_CONTROLLER_DATA_START,
	GET_ADMIN_CONTROLLER_DATA_SUCCESS,
	GET_ADMIN_CONTROLLER_DATA_ERROR,
	GET_RISK_MANAGER_DATA_SUCCESS,
	GET_RISK_MANAGER_DATA_START,
	GET_RISK_MANAGER_DATA_ERROR,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_START,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_SUCCESS,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_ERROR,
	GET_WHITELIST_MODE_START,
	GET_WHITELIST_MODE_ERROR,
	GET_WHITELIST_MODE_SUCCESS,
	SWITCH_MODE_START,
	SWITCH_MODE_ERROR,
	SWITCH_MODE_SUCCESS,
} from '../../actions/types';

const initialState: AdminReducerType = {
	setInsuranceFactorResponse: null,
	isSetInsuranceFactorResponseRunning: false,
	setLiquidationsMaxAttemptsResponse: null,
	isSetLiquidationsMaxAttemptsResponseRunning: false,
	setCollateralFactorResponse: null,
	isSetCollateralFactorResponseRunning: false,
	setCollateralThresholdResponse: null,
	isSetCollateralThresholdResponseRunning: false,
	setLoanSizeLiquidationThresholdResponse: null,
	isSetLoanSizeLiquidationThresholdResponseRunning: false,
	switchModeResponse: null,
	isSwitchModeResponseRunning: false,

	controllerData: null,
	riskManagerData: null,
	whitelistMode: null,
};

export default function adminReducer(
	state = initialState,
	action: Action
): AdminReducerType {
	switch (action.type) {
		case RESET_ADMIN_REQUESTS: {
			return {
				...state,
				setInsuranceFactorResponse: null,
				isSetInsuranceFactorResponseRunning: false,
				setLiquidationsMaxAttemptsResponse: null,
				isSetLiquidationsMaxAttemptsResponseRunning: false,
				setCollateralFactorResponse: null,
				isSetCollateralFactorResponseRunning: false,
				setCollateralThresholdResponse: null,
				isSetCollateralThresholdResponseRunning: false,
				setLoanSizeLiquidationThresholdResponse: null,
				isSetLoanSizeLiquidationThresholdResponseRunning: false,
			};
		}

		case SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_START: {
			return {
				...state,
				isSetLoanSizeLiquidationThresholdResponseRunning: true,
				setLoanSizeLiquidationThresholdResponse: null,
			};
		}
		case SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_SUCCESS: {
			return {
				...state,
				isSetLoanSizeLiquidationThresholdResponseRunning: false,
				setLoanSizeLiquidationThresholdResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_ERROR: {
			return {
				...state,
				isSetLoanSizeLiquidationThresholdResponseRunning: false,
				setLoanSizeLiquidationThresholdResponse: {
					isError: true,
					errorMessage: action.payload,
				},
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

		case SET_LIQUIDATIONS_MAX_ATTEMPTS_START: {
			return {
				...state,
				isSetLiquidationsMaxAttemptsResponseRunning: true,
				setLiquidationsMaxAttemptsResponse: null,
			};
		}
		case SET_LIQUIDATIONS_MAX_ATTEMPTS_SUCCESS: {
			return {
				...state,
				isSetLiquidationsMaxAttemptsResponseRunning: false,
				setLiquidationsMaxAttemptsResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SET_LIQUIDATIONS_MAX_ATTEMPTS_ERROR: {
			return {
				...state,
				isSetLiquidationsMaxAttemptsResponseRunning: false,
				setLiquidationsMaxAttemptsResponse: {
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

		case GET_ADMIN_CONTROLLER_DATA_START: {
			return state;
		}

		case GET_ADMIN_CONTROLLER_DATA_SUCCESS: {
			return {
				...state,
				controllerData: action.payload,
			};
		}

		case GET_ADMIN_CONTROLLER_DATA_ERROR: {
			return state;
		}

		case GET_RISK_MANAGER_DATA_START: {
			return state;
		}

		case GET_RISK_MANAGER_DATA_SUCCESS: {
			return {
				...state,
				riskManagerData: action.payload,
			};
		}

		case GET_RISK_MANAGER_DATA_ERROR: {
			return state;
		}

		case GET_WHITELIST_MODE_START: {
			return state;
		}

		case GET_WHITELIST_MODE_SUCCESS: {
			return {
				...state,
				whitelistMode: action.payload,
			};
		}

		case GET_WHITELIST_MODE_ERROR: {
			return state;
		}

		case SWITCH_MODE_START: {
			return {
				...state,
				isSwitchModeResponseRunning: true,
				switchModeResponse: null,
			};
		}
		case SWITCH_MODE_SUCCESS: {
			return {
				...state,
				isSwitchModeResponseRunning: false,
				switchModeResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SWITCH_MODE_ERROR: {
			return {
				...state,
				isSwitchModeResponseRunning: false,
				switchModeResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		default:
			return state;
	}
}
