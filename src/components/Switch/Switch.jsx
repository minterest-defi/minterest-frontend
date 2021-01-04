import React, { useState } from 'react';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import { useSubstrate } from '../../substrate-lib';

function Switch() {
	const [asset, setAsset] = useState('');
	const { api, keyring } = useSubstrate();
	const currencies = ['MINT', 'DOT', 'KSM', 'BTC', 'ETH'];
	const assets = currencies.map((currency) => ({
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

	const lock = () => {
		api.tx.sudo
			.sudo(api.tx.liquidityPools.lockPoolTransactions(asset))
			.signAndSend(sudoPair);
	};

	const unlock = () => {
		api.tx.sudo
			.sudo(api.tx.liquidityPools.unlockPoolTransactions(asset))
			.signAndSend(sudoPair);
	};

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

export default Switch;
