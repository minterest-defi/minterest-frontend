import { Action } from '../../util/types';
import {
	DEPOSIT_UNDERLYING_REQUEST_SUCCESS,
	REDEEM_REQUEST_SUCCESS,
	REDEEM_UNDERLYING_REQUEST_SUCCESS,
	REDEEM_WRAPPED_REQUEST_SUCCESS,
	BORROW_REQUEST_SUCCESS,
	REPAY_ALL_REQUEST_SUCCESS,
	REPAY_REQUEST_SUCCESS,
	REPAY_ON_BEHALF_REQUEST_SUCCESS,
	FEED_VALUES_REQUEST_SUCCESS,
	LOCK_PRICE_REQUEST_SUCCESS,
	UNLOCK_PRICE_REQUEST_SUCCESS,
	SET_DEVIATION_THRESHOLD_SUCCESS,
	SET_BALANCE_RATIO_SUCCESS,
	TRANSFER_WRAPPED_SUCCESS,
	SET_BORROW_CAP_SUCCESS,
	PAUSE_SPECIFIC_OPERATION_SUCCESS,
	UNPAUSE_SPECIFIC_OPERATION_SUCCESS,
} from '../../actions/types';

export const plugin = {
	depositUnderlying: (state: any, action: Action) => {
		switch (action.type) {
			case DEPOSIT_UNDERLYING_REQUEST_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						underlyingAmount: undefined,
						underlyingAssetId: undefined,
					},
					fields: {
						...state.fields,
						underlyingAmount: false,
					},
				};
			default:
				return state;
		}
	},
	borrow: (state: any, action: Action) => {
		switch (action.type) {
			case BORROW_REQUEST_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						borrowAmount: undefined,
						underlyingAssetId: undefined,
					},
					fields: {
						...state.fields,
						borrowAmount: undefined,
					},
				};
			default:
				return state;
		}
	},
	redeem: (state: any, action: Action) => {
		switch (action.type) {
			case REDEEM_REQUEST_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						underlyingAssetId: undefined,
					},
				};
			default:
				return state;
		}
	},
	redeemUnderlying: (state: any, action: Action) => {
		switch (action.type) {
			case REDEEM_UNDERLYING_REQUEST_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						underlyingAmount: undefined,
						underlyingAssetId: undefined,
					},
					fields: {
						...state.fields,
						underlyingAmount: false,
					},
				};
			default:
				return state;
		}
	},
	redeemUnderlyredeemWrappeding: (state: any, action: Action) => {
		switch (action.type) {
			case REDEEM_WRAPPED_REQUEST_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						wrappedAmount: undefined,
						wrappedId: undefined,
					},
					fields: {
						...state.fields,
						wrappedAmount: false,
					},
				};
			default:
				return state;
		}
	},
	repay: (state: any, action: Action) => {
		switch (action.type) {
			case REPAY_REQUEST_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						repayAmount: undefined,
						underlyingAssetId: undefined,
					},
					fields: {
						...state.fields,
						repayAmount: false,
					},
				};
			default:
				return state;
		}
	},
	repayAll: (state: any, action: Action) => {
		switch (action.type) {
			case REPAY_ALL_REQUEST_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						underlyingAssetId: undefined,
					},
				};
			default:
				return state;
		}
	},
	repayOnBehalf: (state: any, action: Action) => {
		switch (action.type) {
			case REPAY_ON_BEHALF_REQUEST_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						borrower: undefined,
						repayAmount: undefined,
						underlyingAssetId: undefined,
					},
					fields: {
						...state.fields,
						borrower: false,
						repayAmount: false,
					},
				};
			default:
				return state;
		}
	},
	transferWrapped: (state: any, action: Action) => {
		switch (action.type) {
			case TRANSFER_WRAPPED_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						receiver: undefined,
						wrappedId: undefined,
						convertedAmount: undefined,
					},
					fields: {
						...state.fields,
						receiver: false,
						convertedAmount: false,
					},
				};
			default:
				return state;
		}
	},
	feedValues: (state: any, action: Action) => {
		switch (action.type) {
			case FEED_VALUES_REQUEST_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						values: undefined,
					},
				};
			default:
				return state;
		}
	},
	lockPrice: (state: any, action: Action) => {
		switch (action.type) {
			case LOCK_PRICE_REQUEST_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						currencyId: undefined,
					},
				};
			default:
				return state;
		}
	},
	unlockPrice: (state: any, action: Action) => {
		switch (action.type) {
			case UNLOCK_PRICE_REQUEST_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						currencyId: undefined,
					},
				};
			default:
				return state;
		}
	},
	setDeviationThreshold: (state: any, action: Action) => {
		switch (action.type) {
			case SET_DEVIATION_THRESHOLD_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						poolId: undefined,
						newThreshold: undefined,
					},
					fields: {
						...state.fields,
						newThreshold: false,
					},
				};
			default:
				return state;
		}
	},
	setBalanceRatio: (state: any, action: Action) => {
		switch (action.type) {
			case SET_BALANCE_RATIO_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						poolId: undefined,
						newBalanceRatio: undefined,
					},
					fields: {
						...state.fields,
						newBalanceRatio: false,
					},
				};
			default:
				return state;
		}
	},
	setBorrowCap: (state: any, action: Action) => {
		switch (action.type) {
			case SET_BORROW_CAP_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						poolId: undefined,
						borrowCap: undefined,
					},
					fields: {
						...state.fields,
						borrowCap: false,
					},
				};
			default:
				return state;
		}
	},
	pauseSpecificOperation: (state: any, action: Action) => {
		switch (action.type) {
			case PAUSE_SPECIFIC_OPERATION_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						poolId: undefined,
						operation: undefined,
					},
				};
			default:
				return state;
		}
	},
	unpauseSpecificOperation: (state: any, action: Action) => {
		switch (action.type) {
			case UNPAUSE_SPECIFIC_OPERATION_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						poolId: undefined,
						operation: undefined,
					},
				};
			default:
				return state;
		}
	},
};
