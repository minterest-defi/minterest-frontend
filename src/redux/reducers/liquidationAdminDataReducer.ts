import { Action, LiquidationAdminDataReducerType } from '../../util/types';
import {
	GET_LIQUIDATION_POOLS_BALANCE_START,
	GET_LIQUIDATION_POOLS_BALANCE_ERROR,
	GET_LIQUIDATION_POOLS_BALANCE_SUCCESS,
	GET_LIQUIDATION_POOL_PARAMS_START,
	GET_LIQUIDATION_POOL_PARAMS_SUCCESS,
	GET_LIQUIDATION_POOL_PARAMS_ERROR,
	GET_RISK_MANAGER_PARAMS_START,
	GET_RISK_MANAGER_PARAMS_SUCCESS,
	GET_RISK_MANAGER_PARAMS_ERROR,
} from '../../actions/types';

const initialState: LiquidationAdminDataReducerType = {
	liquidationPoolsBalance: null,
	riskManagerParams: null,
	liquidationPoolsParams: null,
};

export default function liquidationAdminDataReducer(
	state = initialState,
	action: Action
): LiquidationAdminDataReducerType {
	switch (action.type) {
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

		case GET_RISK_MANAGER_PARAMS_START: {
			return state;
		}

		case GET_RISK_MANAGER_PARAMS_SUCCESS: {
			return {
				...state,
				riskManagerParams: action.payload,
			};
		}

		case GET_RISK_MANAGER_PARAMS_ERROR: {
			return state;
		}

		default:
			return state;
	}
}
