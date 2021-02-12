import React, { useState, useEffect } from 'react';
import { UNDERLYING_ASSETS_TYPES } from '../../../../util/constants';

import { Form, Dropdown } from 'semantic-ui-react';
import Loading from '../../../../util/Loading';
import classes from './RedeemAll.module.css';
import ButtonTx from '../../../../util/ButtonTx';

function RedeemAll({ account, setStateStale, stateStale, updateData }) {
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
		<Form className={classes.redeem}>
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
				buttonLabel={'Redeem All Asset'}
				palletName={'minterestProtocol'}
				transactionName={'redeem'}
				updateData={updateData}
			/>
		</Form>
	);
}

export default RedeemAll;
