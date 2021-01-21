import React, { useState, useEffect } from 'react';
import { Form, Input, Dropdown } from 'semantic-ui-react';

import { UNDERLYING_ASSETS_TYPES } from '../../../util/constants';

import Loading from '../../../util/Loading';
import ButtonTx from '../../../util/ButtonTx';

import classes from './Deposit.module.css';

function Deposit({ account, setStateStale, stateStale }) {
	const [amount, setAmount] = useState(0);
	const [asset, setAsset] = useState('');
	const [loading, setLoading] = useState(false);
	const [isInvalid, setInvalid] = useState(true);

	useEffect(() => {
		setInvalid(!(asset && amount && account));
	}, [setInvalid, account, amount, asset]);

	const setInitialStates = () => {
		setAmount(0);
		setAsset('');
		setInvalid(!(asset && amount && account));
	};

	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	const onChangeAmount = (e) => {
		setAmount(BigInt(e.target.value) * 10n ** 18n);
	};

	const onChangeAsset = (e) => {
		setAsset(e.target.innerText);
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<Form className={classes.deposit}>
			<Input
				className={classes.input}
				type='text'
				placeholder='Enter the amount'
				onChange={onChangeAmount}
			/>
			<Dropdown
				compact
				placeholder='Asset'
				search
				selection
				options={assets}
				onChange={onChangeAsset}
			/>
			<ButtonTx
				account={account}
				transactionParams={[asset, amount]}
				setStateStale={setStateStale}
				stateStale={stateStale}
				setLoading={setLoading}
				isInvalid={isInvalid}
				setInitialStates={setInitialStates}
				buttonLabel={'Deposit'}
				palletName={'minterestProtocol'}
				transactionName={'depositUnderlying'}
			/>
		</Form>
	);
}

export default Deposit;
