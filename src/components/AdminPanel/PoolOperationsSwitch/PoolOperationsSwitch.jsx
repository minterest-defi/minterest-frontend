import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import {
	UNDERLYING_ASSETS_TYPES,
	POOL_OPERATIONS,
} from '../../../util/constants';
import Loading from '../../../util/Loading';

// TODO refactoring
function PoolOperationsSwitch(props) {
	const { api, keyring, account, getPoolOperationStatuses } = props;
	const [asset, setAsset] = useState('');
	const [operation, setOperation] = useState('');
	const [loading, setLoading] = useState(false);
	const [isInvalid, setInvalid] = useState(true);

	useEffect(() => {
		setInvalid(!(asset && operation && account));
	}, [setInvalid, account, asset, operation]);

	const setInitialStates = () => {
		setAsset('');
		setOperation('');
		setInvalid(!(asset && operation && account));
	};

	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	const operations = POOL_OPERATIONS.map((action) => ({
		key: action,
		text: action,
		value: action,
	}));

	const onChangeAsset = (e) => {
		setAsset(e.target.innerText);
	};

	const onChangeOperation = (e) => {
		setOperation(e.target.innerText);
	};

	const lock = async () => {
		setLoading(true);
		const currentUser = keyring.getPair(account);
		await api.tx.controller
			.pauseSpecificOperation(asset, operation)
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
								getPoolOperationStatuses();
								alert('Transaction completed successfully.');
							} else if (method === 'ExtrinsicFailed' && error.isModule) {
								const decoded = api.registry.findMetaError(error.asModule);
								const { documentation } = decoded;
								alert(`${documentation.join(' ')}`);
							}
						}
					);
				}
			});
		setInitialStates();
	};

	const unlock = async () => {
		setLoading(true);
		const currentUser = keyring.getPair(account);
		await api.tx.controller
			.unpauseSpecificOperation(asset, operation)
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
								getPoolOperationStatuses();
								alert('Transaction completed successfully.');
							} else if (method === 'ExtrinsicFailed' && error.isModule) {
								const decoded = api.registry.findMetaError(error.asModule);
								const { documentation } = decoded;
								alert(`${documentation.join(' ')}`);
							}
						}
					);
				}
			});
		setInitialStates();
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<div>
			<Form>
				<Dropdown
					compact
					placeholder='Asset'
					search
					selection
					options={assets}
					onChange={onChangeAsset}
				/>
				<Dropdown
					compact
					placeholder='Operation'
					search
					selection
					options={operations}
					onChange={onChangeOperation}
				/>
				<Button
					color={account ? 'green' : 'red'}
					onClick={lock}
					disabled={isInvalid}
				>
					Lock
				</Button>
				<Button
					color={account ? 'green' : 'red'}
					onClick={unlock}
					disabled={isInvalid}
				>
					Unlock
				</Button>
			</Form>
		</div>
	);
}

export default PoolOperationsSwitch;
