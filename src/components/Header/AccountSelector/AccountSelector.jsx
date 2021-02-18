import React from 'react';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Dropdown } from 'semantic-ui-react';

// TODO refactoring
function AccountSelector(props) {
	const { api, keyring, account, onChange } = props;

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

const mapStateToProps = (state) => ({
	api: state.substrate.api,
	keyring: state.account.keyring,
});

export default connect(mapStateToProps, null)(AccountSelector);
