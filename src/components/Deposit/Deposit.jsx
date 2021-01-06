import React, { useState } from 'react';
import { useSubstrate } from '../../substrate-lib';

import { Form, Input, Dropdown, Button } from 'semantic-ui-react';

function Deposit({ account }) {
	const { api, keyring } = useSubstrate();
	const [amount, setAmount] = useState(0);
	const [asset, setAsset] = useState('');

	const currencies = [
		'MINT',
		'DOT',
		'KSM',
		'BTC',
		'ETH',
		'MDOT',
		'MKSM',
		'MBTC',
		'METH',
	];
	const assets = currencies.map((currency) => ({
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
		const currentUser = keyring.getPair(account);
		await api.tx.minterestProtocol
			.depositUnderlying(asset, amount.toString())
			.signAndSend(currentUser, ({ events = [], status }) => {
				console.log(`Current status is ${status.type}`);

				if (status.isFinalized) {
					events.forEach(({ event: { method, section } }) => {
						console.log(`Section: ${section}`);
						console.log(`Method: ${method}`);
						if (section === 'system' && method === 'ExtrinsicSuccess') {
							alert('Success');
						} else if (method === 'ExtrinsicFailed') {
							alert('Faild');
						}
					});
				}
			});
	};

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
