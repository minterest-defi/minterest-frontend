import { Action, ProtocolAdminDataReducerType } from '../../util/types';
import {
	GET_WHITELIST_MODE_START,
	GET_WHITELIST_MODE_ERROR,
	GET_WHITELIST_MODE_SUCCESS,
	GET_CONTROLLER_PARAMS_START,
	GET_CONTROLLER_PARAMS_SUCCESS,
	GET_CONTROLLER_PARAMS_ERROR,
	GET_MINTEREST_MODEL_PARAMS_START,
	GET_MINTEREST_MODEL_PARAMS_ERROR,
	GET_MINTEREST_MODEL_PARAMS_SUCCESS,
	GET_PAUSE_KEEPERS_START,
	GET_PAUSE_KEEPERS_SUCCESS,
	GET_PAUSE_KEEPERS_ERROR,
	GET_MNT_SPEED_START,
	GET_MNT_SPEED_SUCCESS,
	GET_MNT_SPEED_ERROR,
	GET_MNT_RATE_START,
	GET_MNT_RATE_SUCCESS,
	GET_MNT_RATE_ERROR,
	GET_ADMIN_LOCKED_PRICES_START,
	GET_ADMIN_LOCKED_PRICES_SUCCESS,
	GET_ADMIN_LOCKED_PRICES_ERROR,
	GET_ADMIN_FRESH_PRICES_START,
	GET_ADMIN_FRESH_PRICES_SUCCESS,
	GET_ADMIN_FRESH_PRICES_ERROR,
	GET_UTILIZATION_RATE_START,
	GET_UTILIZATION_RATE_ERROR,
	GET_UTILIZATION_RATE_SUCCESS,
} from '../../actions/types';

const initialState: ProtocolAdminDataReducerType = {
	whitelistMode: null,
	controllerParams: null,
	minterestModelParams: null,
	pauseKeepers: null,
	lockedPricesData: null,
	freshPricesData: null,
	MNTSpeeds: null,
	MNTRate: null,
	utilizationRate: null,
};

export default function protocolAdminDataReducer(
	state = initialState,
	action: Action
): ProtocolAdminDataReducerType {
	switch (action.type) {
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

		case GET_CONTROLLER_PARAMS_START: {
			return state;
		}

		case GET_CONTROLLER_PARAMS_SUCCESS: {
			return {
				...state,
				controllerParams: action.payload,
			};
		}

		case GET_CONTROLLER_PARAMS_ERROR: {
			return state;
		}

		case GET_MINTEREST_MODEL_PARAMS_START: {
			return state;
		}
		case GET_MINTEREST_MODEL_PARAMS_SUCCESS: {
			return {
				...state,
				minterestModelParams: action.payload,
			};
		}
		case GET_MINTEREST_MODEL_PARAMS_ERROR: {
			return state;
		}

		case GET_PAUSE_KEEPERS_START: {
			return state;
		}

		case GET_PAUSE_KEEPERS_SUCCESS: {
			return {
				...state,
				pauseKeepers: action.payload,
			};
		}

		case GET_PAUSE_KEEPERS_ERROR: {
			return state;
		}

		case GET_ADMIN_LOCKED_PRICES_START: {
			return state;
		}
		case GET_ADMIN_LOCKED_PRICES_SUCCESS: {
			return {
				...state,
				lockedPricesData: action.payload,
			};
		}
		case GET_ADMIN_LOCKED_PRICES_ERROR: {
			return state;
		}

		case GET_ADMIN_FRESH_PRICES_START: {
			return state;
		}
		case GET_ADMIN_FRESH_PRICES_SUCCESS: {
			return {
				...state,
				freshPricesData: action.payload,
			};
		}
		case GET_ADMIN_FRESH_PRICES_ERROR: {
			return state;
		}

		case GET_MNT_SPEED_START: {
			return state;
		}

		case GET_MNT_SPEED_SUCCESS: {
			return {
				...state,
				MNTSpeeds: action.payload,
			};
		}

		case GET_MNT_SPEED_ERROR: {
			return state;
		}

		case GET_MNT_RATE_START: {
			return state;
		}

		case GET_MNT_RATE_SUCCESS: {
			return {
				...state,
				MNTRate: action.payload,
			};
		}

		case GET_MNT_RATE_ERROR: {
			return state;
		}

		case GET_UTILIZATION_RATE_START: {
			return state;
		}

		case GET_UTILIZATION_RATE_SUCCESS: {
			return {
				...state,
				utilizationRate: action.payload,
			};
		}

		case GET_UTILIZATION_RATE_ERROR: {
			return state;
		}

		default:
			return state;
	}
}
