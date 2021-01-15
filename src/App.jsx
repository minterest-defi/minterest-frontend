import React, { useState, createRef } from 'react';
import { Dimmer, Loader, Grid, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import classes from './App.module.css';

import { useSubstrate } from './substrate-lib';

import Deposit from './components/Deposit/Deposit';
import SwitchDeposit from './components/Switch/SwitchDeposit';
import Redeem from './components/Redeem/Redeem';
import RedeemUnderlyingAsset from './components/Redeem/RedeemUnderlyingAsset';
import RedeemWrappedToken from './components/Redeem/RedeemWrappedToken';
import BalancePool from './components/BalancePool/BalancePool';
import Borrow from './components/Borrow/Borrow';
import RepayAll from './components/Repay/RepayAll';
import Repay from './components/Repay/Repay';
import Rates from './components/Rates/Rates';
import BalanceBorrowUser from './components/BalanceBorrow/BalanceBorrowUser';
import BalanceBorrowPool from './components/BalanceBorrow/BalanceBorrowPool';
import Header from './components/Header/Header';
import ContentUser from './components/ContentUser/ContentUser';

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
				<Header account={accountAddress} onChange={setAccountAddress} />
			</div>
			<div className={classes.content}>
				<div>
					<ContentUser account={accountAddress} />
				</div>
				<div>
					<BalancePool />
				</div>
				<div>
					<Rates />
				</div>
				<div>
					<BalanceBorrowUser account={accountAddress} />
				</div>
				<div>
					<BalanceBorrowPool />
				</div>
			</div>
			<div className={classes.button}>
				<h2>Actions</h2>
				<Deposit account={accountAddress} />
				<Redeem account={accountAddress} />
				<RedeemUnderlyingAsset account={accountAddress} />
				<RedeemWrappedToken account={accountAddress} />
				<Borrow account={accountAddress} />
				<RepayAll account={accountAddress} />
				<Repay account={accountAddress} />
			</div>
			<div className={classes.admin}>
				<h2>Admin panel</h2>
				<SwitchDeposit />
			</div>
		</div>
	);
}

export default App;
