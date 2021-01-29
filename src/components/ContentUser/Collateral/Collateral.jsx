import React, { useState, useEffect } from 'react';
import { useSubstrate } from '../../../substrate-lib';
import { Button } from 'semantic-ui-react';
import Loading from '../../../util/Loading';

import classes from './Collateral.module.css';

function Collateral({ account, asset }) {
	const { api, keyring } = useSubstrate();
	const [loading, setLoading] = useState(false);
	const [isInvalid, setInvalid] = useState(true);
	const [currencyFlag, setFlag] = useState('-');

	const currency = asset;

	const errorHandler = ({ events = [], status }) => {
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
		}
	};

	useEffect(() => {
		setInvalid(!account);
	}, [setInvalid, account]);

	const setInitialStates = () => {
		setInvalid(!account);
	};

	const fetchData = async () => {
		if (account) {
			const data = await api.query.liquidityPools.poolUserDates(
				currency,
				account
			);
			const flag = data.collateral.toHuman();
			setFlag(flag);
		} else if (currencyFlag !== '-') {
			setFlag('-');
		}
	};
	fetchData();

	const button = async () => {
		setLoading(true);
		const currentUser = keyring.getPair(account);
		const methodToCall = currencyFlag
			? 'disableCollateral'
			: 'enableAsCollateral';

		await api.tx.minterestProtocol[methodToCall](currency).signAndSend(
			currentUser,
			errorHandler
		);

		setInitialStates();
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<div>
			<div className={classes.item}>{currencyFlag.toString()}</div>
			<div className={classes.item}>
				<Button onClick={button} disabled={isInvalid}>
					{currencyFlag ? 'Disable' : 'Enable'}
				</Button>
			</div>
		</div>
	);
}

export default Collateral;
