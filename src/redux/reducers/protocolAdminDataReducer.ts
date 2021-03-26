import { Action, ProtocolAdminDataReducerType } from '../../util/types';
import {
	GET_ADMIN_CONTROLLER_DATA_START,
	GET_ADMIN_CONTROLLER_DATA_SUCCESS,
	GET_ADMIN_CONTROLLER_DATA_ERROR,
	GET_WHITELIST_MODE_START,
	GET_WHITELIST_MODE_ERROR,
	GET_WHITELIST_MODE_SUCCESS,
	GET_PAUSE_KEEPERS_START,
	GET_PAUSE_KEEPERS_SUCCESS,
	GET_PAUSE_KEEPERS_ERROR,
	GET_MINTEREST_MODEL_DATA_START,
	GET_MINTEREST_MODEL_DATA_ERROR,
	GET_MINTEREST_MODEL_DATA_SUCCESS,
	GET_LOCKED_PRICES_START,
	GET_LOCKED_PRICES_ERROR,
	GET_LOCKED_PRICES_SUCCESS,
} from '../../actions/types';

const initialState: ProtocolAdminDataReducerType = {
	controllerData: null,
	whitelistMode: null,
	pauseKeepers: null,
	minterestModelData: null,
	lockedPricesData: null,
};

export default function protocolAdminDataReducer(
	state = initialState,
	action: Action
): ProtocolAdminDataReducerType {
	switch (action.type) {
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

		default:
			return state;
	}
}