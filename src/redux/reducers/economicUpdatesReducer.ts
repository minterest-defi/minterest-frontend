import { Action } from '../../util/types';
import {
	SET_BASE_RATE_PER_BLOCK_REQUEST_START,
	SET_BASE_RATE_PER_BLOCK_REQUEST_ERROR,
	SET_BASE_RATE_PER_BLOCK_REQUEST_SUCCESS,
	SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_START,
	SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_ERROR,
	SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_SUCCESS,
	SET_KINK_REQUEST_START,
	SET_KINK_REQUEST_ERROR,
	SET_KINK_REQUEST_SUCCESS,
	SET_MULTIPLIER_PER_BLOCK_REQUEST_START,
	SET_MULTIPLIER_PER_BLOCK_REQUEST_ERROR,
	SET_MULTIPLIER_PER_BLOCK_REQUEST_SUCCESS,
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
	GET_BALANCE_DEVIATION_THRESHOLD_START,
	GET_BALANCE_DEVIATION_THRESHOLD_ERROR,
	GET_BALANCE_DEVIATION_THRESHOLD_SUCCESS,
	SET_DEVIATION_THRESHOLD_START,
	SET_DEVIATION_THRESHOLD_ERROR,
	SET_DEVIATION_THRESHOLD_SUCCESS,
} from '../../actions/types';

const initialState = {
	setBaseRateBlockResponse: null,
	isSetBaseRateBlockResponseRunning: false,
	setJumpMultiplierBlockResponse: null,
	isSetJumpMultiplierBlockResponseRunning: false,
	setKinkResponse: null,
	isSetKinkResponseRunning: false,
	setMultiplierPerBlockResponse: null,
	isSetMultiplierPerBlockResponseRunning: false,
	feedValuesResponse: null,
	isFeedValuesResponseRunning: false,
	lockPriceResponse: null,
	isLockPriceResponseRunning: false,
	unlockPriceResponse: null,
	isUnlockPriceResponseRunning: false,
	setDeviationThresholdResponse: null,
	isSetDeviationThresholdResponseRunning: false,

	minterestModelData: null,
	lockedPricesData: null,
	liquidationPoolsBalance: null,
	balanceDeviationThreshold: null,
};

export default function economicUpdatesReducer(
	state = initialState,
	action: Action
) {
	switch (action.type) {
		case SET_BASE_RATE_PER_BLOCK_REQUEST_START: {
			return {
				...state,
				isSetBaseRateBlockResponseRunning: true,
				setBaseRateBlockResponse: null,
			};
		}
		case SET_BASE_RATE_PER_BLOCK_REQUEST_SUCCESS: {
			return {
				...state,
				isSetBaseRateBlockResponseRunning: false,
				setBaseRateBlockResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SET_BASE_RATE_PER_BLOCK_REQUEST_ERROR: {
			return {
				...state,
				isSetBaseRateBlockResponseRunning: false,
				setBaseRateBlockResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_START: {
			return {
				...state,
				isSetJumpMultiplierBlockResponseRunning: true,
				setJumpMultiplierBlockResponse: null,
			};
		}
		case SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_SUCCESS: {
			return {
				...state,
				isSetJumpMultiplierBlockResponseRunning: false,
				setJumpMultiplierBlockResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_ERROR: {
			return {
				...state,
				isSetJumpMultiplierBlockResponseRunning: false,
				setJumpMultiplierBlockResponse: {
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

		case SET_MULTIPLIER_PER_BLOCK_REQUEST_START: {
			return {
				...state,
				isSetMultiplierPerBlockResponseRunning: true,
				setMultiplierPerBlockResponse: null,
			};
		}
		case SET_MULTIPLIER_PER_BLOCK_REQUEST_SUCCESS: {
			return {
				...state,
				isSetMultiplierPerBlockResponseRunning: false,
				setMultiplierPerBlockResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SET_MULTIPLIER_PER_BLOCK_REQUEST_ERROR: {
			return {
				...state,
				isSetMultiplierPerBlockResponseRunning: false,
				setMultiplierPerBlockResponse: {
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

		case GET_BALANCE_DEVIATION_THRESHOLD_START: {
			return state;
		}

		case GET_BALANCE_DEVIATION_THRESHOLD_SUCCESS: {
			return {
				...state,
				balanceDeviationThreshold: action.payload,
			};
		}

		case GET_BALANCE_DEVIATION_THRESHOLD_ERROR: {
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

		default:
			return state;
	}
}
