import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { web3FromAddress } from '@polkadot/extension-dapp';

import Loading from '../../../util/Loading';
import classes from './Collateral.module.css';

function Collateral(props) {
	const { api, keyring, account, asset } = props;
	const [loading, setLoading] = useState(false);
	const [isInvalid, setInvalid] = useState(true);
	const [currencyFlag, setFlag] = useState('-');

	const currency = asset;

	useEffect(() => {
		setInvalid(!account);
	}, [setInvalid, account]);

	useEffect(() => {
		fetchData().catch(console.log);
	}, [account]);

	// TODO refactoring
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
						fetchData();
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

	const button = async () => {
		setLoading(true);
		const currentUser = keyring.getPair(account);
		const methodToCall = currencyFlag
			? 'disableCollateral'
			: 'enableAsCollateral';

		try {
			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await api.tx.minterestProtocol[methodToCall](currency).signAndSend(
					account,
					{ signer: injector.signer },
					transactionCallback
				);
			} else {
				await api.tx.minterestProtocol[methodToCall](currency).signAndSend(
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

const mapStateToProps = (state) => ({
	api: state.substrate.api,
	keyring: state.account.keyring,
});

export default connect(mapStateToProps, null)(Collateral);
