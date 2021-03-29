import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import accountReducer from './reducers/accountReducer';
import substrateReducer from './reducers/substrateReducer';
import protocolAdminDataReducer from './reducers/protocolAdminDataReducer';
import protocolAdminUpdatesReducer from './reducers/protocolAdminUpdatesReducer';
import liquidationAdminDataReducer from './reducers/liquidationAdminDataReducer';
import liquidationAdminUpdatesReducer from './reducers/liquidationAdminUpdatesReducer';
import usersFinancialTransactionsReducer from './reducers/usersFinancialTransactionsReducer';
import dashboardDataReducer from './reducers/dashboardDataReducer';
import { plugin } from './reducers/plugin';
import { Store } from '../util/types';

const reducers: Store = {
	form: formReducer.plugin(plugin),
	account: accountReducer,
	substrate: substrateReducer,
	protocolAdminData: protocolAdminDataReducer,
	protocolAdminUpdates: protocolAdminUpdatesReducer,
	liquidationAdminData: liquidationAdminDataReducer,
	liquidationAdminUpdates: liquidationAdminUpdatesReducer,
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
