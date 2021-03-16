import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import { web3FromAddress } from '@polkadot/extension-dapp';
import {
	UNDERLYING_ASSETS_TYPES,
	POOL_OPERATIONS,
} from '../../../util/constants';
import Loading from '../../../util/Loading';
import { PoolOperationsSwitchProps } from '../AdminPanel.types';

function PoolOperationsSwitch(props: PoolOperationsSwitchProps) {
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

	const onChangeAsset = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAsset(e.target.innerText);
	};

	const onChangeOperation = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOperation(e.target.innerText);
	};

	// TODO refactoring
	const lock = async () => {
		setLoading(true);
		const currentUser = keyring.getPair(account);
		try {
			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await api.tx.controller
					.pauseSpecificOperation(asset, operation)
					.signAndSend(
						account,
						{ signer: injector.signer },
						transactionCallback
					);
			} else {
				await api.tx.controller
					.pauseSpecificOperation(asset, operation)
					.signAndSend(currentUser, transactionCallback);
			}
		} catch (err) {
			setLoading(false);
			alert(err.toString());
		}

		setInitialStates();
	};

	const unlock = async () => {
		setLoading(true);
		const currentUser = keyring.getPair(account);
		try {
			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await api.tx.controller
					.unpauseSpecificOperation(asset, operation)
					.signAndSend(
						account,
						{ signer: injector.signer },
						transactionCallback
					);
			} else {
				await api.tx.controller
					.unpauseSpecificOperation(asset, operation)
					.signAndSend(currentUser, transactionCallback);
			}
		} catch (err) {
			setLoading(false);
			alert(err.toString());
		}
		setInitialStates();
	};

	const transactionCallback = ({ events = [], status }: any) => {
		if (status.isFinalized) {
			setLoading(false);
			events.forEach(
				({
					event: {
						method,
						section,
						data: [error],
					},
				}: any) => {
					if (section === 'system' && method === 'ExtrinsicSuccess') {
						getPoolOperationStatuses();
						alert('Transaction completed successfully.');
						// @ts-ignore
					} else if (method === 'ExtrinsicFailed' && error.isModule) {
						// @ts-ignore
						const decoded = api.registry.findMetaError(error.asModule);
						const { documentation } = decoded;
						alert(`${documentation.join(' ')}`);
					}
				}
			);
		}
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
					// @ts-ignore
					onChange={onChangeAsset}
				/>
				<Dropdown
					compact
					placeholder='Operation'
					search
					selection
					options={operations}
					// @ts-ignore
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
