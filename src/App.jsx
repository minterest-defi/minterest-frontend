import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import MainPage from './containers/Main/Main';
import { loadAccounts } from './actions/accounts';
import { initializeAPI } from './actions/api';
import { API_STATE_READY, KEYRING_STATE_READY } from './util/constants';
import { Dimmer, Grid, Loader, Message } from 'semantic-ui-react';

function App(props) {
	const {
		loadAccounts,
		initializeAPI,
		apiState,
		apiError,
		keyringState,
	} = props;
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

	if (apiState === 'ERROR') return <MessageWrap err={apiError} />;
	else if (apiState !== API_STATE_READY)
		return <LoaderWrap text={'Connecting to Substrate'} />;

	if (keyringState !== KEYRING_STATE_READY) {
		return (
			<LoaderWrap
				text={"Loading accounts (please review any extension's authorization)"}
			/>
		);
	}

	return <MainPage />;
}

// TODO refactoring
const LoaderWrap = ({ text }) => (
	<Dimmer active>
		<Loader size='small'>{text}</Loader>
	</Dimmer>
);

const MessageWrap = ({ err }) => (
	<Grid centered columns={1} padded>
		<Grid.Column>
			<Message
				negative
				compact
				floating
				header='Error Connecting to Substrate'
				content={`${err}`}
			/>
		</Grid.Column>
	</Grid>
);

const mapStateToProps = (state) => ({
	apiState: state.substrate.apiState,
	apiError: state.substrate.apiError,
	keyringState: state.account.keyringState,
});
const mapDispatchToProps = {
	loadAccounts,
	initializeAPI,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
