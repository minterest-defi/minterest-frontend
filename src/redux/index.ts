import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import accountReducer from './reducers/accountReducer';
import substrateReducer from './reducers/substrateReducer';
import economicUpdatesReducer from './reducers/economicUpdatesReducer';
import adminReducer from './reducers/adminReducer';
import usersFinancialTransactionsReducer from './reducers/usersFinancialTransactionsReducer';
import dashboardDataReducer from './reducers/dashboardDataReducer';
import { plugin } from './reducers/plugin';
import { Store } from '../util/types';

const reducers: Store = {
	form: formReducer.plugin(plugin),
	account: accountReducer,
	substrate: substrateReducer,
	economicUpdates: economicUpdatesReducer,
	admin: adminReducer,
	usersFinancialTransactions: usersFinancialTransactionsReducer,
	dashboardData: dashboardDataReducer,
};

const rootReducer = combineReducers(reducers);

// @ts-ignore
const { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ } = window;

const composeEnhancers =
	process.env.NODE_ENV !== 'production' &&
	typeof window === 'object' &&
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? __REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk, logger))
);

export default store;
