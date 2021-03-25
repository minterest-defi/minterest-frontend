import { Action, EconomicDataReducerType } from '../../util/types';
import {
	RESET_ADMIN_REQUESTS,
	GET_ADMIN_CONTROLLER_DATA_START,
	GET_ADMIN_CONTROLLER_DATA_SUCCESS,
	GET_ADMIN_CONTROLLER_DATA_ERROR,
	GET_RISK_MANAGER_DATA_SUCCESS,
	GET_RISK_MANAGER_DATA_START,
	GET_RISK_MANAGER_DATA_ERROR,
	GET_WHITELIST_MODE_START,
	GET_WHITELIST_MODE_ERROR,
	GET_WHITELIST_MODE_SUCCESS,
	GET_PAUSE_KEEPERS_START,
	GET_PAUSE_KEEPERS_SUCCESS,
	GET_PAUSE_KEEPERS_ERROR,
	PAUSE_SPECIFIC_OPERATION_START,
	PAUSE_SPECIFIC_OPERATION_SUCCESS,
	PAUSE_SPECIFIC_OPERATION_ERROR,
	UNPAUSE_SPECIFIC_OPERATION_START,
	UNPAUSE_SPECIFIC_OPERATION_SUCCESS,
	UNPAUSE_SPECIFIC_OPERATION_ERROR,
} from '../../actions/types';

const initialState: EconomicDataReducerType = {
	pauseSpecificOperationResponse: null,
	isPauseSpecificOperationResponseRunning: false,
	unpauseSpecificOperationResponse: null,
	isUnpauseSpecificOperationResponseRunning: false,

	controllerData: null,
	riskManagerData: null,
	whitelistMode: null,
	pauseKeepers: null,
};

export default function adminReducer(
	state = initialState,
	action: Action
): EconomicDataReducerType {
	switch (action.type) {
		case RESET_ADMIN_REQUESTS: {
			return {
				...state,
				pauseSpecificOperationResponse: null,
				isPauseSpecificOperationResponseRunning: false,
				unpauseSpecificOperationResponse: null,
				isUnpauseSpecificOperationResponseRunning: false,
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
