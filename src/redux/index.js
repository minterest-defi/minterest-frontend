import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import accountReducer from './reducers/accountReducer';
import substrateReducer from './reducers/substrateReducer';
import economicUpdatesReducer from './reducers/economicUpdatesReducer';
import adminReducer from './reducers/adminReducer';
import usersFinancicalTransactionsReducer from './reducers/usersFinancicalTransactionsReducer';
import dashboardDataReducer from './reducers/dashboardDataReducer';

const reducers = {
	form: formReducer,
	account: accountReducer,
	substrate: substrateReducer,
	economicUpdates: economicUpdatesReducer,
	admin: adminReducer,
	usersFinancicalTransactions: usersFinancicalTransactionsReducer,
	dashboardData: dashboardDataReducer,
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
