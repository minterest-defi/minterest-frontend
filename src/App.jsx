import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import MainPage from './containers/Main/Main';
import { loadAccounts } from './actions/accounts';
import { initializeAPI } from './actions/api';
import { API_STATE_READY } from './util/constants';

function App(props) {
	const { loadAccounts, initializeAPI, apiState } = props;
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		initializeAPI();
	}, []);

	useEffect(() => {
		if (apiState === API_STATE_READY && !isInitialized) {
			loadAccounts();
			setIsInitialized(true);
		}
	}, [apiState]);

	return <MainPage />;
}

const mapStateToProps = (state) => ({
	apiState: state.substrate.apiState,
});
const mapDispatchToProps = {
	loadAccounts,
	initializeAPI,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
