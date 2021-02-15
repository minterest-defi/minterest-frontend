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
};

export default function economicUpdates(state = initialState, action) {
	switch (action.type) {
		case SET_BASE_RATE_PER_BLOCK_REQUEST_START: {
			return state;
		}
		case SET_BASE_RATE_PER_BLOCK_REQUEST_SUCCESS: {
			return state;
		}
		case SET_BASE_RATE_PER_BLOCK_REQUEST_ERROR: {
			return state;
		}

		case SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_START: {
			return state;
		}
		case SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_SUCCESS: {
			return state;
		}
		case SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_ERROR: {
			return state;
		}

		case SET_KINK_REQUEST_START: {
			return state;
		}
		case SET_KINK_REQUEST_SUCCESS: {
			return state;
		}
		case SET_KINK_REQUEST_ERROR: {
			return state;
		}

		case SET_MULTIPLIER_PER_BLOCK_REQUEST_START: {
			return state;
		}
		case SET_MULTIPLIER_PER_BLOCK_REQUEST_SUCCESS: {
			return state;
		}
		case SET_MULTIPLIER_PER_BLOCK_REQUEST_ERROR: {
			return state;
		}

		default:
			return state;
	}
}
