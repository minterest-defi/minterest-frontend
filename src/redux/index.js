import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import accountReducer from './reducers/accountReducer';
import substrateReducer from './reducers/substrateReducer';
import economicUpdatesReducer from './reducers/economicUpdatesReducer';
import adminReducer from './reducers/adminReducer';
import usersFinancicalTransactionsReducer from './reducers/usersFinancicalTransactionsReducer';
import balanceAnnotationReducer from './reducers/balanceAnnotationReducer';
import dashboardDataReducer from './reducers/dashboardDataReducer';
import {
	DEPOSIT_UNDERLYING_REQUEST_SUCCESS,
	REDEEM_REQUEST_SUCCESS,
	REDEEM_UNDERLYING_REQUEST_SUCCESS,
	REDEEM_WRAPPED_REQUEST_SUCCESS,
	BORROW_REQUEST_SUCCESS,
	REPAY_ALL_REQUEST_SUCCESS,
	REPAY_REQUEST_SUCCESS,
	REPAY_ON_BEHALF_REQUEST_SUCCESS,
} from '../actions/types';

const reducers = {
	form: formReducer.plugin({
		depositUnderlying: (state, action) => {
			switch (action.type) {
				case DEPOSIT_UNDERLYING_REQUEST_SUCCESS:
					return {
						...state,
						values: {
							...state.values,
							underlyingAmount: undefined,
							underlyingAssetId: undefined,
						},
					};
				default:
					return state;
			}
		},
		borrow: (state, action) => {
			switch (action.type) {
				case BORROW_REQUEST_SUCCESS:
					return {
						...state,
						values: {
							...state.values,
							borrowAmount: undefined,
							underlyingAssetId: undefined,
						},
					};
				default:
					return state;
			}
		},
		redeem: (state, action) => {
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
		redeemUnderlying: (state, action) => {
			switch (action.type) {
				case REDEEM_UNDERLYING_REQUEST_SUCCESS:
					return {
						...state,
						values: {
							...state.values,
							underlyingAmount: undefined,
							underlyingAssetId: undefined,
						},
					};
				default:
					return state;
			}
		},
		redeemUnderlyredeemWrappeding: (state, action) => {
			switch (action.type) {
				case REDEEM_WRAPPED_REQUEST_SUCCESS:
					return {
						...state,
						values: {
							...state.values,
							wrappedAmount: undefined,
							wrappedId: undefined,
						},
					};
				default:
					return state;
			}
		},
		repay: (state, action) => {
			switch (action.type) {
				case REPAY_REQUEST_SUCCESS:
					return {
						...state,
						values: {
							...state.values,
							repayAmount: undefined,
							underlyingAssetId: undefined,
						},
					};
				default:
					return state;
			}
		},
		repayAll: (state, action) => {
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
		repayOnBehalf: (state, action) => {
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
					};
				default:
					return state;
			}
		},
	}),
	account: accountReducer,
	substrate: substrateReducer,
	economicUpdates: economicUpdatesReducer,
	admin: adminReducer,
	usersFinancicalTransactions: usersFinancicalTransactionsReducer,
	dashboardData: dashboardDataReducer,
	balanceAnnotation: balanceAnnotationReducer,
};

const rootReducer = combineReducers(reducers);

const composeEnhancers =
	process.env.NODE_ENV !== 'production' &&
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk, logger))
);

export default store;
