import React, { useState, createRef } from 'react';
import { Dimmer, Loader, Grid, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import classes from './App.module.css';

import { useSubstrate } from './substrate-lib';

import Header from './components/Header/Header';
import ContentUser from './components/ContentUser/ContentUser';
import UserActions from './components/UserActions/UserActions';
import ContentPool from './components/ContentPool/ContentPool';
import AdminPanel from './components/AdminPanel/AdminPanel';

function App() {
	const [accountAddress, setAccountAddress] = useState(null);

	const [userState, setUserState] = useState(null);

	const { apiState, keyringState, apiError } = useSubstrate();

	const loader = (text) => (
		<Dimmer active>
			<Loader size='small'>{text}</Loader>
		</Dimmer>
	);

	const message = (err) => (
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

	if (apiState === 'ERROR') return message(apiError);
	else if (apiState !== 'READY') return loader('Connecting to Substrate');

	if (keyringState !== 'READY') {
		return loader(
			"Loading accounts (please review any extension's authorization)"
		);
	}
	const contextRef = createRef();

	return (
		<div ref={contextRef} className={classes.wrapper}>
			<div className={classes.header}>
				<Header account={accountAddress} onChange={setAccountAddress} />
			</div>
			<div className={classes.content_user}>
				<ContentUser account={accountAddress} />
			</div>
			<div className={classes.content_pool}>
				<ContentPool />
			</div>
			<div className={classes.button}>
				<h2>Actions</h2>
				<UserActions
					account={accountAddress}
					onChange={setUserState}
					userState={userState}
				/>
			</div>
			<div className={classes.admin}>
				<h2>Admin panel</h2>
				<AdminPanel account={accountAddress} />
			</div>
		</div>
	);
}

export default App;
