import React, { useState, createRef } from 'react';
import { Dimmer, Loader, Grid, Sticky, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import classes from './App.module.css';

import { useSubstrate } from './substrate-lib';

import AccountSelector from './components/AccountSelector/AccountSelector';
import BalanceUser from './components/BalanceUser/BalanceUser';
import BalanceAnnotation from './components/BalanceAnnotation/BalanceAnnotation';
import Deposit from './components/Deposit/Deposit';
import Switch from './components/Switch/Switch';

function App() {
	const [accountAddress, setAccountAddress] = useState(null);
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
				<Sticky context={contextRef}>
					<AccountSelector
						account={accountAddress}
						onChange={setAccountAddress}
					/>
				</Sticky>
				<BalanceAnnotation account={accountAddress} />
			</div>
			<div className={classes.content}>
				<BalanceUser account={accountAddress} />
			</div>
			<div className={classes.button}>
				<h2>Actions</h2>
				<Deposit account={accountAddress} />
			</div>
			<div className={classes.admin}>
				<h2>Admin panel</h2>
				<Switch />
			</div>
		</div>
	);
}

export default App;
