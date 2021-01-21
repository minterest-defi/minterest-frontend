import React from 'react';
import { useSubstrate } from '../substrate-lib';

import { Button } from 'semantic-ui-react';

function ButtonTx({
	account,
	transactionParams,
	setStateStale,
	stateStale,
	setLoading,
	isInvalid,
	setInitialStates,
	buttonLabel,
	palletName,
	transactionName,
}) {
	const { api, keyring } = useSubstrate();

	const sendTransaction = async () => {
		setLoading(true);
		const currentUser = keyring.getPair(account);
		await api.tx[palletName][transactionName](...transactionParams).signAndSend(
			currentUser,
			({ events = [], status }) => {
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
					setStateStale(!stateStale);
				}
			}
		);
		setInitialStates();
	};

	return (
		<Button
			color={account ? 'green' : 'red'}
			onClick={sendTransaction}
			disabled={isInvalid}
		>
			{buttonLabel}
		</Button>
	);
}

export default ButtonTx;
