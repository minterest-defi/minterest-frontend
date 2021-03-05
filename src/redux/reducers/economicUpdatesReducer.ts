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

	minterestModelData: null,
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

		default:
			return state;
	}
}
