import React, { useState, useEffect } from 'react';
import { Form, Input, Dropdown } from 'semantic-ui-react';
import { web3FromAddress } from '@polkadot/extension-dapp';
import { connect } from 'react-redux';

import { UNDERLYING_ASSETS_TYPES } from '../../../../util/constants';

import Loading from '../../../../util/Loading';
import ButtonTx from '../../../../util/ButtonTx';

function RepayOnBehalf({ account, updateData, api, keyring }) {
	const [publickKey, setPublickKey] = useState('');
	const [amount, setAmount] = useState(0);
	const [asset, setAsset] = useState('');
	const [loading, setLoading] = useState(false);
	const [isInvalid, setInvalid] = useState(true);

	useEffect(() => {
		setInvalid(!(asset && amount && publickKey && account));
	}, [setInvalid, account, amount, asset, publickKey]);

	const setInitialStates = () => {
		setPublickKey('');
		setAmount(0);
		setAsset('');
		setInvalid(!(asset && amount && publickKey && account));
	};

	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	const onChangeKey = (e) => {
		setPublickKey(e.target.value);
	};

	const onChangeAmount = (e) => {
		setAmount(BigInt(e.target.value) * 10n ** 18n);
	};

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
	const transactionName = 'repayOnBehalf';

	const sendTransaction = async () => {
		setLoading(true);
		const currentUser = keyring.getPair(account);
		try {
			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await api.tx[palletName][transactionName](
					asset,
					publickKey,
					amount
				).signAndSend(
					account,
					{ signer: injector.signer },
					transactionCallback
				);
			} else {
				await api.tx[palletName][transactionName](
					asset,
					publickKey,
					amount
				).signAndSend(currentUser, transactionCallback);
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
		<Form>
			<Input
				type='text'
				placeholder='Enter the users publick key'
				onChange={onChangeKey}
			/>
			<Input
				type='text'
				placeholder='Enter the amount'
				onChange={onChangeAmount}
			/>
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
				buttonLabel={'Repay On Behalf'}
				updateData={updateData}
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

export default connect(mapStateToProps, null)(RepayOnBehalf);