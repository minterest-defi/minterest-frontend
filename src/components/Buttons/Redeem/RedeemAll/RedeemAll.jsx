import React, { useState, useEffect } from 'react';
import { useSubstrate } from '../../../../substrate-lib';
import { UNDERLYING_ASSETS_TYPES } from '../../../../util/constants';

import { Form, Dropdown, Button } from 'semantic-ui-react';
import Loading from '../../../../util/Loading';
import classes from './RedeemAll.module.css';

function RedeemAll({ account, onChange, userState }) {
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

	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
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
					onChange(!userState);
				}
			});
		setInitialStates();
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<div className={classes.redeem}>
			<Form>
				<Dropdown
					compact
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
			</Form>
		</div>
	);
}

export default RedeemAll;
