import { Action, ProtocolAdminUpdatesReducerType } from '../../util/types';
import {
	RESET_PROTOCOL_ADMIN_REQUESTS,
	SWITCH_WHITELIST_MODE_START,
	SWITCH_WHITELIST_MODE_ERROR,
	SWITCH_WHITELIST_MODE_SUCCESS,
	SET_PROTOCOL_INTEREST_FACTOR_START,
	SET_PROTOCOL_INTEREST_FACTOR_SUCCESS,
	SET_PROTOCOL_INTEREST_FACTOR_ERROR,
	SET_PROTOCOL_INTEREST_THRESHOLD_START,
	SET_PROTOCOL_INTEREST_THRESHOLD_SUCCESS,
	SET_PROTOCOL_INTEREST_THRESHOLD_ERROR,
	SET_COLLATERAL_FACTOR_REQUEST_ERROR,
	SET_COLLATERAL_FACTOR_REQUEST_START,
	SET_COLLATERAL_FACTOR_REQUEST_SUCCESS,
	SET_BASE_RATE_PER_YEAR_REQUEST_START,
	SET_BASE_RATE_PER_YEAR_REQUEST_ERROR,
	SET_BASE_RATE_PER_YEAR_REQUEST_SUCCESS,
	SET_MULTIPLIER_PER_YEAR_REQUEST_START,
	SET_MULTIPLIER_PER_YEAR_REQUEST_ERROR,
	SET_MULTIPLIER_PER_YEAR_REQUEST_SUCCESS,
	SET_KINK_REQUEST_START,
	SET_KINK_REQUEST_ERROR,
	SET_KINK_REQUEST_SUCCESS,
	SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_START,
	SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_SUCCESS,
	SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_ERROR,
	SET_BORROW_CAP_START,
	SET_BORROW_CAP_ERROR,
	SET_BORROW_CAP_SUCCESS,
	PAUSE_OPERATION_START,
	PAUSE_OPERATION_SUCCESS,
	PAUSE_OPERATION_ERROR,
	RESUME_OPERATION_START,
	RESUME_OPERATION_SUCCESS,
	RESUME_OPERATION_ERROR,
	LOCK_PRICE_REQUEST_START,
	LOCK_PRICE_REQUEST_SUCCESS,
	LOCK_PRICE_REQUEST_ERROR,
	UNLOCK_PRICE_REQUEST_START,
	UNLOCK_PRICE_REQUEST_SUCCESS,
	UNLOCK_PRICE_REQUEST_ERROR,
	FEED_VALUES_REQUEST_START,
	FEED_VALUES_REQUEST_SUCCESS,
	FEED_VALUES_REQUEST_ERROR,
	ENABLE_MNT_MINTING_ERROR,
	ENABLE_MNT_MINTING_START,
	ENABLE_MNT_MINTING_SUCCESS,
	DISABLE_MNT_MINTING_START,
	DISABLE_MNT_MINTING_SUCCESS,
	DISABLE_MNT_MINTING_ERROR,
	SET_MNT_RATE_FOR_SIDE_START,
	SET_MNT_RATE_FOR_SIDE_SUCCESS,
	SET_MNT_RATE_FOR_SIDE_ERROR,
} from '../../actions/types';

const initialState: ProtocolAdminUpdatesReducerType = {
	switchWhitelistModeResponse: null,
	isSwitchModeResponseRunning: false,
	setProtocolInterestFactorResponse: null,
	isSetProtocolInterestFactorResponseRunning: false,
	setProtocolInterestThresholdResponse: null,
	isSetProtocolInterestThresholdResponseRunning: false,
	setCollateralFactorResponse: null,
	isSetCollateralFactorResponseRunning: false,
	setBaseRateYearResponse: null,
	isSetBaseRateYearResponseRunning: false,
	setMultiplierPerYearResponse: null,
	isSetMultiplierPerYearResponseRunning: false,
	setKinkResponse: null,
	isSetKinkResponseRunning: false,
	setJumpMultiplierYearResponse: null,
	isSetJumpMultiplierYearResponseRunning: false,
	setBorrowCapResponse: null,
	isSetBorrowCapResponseRunning: false,
	pauseOperationResponse: null,
	isPauseOperationResponseRunning: false,
	resumeOperationResponse: null,
	isResumeOperationResponseRunning: false,
	lockPriceResponse: null,
	isLockPriceResponseRunning: false,
	unlockPriceResponse: null,
	isUnlockPriceResponseRunning: false,
	feedValuesResponse: null,
	isFeedValuesResponseRunning: false,
	toggleMNTMintingResponse: null,
	isToggleMNTMintingRequestRunning: false,
	setMNTRateResponse: null,
	isSetMNTRateRequestRunning: false,
	mintToggleCurrencyId: null,
};

export default function protocolAdminUpdatesReducer(
	state = initialState,
	action: Action
): ProtocolAdminUpdatesReducerType {
	switch (action.type) {
		case RESET_PROTOCOL_ADMIN_REQUESTS: {
			return {
				...initialState,
			};
		}

		case SWITCH_WHITELIST_MODE_START: {
			return {
				...state,
				isSwitchModeResponseRunning: true,
				switchWhitelistModeResponse: null,
			};
		}
		case SWITCH_WHITELIST_MODE_SUCCESS: {
			return {
				...state,
				isSwitchModeResponseRunning: false,
				switchWhitelistModeResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SWITCH_WHITELIST_MODE_ERROR: {
			return {
				...state,
				isSwitchModeResponseRunning: false,
				switchWhitelistModeResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case SET_PROTOCOL_INTEREST_FACTOR_START: {
			return {
				...state,
				isSetProtocolInterestFactorResponseRunning: true,
				setProtocolInterestFactorResponse: null,
			};
		}
		case SET_PROTOCOL_INTEREST_FACTOR_SUCCESS: {
			return {
				...state,
				isSetProtocolInterestFactorResponseRunning: false,
				setProtocolInterestFactorResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SET_PROTOCOL_INTEREST_FACTOR_ERROR: {
			return {
				...state,
				isSetProtocolInterestFactorResponseRunning: false,
				setProtocolInterestFactorResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case SET_PROTOCOL_INTEREST_THRESHOLD_START: {
			return {
				...state,
				isSetProtocolInterestThresholdResponseRunning: true,
				setProtocolInterestThresholdResponse: null,
			};
		}
		case SET_PROTOCOL_INTEREST_THRESHOLD_SUCCESS: {
			return {
				...state,
				isSetProtocolInterestThresholdResponseRunning: false,
				setProtocolInterestThresholdResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case SET_PROTOCOL_INTEREST_THRESHOLD_ERROR: {
			return {
				...state,
				isSetProtocolInterestThresholdResponseRunning: false,
				setProtocolInterestThresholdResponse: {
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

		case PAUSE_OPERATION_START: {
			return {
				...state,
				isPauseOperationResponseRunning: true,
				pauseOperationResponse: null,
			};
		}
		case PAUSE_OPERATION_SUCCESS: {
			return {
				...state,
				isPauseOperationResponseRunning: false,
				pauseOperationResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case PAUSE_OPERATION_ERROR: {
			return {
				...state,
				isPauseOperationResponseRunning: false,
				pauseOperationResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}
		case RESUME_OPERATION_START: {
			return {
				...state,
				isResumeOperationResponseRunning: true,
				resumeOperationResponse: null,
			};
		}
		case RESUME_OPERATION_SUCCESS: {
			return {
				...state,
				isResumeOperationResponseRunning: false,
				resumeOperationResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case RESUME_OPERATION_ERROR: {
			return {
				...state,
				isResumeOperationResponseRunning: false,
				resumeOperationResponse: {
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

		case DISABLE_MNT_MINTING_START:
		case ENABLE_MNT_MINTING_START: {
			return {
				...state,
				isToggleMNTMintingRequestRunning: true,
				toggleMNTMintingResponse: null,
				mintToggleCurrencyId: action.payload,
			};
		}

		case DISABLE_MNT_MINTING_SUCCESS:
		case ENABLE_MNT_MINTING_SUCCESS: {
			return {
				...state,
				isToggleMNTMintingRequestRunning: false,
				toggleMNTMintingResponse: {
					isError: false,
					errorMessage: null,
				},
				mintToggleCurrencyId: null,
			};
		}

		case DISABLE_MNT_MINTING_ERROR:
		case ENABLE_MNT_MINTING_ERROR: {
			return {
				...state,
				isToggleMNTMintingRequestRunning: false,
				toggleMNTMintingResponse: {
					isError: true,
					errorMessage: action.payload,
				},
				mintToggleCurrencyId: null,
			};
		}

		case SET_MNT_RATE_FOR_SIDE_START: {
			return {
				...state,
				isSetMNTRateRequestRunning: true,
				setMNTRateResponse: null,
			};
		}

		case SET_MNT_RATE_FOR_SIDE_SUCCESS: {
			return {
				...state,
				isSetMNTRateRequestRunning: false,
				setMNTRateResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}

		case SET_MNT_RATE_FOR_SIDE_ERROR: {
			return {
				...state,
				isSetMNTRateRequestRunning: false,
				setMNTRateResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		default:
			return state;
	}
}
