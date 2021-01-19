import React, { useState, useEffect } from 'react';
import { useSubstrate } from '../../../../substrate-lib';
import { UNDERLYING_ASSETS_TYPES } from '../../../../util/constants';

import { Form, Input, Dropdown, Button } from 'semantic-ui-react';
import Loading from '../../../../util/Loading';
import classes from './RedeemUnderlyingAsset.module.css';

function RedeemUnderlyingAsset({ account, onChange, userState }) {
	const { api, keyring } = useSubstrate();
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
		setAmount(e.target.value * 10 ** 18);
	};

	const onChangeAsset = (e) => {
		setAsset(e.target.innerText);
	};

	const redeemUnderlyingAsset = async () => {
		setLoading(true);
		const currentUser = keyring.getPair(account);
		await api.tx.minterestProtocol
			.redeemUnderlying(asset, amount.toString())
			.signAndSend(currentUser, ({ events = [], status }) => {
				if (status.isFinalized) {
					setLoading(false);
					events.forEach(
						({
							event: {
								method,
								section,
								data: [error],
							},
						}) => {
							if (section === 'system' && method === 'ExtrinsicSuccess') {
								alert('Transaction completed successfully.');
							} else if (method === 'ExtrinsicFailed' && error.isModule) {
								const decoded = api.registry.findMetaError(error.asModule);
								const { documentation } = decoded;
								alert(`${documentation.join(' ')}`);
							}
						}
					);
					onChange(!userState);
				}
			});
		setInitialStates();
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<Form className={classes.redeem}>
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
			<Button
				color={account ? 'green' : 'red'}
				onClick={redeemUnderlyingAsset}
				disabled={isInvalid}
			>
				Redeem Underlying Asset
			</Button>
		</Form>
	);
}

export default RedeemUnderlyingAsset;
