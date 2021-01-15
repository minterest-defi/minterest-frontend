import React, { useState } from 'react';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import { useSubstrate } from '../../../substrate-lib';
import { UNDERLYING_ASSETS_TYPES } from '../../../util/constants';
import Loading from '../../../util/Loading';

function SwitchDeposit({ account }) {
	const [asset, setAsset] = useState('');
	const [loading, setLoading] = useState(false);
	const { api, keyring } = useSubstrate();
	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	const sudoPair = keyring.getPair(
		'5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
	);

	const onChangeAsset = (e) => {
		setAsset(e.target.innerText);
	};

	const lock = async () => {
		setLoading(true);
		await api.tx.sudo
			.sudo(api.tx.liquidityPools.lockPoolTransactions(asset))
			.signAndSend(sudoPair, ({ events = [], status }) => {
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

	const unlock = async () => {
		setLoading(true);
		await api.tx.sudo
			.sudo(api.tx.liquidityPools.unlockPoolTransactions(asset))
			.signAndSend(sudoPair, ({ events = [], status }) => {
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
		return <Loading />;
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

			<Button onClick={lock}>Lock</Button>
			<Button onClick={unlock}>Unlock</Button>
		</Form>
	);
}

export default SwitchDeposit;
