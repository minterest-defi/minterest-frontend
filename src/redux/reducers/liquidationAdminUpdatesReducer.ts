import { Action, LiquidationAdminUpdatesReducerType } from '../../util/types';
import {
	RESET_LIQUIDATION_ADMIN_UPDATE_REQUESTS,
	SET_BALANCE_RATIO_START,
	SET_BALANCE_RATIO_ERROR,
	SET_BALANCE_RATIO_SUCCESS,
	SET_DEVIATION_THRESHOLD_START,
	SET_DEVIATION_THRESHOLD_ERROR,
	SET_DEVIATION_THRESHOLD_SUCCESS,
	SET_THRESHOLD_REQUEST_ERROR,
	SET_THRESHOLD_REQUEST_SUCCESS,
	SET_THRESHOLD_REQUEST_START,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_ERROR,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_START,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_SUCCESS,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_START,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_SUCCESS,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_ERROR,
	SET_BALANCING_PERIOD_SUCCESS,
	SET_BALANCING_PERIOD_ERROR,
	SET_BALANCING_PERIOD_START,
} from '../../actions/types';

const initialState: LiquidationAdminUpdatesReducerType = {
	setBalanceRatioResponse: null,
	isSetBalanceRatioResponseRunning: false,
	setDeviationThresholdResponse: null,
	isSetDeviationThresholdResponseRunning: false,
	setThresholdResponse: null,
	isSetThresholdResponseRunning: false,
	setLiquidationsMaxAttemptsResponse: null,
	isSetLiquidationsMaxAttemptsResponseRunning: false,
	setLoanSizeLiquidationThresholdResponse: null,
	isSetLoanSizeLiquidationThresholdResponseRunning: false,
	setBalancingPeriodResponse: null,
	isSetBalancingPeriodResponseRunning: false,
};

export default function liquidationAdminUpdatesReducer(
	state = initialState,
	action: Action
): LiquidationAdminUpdatesReducerType {
	switch (action.type) {
		case RESET_LIQUIDATION_ADMIN_UPDATE_REQUESTS: {
			return {
				...initialState,
			};
		}

		case SET_BALANCE_RATIO_START: {
			return {
				...state,
				isSetBalanceRatioResponseRunning: true,
				setBalanceRatioResponse: null,
			};
		}
		case SET_BALANCE_RATIO_SUCCESS: {
			return {
				...state,
				isSetBalanceRatioResponseRunning: false,
				setBalanceRatioResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SET_BALANCE_RATIO_ERROR: {
			return {
				...state,
				isSetBalanceRatioResponseRunning: false,
				setBalanceRatioResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case SET_DEVIATION_THRESHOLD_START: {
			return {
				...state,
				isSetDeviationThresholdResponseRunning: true,
				setDeviationThresholdResponse: null,
			};
		}
		case SET_DEVIATION_THRESHOLD_SUCCESS: {
			return {
				...state,
				isSetDeviationThresholdResponseRunning: false,
				setDeviationThresholdResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SET_DEVIATION_THRESHOLD_ERROR: {
			return {
				...state,
				isSetDeviationThresholdResponseRunning: false,
				setDeviationThresholdResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case SET_THRESHOLD_REQUEST_START: {
			return {
				...state,
				isSetThresholdResponseRunning: true,
				setThresholdResponse: null,
			};
		}
		case SET_THRESHOLD_REQUEST_SUCCESS: {
			return {
				...state,
				isSetThresholdResponseRunning: false,
				setThresholdResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SET_THRESHOLD_REQUEST_ERROR: {
			return {
				...state,
				isSetThresholdResponseRunning: false,
				setThresholdResponse: {
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

		case SET_BALANCING_PERIOD_START: {
			return {
				...state,
				isSetBalancingPeriodResponseRunning: true,
				setBalancingPeriodResponse: null,
			};
		}
		case SET_BALANCING_PERIOD_SUCCESS: {
			return {
				...state,
				isSetBalancingPeriodResponseRunning: false,
				setBalancingPeriodResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SET_BALANCING_PERIOD_ERROR: {
			return {
				...state,
				isSetBalancingPeriodResponseRunning: false,
				setBalancingPeriodResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		default:
			return state;
	}
}
