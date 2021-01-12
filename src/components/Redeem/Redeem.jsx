import React, { useState, useEffect } from 'react';
import { useSubstrate } from '../../substrate-lib';
import { CURRENCIES } from '../../util/constants';

import { Form, Dropdown, Button, Dimmer, Loader } from 'semantic-ui-react';

function Redeem({ account }) {
	const { api, keyring } = useSubstrate();
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

	const assets = CURRENCIES.map((currency) => ({
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
				}
			});
		setInitialStates();
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
			<Button
				color={account ? 'green' : 'red'}
				onClick={sendRedeemAll}
				disabled={isInvalid}
			>
				Redeem All Asset
			</Button>
			{isInvalid && <p>Please select to continue</p>}
		</Form>
	);
}

export default Redeem;
