import { ApiBase } from '@polkadot/api/base';
import React, { useState } from 'react';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import { useSubstrate } from '../../substrate-lib';

function Switch() {
    const [asset, setAsset] = useState('');
    const { api } = useSubstrate();
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
    
    const lock = async () => {
        await api
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

			<Button>Lock</Button>
			<Button>Unlock</Button>
		</Form>
	);
}

export default Switch;
