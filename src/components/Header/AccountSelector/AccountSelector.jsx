import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Button, Dropdown } from 'semantic-ui-react';

import { useSubstrate } from '../../../substrate-lib';

function AccountSelector({ account, onChange }) {
	const { api, keyring } = useSubstrate();

	const keyringOptions = keyring.getPairs().map((acc) => ({
		key: acc.address,
		value: acc.address,
		text: acc.meta.name.toUpperCase(),
		icon: 'user',
	}));

	const handleChange = (address) => {
		onChange(address);
	};

	return (
		keyring.getPairs &&
		api.query && (
			<div>
				<CopyToClipboard text={account}>
					<Button
						basic
						circular
						size='large'
						icon='user'
						color={account ? 'green' : 'red'}
					/>
				</CopyToClipboard>
				<Dropdown
					search
					selection
					clearable
					placeholder='Select an account'
					options={keyringOptions}
					onChange={(_, dropdown) => {
						handleChange(dropdown.value);
					}}
					value={account}
				/>
			</div>
		)
	);
}

export default AccountSelector;
