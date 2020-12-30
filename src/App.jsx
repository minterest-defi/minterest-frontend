import React, { useState, createRef } from 'react';
import { Dimmer, Loader, Grid, Sticky, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { useSubstrate } from './substrate-lib';

import AccountSelector from './components/AccountSelector/AccountSelector';
import BalanceUser from './components/BalanceUser/BalanceUser';
import BalanceAnnotation from './components/BalanceAnnotation/BalanceAnnotation';

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
		<div ref={contextRef}>
			<Sticky context={contextRef}>
				<AccountSelector
					account={accountAddress}
					onChange={setAccountAddress}
				/>
			</Sticky>
			<BalanceAnnotation account={accountAddress} />
			<BalanceUser account={accountAddress} />
		</div>
	);
}

export default App;
