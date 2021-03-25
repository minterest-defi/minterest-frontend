import { Action, EconomicUpdatesReducerType } from '../../util/types';
import {
	SET_BASE_RATE_PER_YEAR_REQUEST_START,
	SET_BASE_RATE_PER_YEAR_REQUEST_ERROR,
	SET_BASE_RATE_PER_YEAR_REQUEST_SUCCESS,
	SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_START,
	SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_SUCCESS,
	SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_ERROR,
	SET_KINK_REQUEST_START,
	SET_KINK_REQUEST_ERROR,
	SET_KINK_REQUEST_SUCCESS,
	SET_MULTIPLIER_PER_YEAR_REQUEST_START,
	SET_MULTIPLIER_PER_YEAR_REQUEST_ERROR,
	SET_MULTIPLIER_PER_YEAR_REQUEST_SUCCESS,
	RESET_ECONOMIC_UPDATE_REQUESTS,
	FEED_VALUES_REQUEST_START,
	FEED_VALUES_REQUEST_SUCCESS,
	FEED_VALUES_REQUEST_ERROR,
	LOCK_PRICE_REQUEST_START,
	LOCK_PRICE_REQUEST_SUCCESS,
	LOCK_PRICE_REQUEST_ERROR,
	UNLOCK_PRICE_REQUEST_START,
	UNLOCK_PRICE_REQUEST_SUCCESS,
	UNLOCK_PRICE_REQUEST_ERROR,
	GET_LIQUIDATION_BALANCING_PERIOD_START,
	GET_LIQUIDATION_BALANCING_PERIOD_ERROR,
	GET_LIQUIDATION_BALANCING_PERIOD_SUCCESS,
	SET_DEVIATION_THRESHOLD_START,
	SET_DEVIATION_THRESHOLD_ERROR,
	SET_DEVIATION_THRESHOLD_SUCCESS,
	SET_BALANCE_RATIO_START,
	SET_BALANCE_RATIO_ERROR,
	SET_BALANCE_RATIO_SUCCESS,
	SET_BORROW_CAP_START,
	SET_BORROW_CAP_ERROR,
	SET_BORROW_CAP_SUCCESS,
	GET_LIQUIDATION_POOL_PARAMS_START,
	GET_LIQUIDATION_POOL_PARAMS_SUCCESS,
	GET_LIQUIDATION_POOL_PARAMS_ERROR,
	SET_BALANCING_PERIOD_START,
	SET_BALANCING_PERIOD_SUCCESS,
	SET_BALANCING_PERIOD_ERROR,
	SET_INSURANCE_FACTOR_START,
	SET_INSURANCE_FACTOR_SUCCESS,
	SET_INSURANCE_FACTOR_ERROR,
	SET_COLLATERAL_FACTOR_REQUEST_ERROR,
	SET_COLLATERAL_FACTOR_REQUEST_SUCCESS,
	SET_COLLATERAL_FACTOR_REQUEST_START,
	SET_THRESHOLD_REQUEST_ERROR,
	SET_THRESHOLD_REQUEST_SUCCESS,
	SET_THRESHOLD_REQUEST_START,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_ERROR,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_START,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_SUCCESS,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_START,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_SUCCESS,
	SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_ERROR,
	SWITCH_MODE_START,
	SWITCH_MODE_ERROR,
	SWITCH_MODE_SUCCESS,
	PAUSE_SPECIFIC_OPERATION_START,
	PAUSE_SPECIFIC_OPERATION_SUCCESS,
	PAUSE_SPECIFIC_OPERATION_ERROR,
	UNPAUSE_SPECIFIC_OPERATION_START,
	UNPAUSE_SPECIFIC_OPERATION_SUCCESS,
	UNPAUSE_SPECIFIC_OPERATION_ERROR,
} from '../../actions/types';

const initialState: EconomicUpdatesReducerType = {
	setBaseRateYearResponse: null,
	isSetBaseRateYearResponseRunning: false,
	setJumpMultiplierYearResponse: null,
	isSetJumpMultiplierYearResponseRunning: false,
	setKinkResponse: null,
	isSetKinkResponseRunning: false,
	setMultiplierPerYearResponse: null,
	isSetMultiplierPerYearResponseRunning: false,
	feedValuesResponse: null,
	isFeedValuesResponseRunning: false,
	lockPriceResponse: null,
	isLockPriceResponseRunning: false,
	unlockPriceResponse: null,
	isUnlockPriceResponseRunning: false,
	setDeviationThresholdResponse: null,
	isSetDeviationThresholdResponseRunning: false,
	setBalanceRatioResponse: null,
	isSetBalanceRatioResponseRunning: false,
	setBorrowCapResponse: null,
	isSetBorrowCapResponseRunning: false,
	setBalancingPeriodResponse: null,
	isSetBalancingPeriodResponseRunning: false,
	setInsuranceFactorResponse: null,
	isSetInsuranceFactorResponseRunning: false,
	setCollateralFactorResponse: null,
	isSetCollateralFactorResponseRunning: false,
	setThresholdResponse: null,
	isSetThresholdResponseRunning: false,
	setLiquidationsMaxAttemptsResponse: null,
	isSetLiquidationsMaxAttemptsResponseRunning: false,
	setLoanSizeLiquidationThresholdResponse: null,
	isSetLoanSizeLiquidationThresholdResponseRunning: false,
	switchModeResponse: null,
	isSwitchModeResponseRunning: false,
	pauseSpecificOperationResponse: null,
	isPauseSpecificOperationResponseRunning: false,
	unpauseSpecificOperationResponse: null,
	isUnpauseSpecificOperationResponseRunning: false,

	liquidationPoolBalancingPeriod: null,
	liquidationPoolsParams: null,
};

export default function economicUpdatesReducer(
	state = initialState,
	action: Action
): EconomicUpdatesReducerType {
	switch (action.type) {
		case SET_BASE_RATE_PER_YEAR_REQUEST_START: {
			return {
				...state,
				isSetBaseRateYearResponseRunning: true,
				setBaseRateYearResponse: null,
			};
		}
		case SET_BASE_RATE_PER_YEAR_REQUEST_SUCCESS: {
			return {
				...state,
				isSetBaseRateYearResponseRunning: false,
				setBaseRateYearResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SET_BASE_RATE_PER_YEAR_REQUEST_ERROR: {
			return {
				...state,
				isSetBaseRateYearResponseRunning: false,
				setBaseRateYearResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_START: {
			return {
				...state,
				isSetJumpMultiplierYearResponseRunning: true,
				setJumpMultiplierYearResponse: null,
			};
		}
		case SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_SUCCESS: {
			return {
				...state,
				isSetJumpMultiplierYearResponseRunning: false,
				setJumpMultiplierYearResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_ERROR: {
			return {
				...state,
				isSetJumpMultiplierYearResponseRunning: false,
				setJumpMultiplierYearResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case SET_KINK_REQUEST_START: {
			return {
				...state,
				isSetKinkResponseRunning: true,
				setKinkResponse: null,
			};
		}
		case SET_KINK_REQUEST_SUCCESS: {
			return {
				...state,
				isSetKinkResponseRunning: false,
				setKinkResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SET_KINK_REQUEST_ERROR: {
			return {
				...state,
				isSetKinkResponseRunning: false,
				setKinkResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case SET_MULTIPLIER_PER_YEAR_REQUEST_START: {
			return {
				...state,
				isSetMultiplierPerYearResponseRunning: true,
				setMultiplierPerYearResponse: null,
			};
		}
		case SET_MULTIPLIER_PER_YEAR_REQUEST_SUCCESS: {
			return {
				...state,
				isSetMultiplierPerYearResponseRunning: false,
				setMultiplierPerYearResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SET_MULTIPLIER_PER_YEAR_REQUEST_ERROR: {
			return {
				...state,
				isSetMultiplierPerYearResponseRunning: false,
				setMultiplierPerYearResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case RESET_ECONOMIC_UPDATE_REQUESTS: {
			return {
				...initialState,
				setCollateralFactorResponse: null,
				isSetCollateralFactorResponseRunning: false,
				setThresholdResponse: null,
				isSetThresholdResponseRunning: false,
				setLiquidationsMaxAttemptsResponse: null,
				isSetLiquidationsMaxAttemptsResponseRunning: false,
				setLoanSizeLiquidationThresholdResponse: null,
				isSetLoanSizeLiquidationThresholdResponseRunning: false,
				switchModeResponse: null,
				isSwitchModeResponseRunning: false,
				pauseSpecificOperationResponse: null,
				isPauseSpecificOperationResponseRunning: false,
				unpauseSpecificOperationResponse: null,
				isUnpauseSpecificOperationResponseRunning: false,
			};
		}

		case FEED_VALUES_REQUEST_START: {
			return {
				...state,
				isFeedValuesResponseRunning: true,
				feedValuesResponse: null,
			};
		}

		case FEED_VALUES_REQUEST_SUCCESS: {
			return {
				...state,
				isFeedValuesResponseRunning: false,
				feedValuesResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}

		case FEED_VALUES_REQUEST_ERROR: {
			return {
				...state,
				isFeedValuesResponseRunning: false,
				feedValuesResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case LOCK_PRICE_REQUEST_START: {
			return {
				...state,
				isLockPriceResponseRunning: true,
				lockPriceResponse: null,
			};
		}
		case LOCK_PRICE_REQUEST_SUCCESS: {
			return {
				...state,
				isLockPriceResponseRunning: false,
				lockPriceResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case LOCK_PRICE_REQUEST_ERROR: {
			return {
				...state,
				isLockPriceResponseRunning: false,
				lockPriceResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case UNLOCK_PRICE_REQUEST_START: {
			return {
				...state,
				isUnlockPriceResponseRunning: true,
				unlockPriceResponse: null,
			};
		}
		case UNLOCK_PRICE_REQUEST_SUCCESS: {
			return {
				...state,
				isUnlockPriceResponseRunning: false,
				unlockPriceResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case UNLOCK_PRICE_REQUEST_ERROR: {
			return {
				...state,
				isUnlockPriceResponseRunning: false,
				unlockPriceResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case GET_LIQUIDATION_BALANCING_PERIOD_START: {
			return state;
		}

		case GET_LIQUIDATION_BALANCING_PERIOD_SUCCESS: {
			return {
				...state,
				liquidationPoolBalancingPeriod: action.payload,
			};
		}

		case GET_LIQUIDATION_BALANCING_PERIOD_ERROR: {
			return state;
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

		case SET_BORROW_CAP_START: {
			return {
				...state,
				isSetBorrowCapResponseRunning: true,
				setBorrowCapResponse: null,
			};
		}
		case SET_BORROW_CAP_SUCCESS: {
			return {
				...state,
				isSetBorrowCapResponseRunning: false,
				setBorrowCapResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SET_BORROW_CAP_ERROR: {
			return {
				...state,
				isSetBorrowCapResponseRunning: false,
				setBorrowCapResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case GET_LIQUIDATION_POOL_PARAMS_START: {
			return state;
		}

		case GET_LIQUIDATION_POOL_PARAMS_SUCCESS: {
			return {
				...state,
				liquidationPoolsParams: action.payload,
			};
		}

		case GET_LIQUIDATION_POOL_PARAMS_ERROR: {
			return state;
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

		case PAUSE_SPECIFIC_OPERATION_START: {
			return {
				...state,
				isPauseSpecificOperationResponseRunning: true,
				pauseSpecificOperationResponse: null,
			};
		}
		case PAUSE_SPECIFIC_OPERATION_SUCCESS: {
			return {
				...state,
				isPauseSpecificOperationResponseRunning: false,
				pauseSpecificOperationResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case PAUSE_SPECIFIC_OPERATION_ERROR: {
			return {
				...state,
				isPauseSpecificOperationResponseRunning: false,
				pauseSpecificOperationResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}
		case UNPAUSE_SPECIFIC_OPERATION_START: {
			return {
				...state,
				isUnpauseSpecificOperationResponseRunning: true,
				unpauseSpecificOperationResponse: null,
			};
		}
		case UNPAUSE_SPECIFIC_OPERATION_SUCCESS: {
			return {
				...state,
				isUnpauseSpecificOperationResponseRunning: false,
				unpauseSpecificOperationResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case UNPAUSE_SPECIFIC_OPERATION_ERROR: {
			return {
				...state,
				isUnpauseSpecificOperationResponseRunning: false,
				unpauseSpecificOperationResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		default:
			return state;
	}
}
