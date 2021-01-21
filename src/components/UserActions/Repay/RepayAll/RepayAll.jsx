import React, { useState, useEffect } from 'react';
import { UNDERLYING_ASSETS_TYPES } from '../../../../util/constants';

import { Form, Dropdown } from 'semantic-ui-react';
import Loading from '../../../../util/Loading';

import classes from './RepayAll.module.css';
import ButtonTx from '../../../../util/ButtonTx';

function RepayAll({ account, setStateStale, stateStale }) {
	const [asset, setAsset] = useState('');
	const [loading, setLoading] = useState(false);
	const [isInvalid, setInvalid] = useState(true);

	useEffect(() => {
		setInvalid(!(asset && account));
	}, [setInvalid, account, asset]);

	const setInitialStates = () => {
		setAsset('');
		setInvalid(!(asset && account));
	};

	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	const onChangeAsset = (e) => {
		setAsset(e.target.innerText);
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<Form className={classes.repay}>
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
				transactionParams={[asset]}
				setStateStale={setStateStale}
				stateStale={stateStale}
				setLoading={setLoading}
				isInvalid={isInvalid}
				setInitialStates={setInitialStates}
				buttonLabel={'Repay All Asset'}
				palletName={'minterestProtocol'}
				transactionName={'repayAll'}
			/>
		</Form>
	);
}

export default RepayAll;
