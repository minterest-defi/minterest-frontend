import React from 'react';
import { KeyringPair } from '@polkadot/keyring/types';
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Dropdown } from 'semantic-ui-react';
// TODO refactoring any
interface Props {
	api: any;
	keyring: any;
	account: string | null;
	onChange: (account: any) => void;
}
// TODO refactoring
export default function AccountSelector(props: Props) {
	const { api, keyring, account, onChange } = props;

	const keyringOptions = keyring.getPairs().map((acc: KeyringPair) => ({
		key: acc.address,
		value: acc.address,
		// @ts-ignore
		text: acc.meta.name.toUpperCase(),
		icon: 'user',
	}));

	const handleChange = (address: any) => {
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
					// @ts-ignore
					value={account}
				/>
			</div>
		)
	);
}
