import React, { useState } from 'react';
import { useSubstrate } from '../../substrate-lib';
import { CURRENCIES } from '../../util/constants';

import {
	Form,
	Input,
	Dropdown,
	Button,
	Dimmer,
	Loader,
} from 'semantic-ui-react';

function Deposit({ account }) {
	const { api, keyring } = useSubstrate();
	const [amount, setAmount] = useState(0);
	const [asset, setAsset] = useState('');
	const [loading, setLoading] = useState(false);

	const assets = CURRENCIES.map((currency) => ({
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

	const sendDeposit = async () => {
		setLoading(true);
		const currentUser = keyring.getPair(account);
		await api.tx.minterestProtocol
			.depositUnderlying(asset, amount.toString())
			.signAndSend(currentUser, ({ events = [], status }) => {
				if (status.isFinalized) {
					setLoading(false);
					events.forEach(({ event: { method, section } }) => {
						if (section === 'system' && method === 'ExtrinsicSuccess') {
							alert('Transaction completed successfully.');
						} else if (method === 'ExtrinsicFailed') {
							alert('An error has occurred.');
						}
					});
				}
			});
	};

	if (loading) {
		return (
			<Dimmer active>
				<Loader size='small'>Loading...</Loader>
			</Dimmer>
		);
	}

	return (
		<Form>
			<Input
				type='text'
				placeholder='Enter the amount'
				onChange={onChangeAmount}
			/>
			<Dropdown
				placeholder='Asset'
				search
				selection
				options={assets}
				onChange={onChangeAsset}
			/>
			<Button color={account ? 'green' : 'red'} onClick={sendDeposit}>
				Deposit
			</Button>
		</Form>
	);
}

export default Deposit;
