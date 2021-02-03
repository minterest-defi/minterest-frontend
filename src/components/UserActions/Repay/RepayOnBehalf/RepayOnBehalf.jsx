import React, { useState, useEffect } from 'react';
import { UNDERLYING_ASSETS_TYPES } from '../../../../util/constants';

import { Form, Input, Dropdown } from 'semantic-ui-react';
import Loading from '../../../../util/Loading';
import ButtonTx from '../../../../util/ButtonTx';

function RepayOnBehalf({ account, setStateStale, stateStale }) {
	const [publickKey, setPublickKey] = useState('');
	const [amount, setAmount] = useState(0);
	const [asset, setAsset] = useState('');
	const [loading, setLoading] = useState(false);
	const [isInvalid, setInvalid] = useState(true);

	useEffect(() => {
		setInvalid(!(asset && amount && publickKey && account));
	}, [setInvalid, account, amount, asset, publickKey]);

	const setInitialStates = () => {
		setPublickKey('');
		setAmount(0);
		setAsset('');
		setInvalid(!(asset && amount && publickKey && account));
	};

	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	const onChangeKey = (e) => {
		setPublickKey(e.target.value);
	};

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
		<Form>
			<Input
				type='text'
				placeholder='Enter the users publick key'
				onChange={onChangeKey}
			/>
			<Input
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
				transactionParams={[asset, publickKey, amount]}
				setStateStale={setStateStale}
				stateStale={stateStale}
				setLoading={setLoading}
				isInvalid={isInvalid}
				setInitialStates={setInitialStates}
				buttonLabel={'Repay On Behalf'}
				palletName={'minterestProtocol'}
				transactionName={'repayOnBehalf'}
			/>
		</Form>
	);
}

export default RepayOnBehalf;
