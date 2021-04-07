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
	PAUSE_OPERATION_SUCCESS,
	RESUME_OPERATION_SUCCESS,
	SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_SUCCESS,
	SET_BASE_RATE_PER_YEAR_REQUEST_SUCCESS,
	SET_MULTIPLIER_PER_YEAR_REQUEST_SUCCESS,
	SET_KINK_REQUEST_SUCCESS,
	SET_PROTOCOL_INTEREST_FACTOR_SUCCESS,
	SET_PROTOCOL_INTEREST_THRESHOLD_SUCCESS,
	SET_COLLATERAL_FACTOR_REQUEST_SUCCESS,
	SET_THRESHOLD_REQUEST_SUCCESS,
	SET_MNT_RATE_FOR_SIDE_SUCCESS,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_SUCCESS,
	SET_MIN_PARTIAL_LIQUIDATION_SUM_SUCCESS,
	SET_BALANCING_PERIOD_SUCCESS,
	SET_LIQUIDATION_POOL_TOTAL_SUCCESS,
	SET_LIQUIDATION_FEE_SUCCESS,
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
	pauseOperation: (state: any, action: Action) => {
		switch (action.type) {
			case PAUSE_OPERATION_SUCCESS:
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
	resumeOperation: (state: any, action: Action) => {
		switch (action.type) {
			case RESUME_OPERATION_SUCCESS:
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
	setJumpMultiplierPerYear: (state: any, action: Action) => {
		switch (action.type) {
			case SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						poolId: undefined,
						jumpMultiplierRatePerYear: undefined,
					},
					fields: {
						...state.fields,
						jumpMultiplierRatePerYear: false,
					},
				};
			default:
				return state;
		}
	},
	setBaseRatePerYear: (state: any, action: Action) => {
		switch (action.type) {
			case SET_BASE_RATE_PER_YEAR_REQUEST_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						poolId: undefined,
						baseRatePerYear: undefined,
					},
					fields: {
						...state.fields,
						baseRatePerYear: false,
					},
				};
			default:
				return state;
		}
	},
	setMultiplierPerYear: (state: any, action: Action) => {
		switch (action.type) {
			case SET_MULTIPLIER_PER_YEAR_REQUEST_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						poolId: undefined,
						multiplierRatePerYear: undefined,
					},
					fields: {
						...state.fields,
						multiplierRatePerYear: false,
					},
				};
			default:
				return state;
		}
	},
	setKink: (state: any, action: Action) => {
		switch (action.type) {
			case SET_KINK_REQUEST_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						poolId: undefined,
						kink: undefined,
					},
					fields: {
						...state.fields,
						kink: false,
					},
				};
			default:
				return state;
		}
	},
	setProtocolInterestFactor: (state: any, action: Action) => {
		switch (action.type) {
			case SET_PROTOCOL_INTEREST_FACTOR_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						poolId: undefined,
						newAmount: undefined,
					},
					fields: {
						...state.fields,
						newAmount: false,
					},
				};
			default:
				return state;
		}
	},
	setProtocolInterestThreshold: (state: any, action: Action) => {
		switch (action.type) {
			case SET_PROTOCOL_INTEREST_THRESHOLD_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						poolId: undefined,
						protocolInterestThreshold: undefined,
					},
					fields: {
						...state.fields,
						protocolInterestThreshold: false,
					},
				};
			default:
				return state;
		}
	},
	setCollateralFactor: (state: any, action: Action) => {
		switch (action.type) {
			case SET_COLLATERAL_FACTOR_REQUEST_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						poolId: undefined,
						newAmount: undefined,
					},
					fields: {
						...state.fields,
						newAmount: false,
					},
				};
			default:
				return state;
		}
	},
	setThreshold: (state: any, action: Action) => {
		switch (action.type) {
			case SET_THRESHOLD_REQUEST_SUCCESS:
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
	setMNTRateForSide: (state: any, action: Action) => {
		switch (action.type) {
			case SET_MNT_RATE_FOR_SIDE_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						rateForSide: undefined,
					},
					fields: {
						...state.fields,
						rateForSide: false,
					},
				};
			default:
				return state;
		}
	},
	setLiquidationsMaxAttempts: (state: any, action: Action) => {
		switch (action.type) {
			case SET_LIQUIDATIONS_MAX_ATTEMPTS_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						poolId: undefined,
						newMaxValue: undefined,
					},
					fields: {
						...state.fields,
						newMaxValue: false,
					},
				};
			default:
				return state;
		}
	},
	setMinPartialLiquidationSum: (state: any, action: Action) => {
		switch (action.type) {
			case SET_MIN_PARTIAL_LIQUIDATION_SUM_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						poolId: undefined,
						newMinSum: undefined,
					},
					fields: {
						...state.fields,
						newMinSum: false,
					},
				};
			default:
				return state;
		}
	},
	setBalancingPeriod: (state: any, action: Action) => {
		switch (action.type) {
			case SET_BALANCING_PERIOD_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						newPeriod: undefined,
					},
					fields: {
						...state.fields,
						newPeriod: false,
					},
				};
			default:
				return state;
		}
	},
	setLiquidationFee: (state: any, action: Action) => {
		switch (action.type) {
			case SET_LIQUIDATION_FEE_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						poolId: undefined,
						liquidationFee: undefined,
					},
					fields: {
						...state.fields,
						liquidationFee: false,
					},
				};
			default:
				return state;
		}
	},
	setLiquidationPoolTotal: (state: any, action: Action) => {
		switch (action.type) {
			case SET_LIQUIDATION_POOL_TOTAL_SUCCESS:
				return {
					...state,
					values: {
						...state.values,
						currencyId: undefined,
						amount: undefined,
					},
					fields: {
						...state.fields,
						amount: false,
					},
				};
			default:
				return state;
		}
	},
};
