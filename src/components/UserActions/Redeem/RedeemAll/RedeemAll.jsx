import React, { useState, useEffect } from 'react';
import { Form, Dropdown } from 'semantic-ui-react';
import { web3FromAddress } from '@polkadot/extension-dapp';
import { connect } from 'react-redux';

import { UNDERLYING_ASSETS_TYPES } from '../../../../util/constants';

import Loading from '../../../../util/Loading';
import ButtonTx from '../../../../util/ButtonTx';

import classes from './RedeemAll.module.css';

function RedeemAll({ account, updateData, api, keyring }) {
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

	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	const onChangeAsset = (e) => {
		setAsset(e.target.innerText);
	};

	if (loading) {
		return <Loading />;
	}

	const updateContentPool = () => {
		if (typeof updateData === 'function') {
			updateData();
		}
	};

	const palletName = 'minterestProtocol';
	const transactionName = 'redeem';

	const sendTransaction = async () => {
		setLoading(true);
		const currentUser = keyring.getPair(account);
		try {
			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await api.tx[palletName][transactionName](asset).signAndSend(
					account,
					{ signer: injector.signer },
					transactionCallback
				);
			} else {
				await api.tx[palletName][transactionName](asset).signAndSend(
					currentUser,
					transactionCallback
				);
			}
		} catch (err) {
			alert(err.toString());
			setLoading(false);
		}

		setInitialStates();
	};

	const transactionCallback = ({ events = [], status }) => {
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
						updateContentPool();
						alert('Transaction completed successfully.');
					} else if (method === 'ExtrinsicFailed' && error.isModule) {
						const decoded = api.registry.findMetaError(error.asModule);
						const { documentation } = decoded;
						alert(`${documentation.join(' ')}`);
					}
				}
			);
		}
	};

	return (
		<Form className={classes.redeem}>
			<Dropdown
				compact
				placeholder='Asset'
				search
				selection
				options={assets}
				onChange={onChangeAsset}
			/>
			<ButtonTx
				isInvalid={isInvalid}
				buttonLabel={'Redeem All Asset'}
				onClick={sendTransaction}
				color={account ? 'green' : 'red'}
			/>
		</Form>
	);
}

const mapStateToProps = (state) => ({
	api: state.substrate.api,
	keyring: state.account.keyring,
});

export default connect(mapStateToProps, null)(RedeemAll);
