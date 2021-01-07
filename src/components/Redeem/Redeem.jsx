import React, { useState } from 'react';
import { useSubstrate } from '../../substrate-lib';

import { Form, Dropdown, Button, Dimmer, Loader } from 'semantic-ui-react';

function Redeem({ account }) {
	const { api, keyring } = useSubstrate();
	const [asset, setAsset] = useState('');
	const [loading, setLoading] = useState(false);

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

	const onChangeAsset = (e) => {
		setAsset(e.target.innerText);
	};

	const sendRedeemAll = async () => {
		setLoading(true);
		const currentUser = keyring.getPair(account);
		await api.tx.minterestProtocol
			.redeem(asset)
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
			<Dropdown
				placeholder='Asset'
				search
				selection
				options={assets}
				onChange={onChangeAsset}
			/>
			<Button color={account ? 'green' : 'red'} onClick={sendRedeemAll}>
				Redeem All Asset
			</Button>
		</Form>
	);
}

export default Redeem;
