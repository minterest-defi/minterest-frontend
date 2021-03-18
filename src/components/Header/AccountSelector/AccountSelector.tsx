import React from 'react';
import { KeyringPair } from '@polkadot/keyring/types';
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from 'react-redux';
import { Button, Dropdown } from 'semantic-ui-react';
import { State } from '../../../util/types';
import Loading from '../../../util/Loading';
// TODO refactoring any
interface Props {
	api?: any;
	keyring?: any;
	account: any;
	onChange: any;
}

function AccountSelector(props: Props) {
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

	const handleChangeAccount = (_, dropdown) => {
		handleChange(dropdown.value);
	};

	if (!keyring.getPairs || !api.query) return <Loading />;

	return (
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
				onChange={handleChangeAccount}
				value={account}
			/>
		</div>
	);
}

const mapStateToProps = (state: State) => ({
	api: state.substrate.api,
	keyring: state.account.keyring,
});

export default connect(mapStateToProps, null)(AccountSelector);
