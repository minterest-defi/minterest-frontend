import React, { useState, useEffect } from 'react';
import { Button, Form, Dimmer, Loader } from 'semantic-ui-react';
import { useSubstrate } from '../../../substrate-lib';

function ButtonEnable({ account, asset, flag }) {
	const { api, keyring } = useSubstrate();
	const [loading, setLoading] = useState(false);
	const [isInvalid, setInvalid] = useState(true);

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

	const button = async () => {
		setLoading(true);
		const currentUser = keyring.getPair(account);
		const methodToCall = flag ? 'disableCollateral' : 'enableAsCollateral';

		await api.tx.minterestProtocol[methodToCall](asset).signAndSend(
			currentUser,
			errorHandler
		);

		setInitialStates();
	};

	if (loading) {
		return (
			<Dimmer active>
				<Loader size='small'>Loading...</Loader>
			</Dimmer>
		);
	}

	return (
		<Form>
			<Button onClick={button} disabled={isInvalid}>
				{flag ? 'Disable' : 'Enable'}
			</Button>
		</Form>
	);
}

export default ButtonEnable;
