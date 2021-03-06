import { Action, DashboardDataReducerType } from '../../util/types';
import {
	GET_USER_BALANCE_START,
	GET_USER_BALANCE_ERROR,
	GET_USER_BALANCE_SUCCESS,
	GET_POOL_USER_PARAMS_START,
	GET_POOL_USER_PARAMS_ERROR,
	GET_POOL_USER_PARAMS_SUCCESS,
	GET_POOLS_BALANCE_START,
	GET_POOLS_BALANCE_ERROR,
	GET_POOLS_BALANCE_SUCCESS,
	GET_POOLS_BORROW_BALANCE_START,
	GET_POOLS_BORROW_BALANCE_ERROR,
	GET_POOLS_BORROW_BALANCE_SUCCESS,
	GET_RATES_DATA_START,
	GET_RATES_DATA_ERROR,
	GET_RATES_DATA_SUCCESS,
	RESET_DASHBOARD_DATA,
	RESET_USER_DATA,
	GET_BALANCE_ANNOTATION_START,
	GET_BALANCE_ANNOTATION_ERROR,
	GET_BALANCE_ANNOTATION_SUCCESS,
	GET_USER_BALANCE_USD_START,
	GET_USER_BALANCE_USD_SUCCESS,
	GET_USER_BALANCE_USD_ERROR,
	GET_HYPOTHETICAL_LIQUIDITY_DATA_START,
	GET_HYPOTHETICAL_LIQUIDITY_DATA_SUCCESS,
	GET_HYPOTHETICAL_LIQUIDITY_DATA_ERROR,
	GET_OPERATION_INFO_START,
	GET_OPERATION_INFO_SUCCESS,
	GET_OPERATION_INFO_ERROR,
	GET_ACCOUNT_COLLATERAL_START,
	GET_ACCOUNT_COLLATERAL_ERROR,
	GET_ACCOUNT_COLLATERAL_SUCCESS,
	GET_USER_BORROW_PER_ASSET_START,
	GET_USER_BORROW_PER_ASSET_ERROR,
	GET_USER_BORROW_PER_ASSET_SUCCESS,
	RESET_OPERATION_INFO,
	GET_UNCLAIMED_BALANCE_ANNOTATION_START,
	GET_UNCLAIMED_BALANCE_ANNOTATION_SUCCESS,
	GET_UNCLAIMED_BALANCE_ANNOTATION_ERROR,
	GET_USER_UNDERLYING_BALANCE_PER_ASSET_START,
	GET_USER_UNDERLYING_BALANCE_PER_ASSET_ERROR,
	GET_USER_UNDERLYING_BALANCE_PER_ASSET_SUCCESS,
} from '../../actions/types';

const initialState: DashboardDataReducerType = {
	usersBalance: null,
	usersBorrowBalance: null,
	poolsBalance: null,
	poolUserParams: null,
	ratesData: null,
	balanceAnnotation: null,
	unclaimedBalanceAnnotation: null,
	poolsBorrowBalance: null,
	userBalanceUSD: null,
	operationInfo: null,
	hypotheticalLiquidityData: null,
	accountCollateral: null,
	userBorrowPerAsset: null,
	userUnderlyingBalancePerAsset: null,
};

export default function dashboardDataReducer(
	state = initialState,
	action: Action
): DashboardDataReducerType {
	switch (action.type) {
		case RESET_DASHBOARD_DATA: {
			return {
				...initialState,
			};
		}

		case RESET_OPERATION_INFO: {
			return {
				...state,
				operationInfo: null,
			};
		}

		case RESET_USER_DATA: {
			return {
				...state,
				usersBalance: null,
				poolUserParams: null,
				balanceAnnotation: null,
				userBalanceUSD: null,
				hypotheticalLiquidityData: null,
				accountCollateral: null,
			};
		}

		case GET_USER_BALANCE_START: {
			return state;
		}

		case GET_USER_BALANCE_SUCCESS: {
			return {
				...state,
				usersBalance: action.payload,
			};
		}

		case GET_USER_BALANCE_ERROR: {
			return state;
		}

		case GET_POOL_USER_PARAMS_START: {
			return state;
		}
		case GET_POOL_USER_PARAMS_SUCCESS: {
			return {
				...state,
				poolUserParams: action.payload,
			};
		}
		case GET_POOL_USER_PARAMS_ERROR: {
			return state;
		}

		case GET_POOLS_BALANCE_START: {
			return state;
		}

		case GET_POOLS_BALANCE_SUCCESS: {
			return {
				...state,
				poolsBalance: action.payload,
			};
		}

		case GET_POOLS_BALANCE_ERROR: {
			return state;
		}

		case GET_POOLS_BORROW_BALANCE_START: {
			return state;
		}

		case GET_POOLS_BORROW_BALANCE_SUCCESS: {
			return {
				...state,
				poolsBorrowBalance: action.payload,
			};
		}

		case GET_POOLS_BORROW_BALANCE_ERROR: {
			return state;
		}

		case GET_RATES_DATA_START: {
			return state;
		}

		case GET_RATES_DATA_SUCCESS: {
			return {
				...state,
				ratesData: action.payload,
			};
		}

		case GET_RATES_DATA_ERROR: {
			return state;
		}

		case GET_BALANCE_ANNOTATION_START: {
			return state;
		}

		case GET_BALANCE_ANNOTATION_SUCCESS: {
			return {
				...state,
				balanceAnnotation: action.payload,
			};
		}

		case GET_BALANCE_ANNOTATION_ERROR: {
			return state;
		}

		case GET_UNCLAIMED_BALANCE_ANNOTATION_START: {
			return state;
		}

		case GET_UNCLAIMED_BALANCE_ANNOTATION_SUCCESS: {
			return {
				...state,
				unclaimedBalanceAnnotation: action.payload,
			};
		}

		case GET_UNCLAIMED_BALANCE_ANNOTATION_ERROR: {
			return state;
		}

		case GET_USER_BALANCE_USD_START: {
			return state;
		}

		case GET_USER_BALANCE_USD_SUCCESS: {
			return {
				...state,
				userBalanceUSD: action.payload,
			};
		}

		case GET_USER_BALANCE_USD_ERROR: {
			return state;
		}

		case GET_HYPOTHETICAL_LIQUIDITY_DATA_START: {
			return state;
		}

		case GET_HYPOTHETICAL_LIQUIDITY_DATA_SUCCESS: {
			return {
				...state,
				hypotheticalLiquidityData: action.payload,
			};
		}

		case GET_HYPOTHETICAL_LIQUIDITY_DATA_ERROR: {
			return state;
		}

		case GET_OPERATION_INFO_START: {
			return {
				...state,
				operationInfo: null,
			};
		}

		case GET_OPERATION_INFO_SUCCESS: {
			return {
				...state,
				operationInfo: action.payload,
			};
		}

		case GET_OPERATION_INFO_ERROR: {
			return {
				...state,
				operationInfo: null,
			};
		}

		case GET_ACCOUNT_COLLATERAL_START: {
			return state;
		}

		case GET_ACCOUNT_COLLATERAL_SUCCESS: {
			return {
				...state,
				accountCollateral: action.payload,
			};
		}

		case GET_ACCOUNT_COLLATERAL_ERROR: {
			return state;
		}

		case GET_USER_BORROW_PER_ASSET_START: {
			return state;
		}

		case GET_USER_BORROW_PER_ASSET_SUCCESS: {
			return {
				...state,
				userBorrowPerAsset: action.payload,
			};
		}

		case GET_USER_BORROW_PER_ASSET_ERROR: {
			return state;
		}

		case GET_USER_UNDERLYING_BALANCE_PER_ASSET_START: {
			return state;
		}

		case GET_USER_UNDERLYING_BALANCE_PER_ASSET_SUCCESS: {
			return {
				...state,
				userUnderlyingBalancePerAsset: action.payload,
			};
		}

		case GET_USER_UNDERLYING_BALANCE_PER_ASSET_ERROR: {
			return state;
		}

		default:
			return state;
	}
}
