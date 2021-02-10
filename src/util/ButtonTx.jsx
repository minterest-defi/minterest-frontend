import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

// TODO refactoring
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
	api,
	keyring,
	updateData,
}) {
	const updateContentPool = () => {
		if (typeof updateData === 'function') {
			updateData();
		}
	};

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
								updateContentPool();
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

const mapStateToProps = (state) => ({
	api: state.substrate.api,
	keyring: state.account.keyring,
});

export default connect(mapStateToProps, null)(ButtonTx);
