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
	GET_MINTEREST_MODEL_DATA_START,
	GET_MINTEREST_MODEL_DATA_ERROR,
	GET_MINTEREST_MODEL_DATA_SUCCESS,
	FEED_VALUES_REQUEST_START,
	FEED_VALUES_REQUEST_SUCCESS,
	FEED_VALUES_REQUEST_ERROR,
	LOCK_PRICE_REQUEST_START,
	LOCK_PRICE_REQUEST_SUCCESS,
	LOCK_PRICE_REQUEST_ERROR,
	UNLOCK_PRICE_REQUEST_START,
	UNLOCK_PRICE_REQUEST_SUCCESS,
	UNLOCK_PRICE_REQUEST_ERROR,
	GET_LOCKED_PRICES_START,
	GET_LOCKED_PRICES_ERROR,
	GET_LOCKED_PRICES_SUCCESS,
	GET_LIQUIDATION_POOLS_BALANCE_START,
	GET_LIQUIDATION_POOLS_BALANCE_ERROR,
	GET_LIQUIDATION_POOLS_BALANCE_SUCCESS,
	GET_LIQUIDATION_POOLS_PARAMETERS_START,
	GET_LIQUIDATION_POOLS_PARAMETERS_ERROR,
	GET_LIQUIDATION_POOLS_PARAMETERS_SUCCESS,
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

	minterestModelData: null,
	lockedPricesData: null,
	liquidationPoolsBalance: null,
	liquidationPoolsParameters: null,
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
			};
		}

		case GET_MINTEREST_MODEL_DATA_START: {
			return state;
		}
		case GET_MINTEREST_MODEL_DATA_SUCCESS: {
			return {
				...state,
				minterestModelData: action.payload,
			};
		}
		case GET_MINTEREST_MODEL_DATA_ERROR: {
			return state;
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

		case GET_LOCKED_PRICES_START: {
			return state;
		}
		case GET_LOCKED_PRICES_SUCCESS: {
			return {
				...state,
				lockedPricesData: action.payload,
			};
		}
		case GET_LOCKED_PRICES_ERROR: {
			return state;
		}

		case GET_LIQUIDATION_POOLS_BALANCE_START: {
			return state;
		}

		case GET_LIQUIDATION_POOLS_BALANCE_SUCCESS: {
			return {
				...state,
				liquidationPoolsBalance: action.payload,
			};
		}

		case GET_LIQUIDATION_POOLS_BALANCE_ERROR: {
			return state;
		}

		case GET_LIQUIDATION_POOLS_PARAMETERS_START: {
			return state;
		}

		case GET_LIQUIDATION_POOLS_PARAMETERS_SUCCESS: {
			return {
				...state,
				liquidationPoolsParameters: action.payload,
			};
		}

		case GET_LIQUIDATION_POOLS_PARAMETERS_ERROR: {
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

		default:
			return state;
	}
}
