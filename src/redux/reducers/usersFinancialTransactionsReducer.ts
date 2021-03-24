import { Action, userFinancialTransactionsReducerType } from '../../util/types';
import {
	DEPOSIT_UNDERLYING_REQUEST_START,
	DEPOSIT_UNDERLYING_REQUEST_ERROR,
	DEPOSIT_UNDERLYING_REQUEST_SUCCESS,
	BORROW_REQUEST_START,
	BORROW_REQUEST_ERROR,
	BORROW_REQUEST_SUCCESS,
	REDEEM_REQUEST_START,
	REDEEM_REQUEST_ERROR,
	REDEEM_REQUEST_SUCCESS,
	REDEEM_UNDERLYING_REQUEST_START,
	REDEEM_UNDERLYING_REQUEST_ERROR,
	REDEEM_UNDERLYING_REQUEST_SUCCESS,
	REDEEM_WRAPPED_REQUEST_START,
	REDEEM_WRAPPED_REQUEST_ERROR,
	REDEEM_WRAPPED_REQUEST_SUCCESS,
	REPAY_ALL_REQUEST_START,
	REPAY_ALL_REQUEST_ERROR,
	REPAY_ALL_REQUEST_SUCCESS,
	REPAY_REQUEST_START,
	REPAY_REQUEST_ERROR,
	REPAY_REQUEST_SUCCESS,
	REPAY_ON_BEHALF_REQUEST_START,
	REPAY_ON_BEHALF_REQUEST_ERROR,
	REPAY_ON_BEHALF_REQUEST_SUCCESS,
	RESET_USER_REQUESTS,
	TRANSFER_WRAPPED_START,
	TRANSFER_WRAPPED_ERROR,
	TRANSFER_WRAPPED_SUCCESS,
	DISABLE_COLLATERAL_START,
	DISABLE_COLLATERAL_ERROR,
	DISABLE_COLLATERAL_SUCCESS,
	ENABLE_AS_COLLATERAL_START,
	ENABLE_AS_COLLATERAL_ERROR,
	ENABLE_AS_COLLATERAL_SUCCESS,
} from '../../actions/types';

const initialState: userFinancialTransactionsReducerType = {
	isDepositUnderlyingResponseRunning: false,
	depositUnderlyingResponse: null,
	isBorrowResponseRunning: false,
	borrowResponse: null,
	isRedeemResponseRunning: false,
	redeemResponse: null,
	isRedeemUnderlyingResponseRunning: false,
	redeemUnderlyingResponse: null,
	isRedeemWrappedResponseRunning: false,
	redeemWrappedResponse: null,
	isRepayAllResponseRunning: false,
	repayAllResponse: null,
	isRepayResponseRunning: false,
	repayResponse: null,
	isRepayOnBehalfResponseRunning: false,
	repayOnBehalfResponse: null,
	isTransferWrappedResponseRunning: false,
	transferWrappedResponse: null,
	disableCollateralResponse: null,
	isDisableCollateralResponseRunning: false,
	enableAsCollateralResponse: null,
	isEnableAsCollateralResponseRunning: false,
};

export default function userFinancialTransactionsReducer(
	state = initialState,
	action: Action
): userFinancialTransactionsReducerType {
	switch (action.type) {
		case RESET_USER_REQUESTS: {
			return {
				...state,
				isDepositUnderlyingResponseRunning: false,
				depositUnderlyingResponse: null,
				isBorrowResponseRunning: false,
				borrowResponse: null,
				isRedeemResponseRunning: false,
				redeemResponse: null,
				isRedeemUnderlyingResponseRunning: false,
				redeemUnderlyingResponse: null,
				isRedeemWrappedResponseRunning: false,
				redeemWrappedResponse: null,
				isRepayAllResponseRunning: false,
				repayAllResponse: null,
				isRepayResponseRunning: false,
				repayResponse: null,
				isRepayOnBehalfResponseRunning: false,
				repayOnBehalfResponse: null,
				isTransferWrappedResponseRunning: false,
				transferWrappedResponse: null,
				disableCollateralResponse: null,
				isDisableCollateralResponseRunning: false,
				enableAsCollateralResponse: null,
				isEnableAsCollateralResponseRunning: false,
			};
		}
		case DEPOSIT_UNDERLYING_REQUEST_START: {
			return {
				...state,
				isDepositUnderlyingResponseRunning: true,
				depositUnderlyingResponse: null,
			};
		}
		case DEPOSIT_UNDERLYING_REQUEST_SUCCESS: {
			return {
				...state,
				isDepositUnderlyingResponseRunning: false,
				depositUnderlyingResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case DEPOSIT_UNDERLYING_REQUEST_ERROR: {
			return {
				...state,
				isDepositUnderlyingResponseRunning: false,
				depositUnderlyingResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case BORROW_REQUEST_START: {
			return {
				...state,
				isBorrowResponseRunning: true,
				borrowResponse: null,
			};
		}
		case BORROW_REQUEST_SUCCESS: {
			return {
				...state,
				isBorrowResponseRunning: false,
				borrowResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case BORROW_REQUEST_ERROR: {
			return {
				...state,
				isBorrowResponseRunning: false,
				borrowResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}
		case REDEEM_REQUEST_START: {
			return {
				...state,
				isRedeemResponseRunning: true,
				redeemResponse: null,
			};
		}
		case REDEEM_REQUEST_SUCCESS: {
			return {
				...state,
				isRedeemResponseRunning: false,
				redeemResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case REDEEM_REQUEST_ERROR: {
			return {
				...state,
				isRedeemResponseRunning: false,
				redeemResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}
		case REDEEM_UNDERLYING_REQUEST_START: {
			return {
				...state,
				isRedeemUnderlyingResponseRunning: true,
				redeemUnderlyingResponse: null,
			};
		}
		case REDEEM_UNDERLYING_REQUEST_SUCCESS: {
			return {
				...state,
				isRedeemUnderlyingResponseRunning: false,
				redeemUnderlyingResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case REDEEM_UNDERLYING_REQUEST_ERROR: {
			return {
				...state,
				isRedeemUnderlyingResponseRunning: false,
				redeemUnderlyingResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}
		case REDEEM_WRAPPED_REQUEST_START: {
			return {
				...state,
				isRedeemWrappedResponseRunning: true,
				redeemWrappedResponse: null,
			};
		}
		case REDEEM_WRAPPED_REQUEST_SUCCESS: {
			return {
				...state,
				isRedeemWrappedResponseRunning: false,
				redeemWrappedResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case REDEEM_WRAPPED_REQUEST_ERROR: {
			return {
				...state,
				isRedeemWrappedResponseRunning: false,
				redeemWrappedResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}
		case REPAY_ALL_REQUEST_START: {
			return {
				...state,
				isRepayAllResponseRunning: true,
				repayAllResponse: null,
			};
		}
		case REPAY_ALL_REQUEST_SUCCESS: {
			return {
				...state,
				isRepayAllResponseRunning: false,
				repayAllResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case REPAY_ALL_REQUEST_ERROR: {
			return {
				...state,
				isRepayAllResponseRunning: false,
				repayAllResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case REPAY_REQUEST_START: {
			return { ...state, isRepayResponseRunning: true, repayResponse: null };
		}
		case REPAY_REQUEST_SUCCESS: {
			return {
				...state,
				isRepayResponseRunning: false,
				repayResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case REPAY_REQUEST_ERROR: {
			return {
				...state,
				isRepayResponseRunning: false,
				repayResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case REPAY_ON_BEHALF_REQUEST_START: {
			return {
				...state,
				isRepayOnBehalfResponseRunning: true,
				repayOnBehalfResponse: null,
			};
		}
		case REPAY_ON_BEHALF_REQUEST_SUCCESS: {
			return {
				...state,
				isRepayOnBehalfResponseRunning: false,
				repayOnBehalfResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case REPAY_ON_BEHALF_REQUEST_ERROR: {
			return {
				...state,
				isRepayOnBehalfResponseRunning: false,
				repayOnBehalfResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case TRANSFER_WRAPPED_START: {
			return {
				...state,
				isTransferWrappedResponseRunning: true,
				transferWrappedResponse: null,
			};
		}
		case TRANSFER_WRAPPED_SUCCESS: {
			return {
				...state,
				isTransferWrappedResponseRunning: false,
				transferWrappedResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case TRANSFER_WRAPPED_ERROR: {
			return {
				...state,
				isTransferWrappedResponseRunning: false,
				transferWrappedResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case DISABLE_COLLATERAL_START: {
			return {
				...state,
				isDisableCollateralResponseRunning: true,
				disableCollateralResponse: {
					isError: false,
					errorMessage: null,
					poolId: action.payload,
				},
			};
		}
		case DISABLE_COLLATERAL_SUCCESS: {
			return {
				...state,
				isDisableCollateralResponseRunning: false,
				disableCollateralResponse: {
					isError: false,
					errorMessage: null,
					poolId: null,
				},
			};
		}
		case DISABLE_COLLATERAL_ERROR: {
			return {
				...state,
				isDisableCollateralResponseRunning: false,
				disableCollateralResponse: {
					isError: true,
					errorMessage: action.payload,
					poolId: null,
				},
			};
		}

		case ENABLE_AS_COLLATERAL_START: {
			return {
				...state,
				isEnableAsCollateralResponseRunning: true,
				enableAsCollateralResponse: {
					isError: false,
					errorMessage: null,
					poolId: action.payload,
				},
			};
		}
		case ENABLE_AS_COLLATERAL_SUCCESS: {
			return {
				...state,
				isEnableAsCollateralResponseRunning: false,
				enableAsCollateralResponse: {
					isError: false,
					errorMessage: null,
					poolId: null,
				},
			};
		}
		case ENABLE_AS_COLLATERAL_ERROR: {
			return {
				...state,
				isEnableAsCollateralResponseRunning: false,
				enableAsCollateralResponse: {
					isError: true,
					errorMessage: action.payload,
					poolId: null,
				},
			};
		}

		default:
			return state;
	}
}
