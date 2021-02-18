import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import { loadAccounts, setAccount, checkIsAdmin } from './actions/accounts';
import { initializeAPI } from './actions/api';
import { API_STATE_READY, KEYRING_STATE_READY } from './util/constants';
import { Dimmer, Grid, Loader, Message, Tab } from 'semantic-ui-react';

import MainPage from './containers/Main/Main';
import AdminPage from './containers/Admin/Admin';
import Header from './components/Header/Header';

function App(props) {
	const {
		loadAccounts,
		initializeAPI,
		apiState,
		apiError,
		keyringState,
		currentAccount,
		keyring,
		setAccount,
		checkIsAdmin,
		isAdmin,
		isAdminRequestRunning,
	} = props;
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		initializeAPI();
	}, []);

	// checkIsAdmin
	useEffect(() => {
		if (currentAccount) {
			checkIsAdmin(currentAccount, keyring);
		}
	}, [currentAccount]);

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

	const panes = [
		{
			menuItem: 'Dashboard',
			render: () => (
				<Tab.Pane>
					<MainPage />
				</Tab.Pane>
			),
		},
	];

	if (isAdmin) {
		panes.push({
			menuItem: 'Admin',
			render: () => (
				<Tab.Pane>
					<AdminPage />
				</Tab.Pane>
			),
		});
	}

	return (
		<div>
			<div>
				<Header
					account={currentAccount}
					onChange={setAccount}
					isCheckingAdmin={isAdminRequestRunning}
				/>
			</div>
			<Tab panes={panes} />
		</div>
	);
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
	currentAccount: state.account.currentAccount,
	keyring: state.account.keyring,
	isAdmin: state.account.isAdmin,
	isAdminRequestRunning: state.account.isAdminRequestRunning,
});
const mapDispatchToProps = {
	loadAccounts,
	initializeAPI,
	setAccount,
	checkIsAdmin,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
