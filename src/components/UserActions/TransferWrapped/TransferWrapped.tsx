import React from 'react';

import SendTransferWrapped from '../../Forms/SendTransferWrapped/SendTransferWrapped';
// @ts-ignore
import classes from './TransferWrapped.module.css';

export default function TransferWrapped(props) {
	const {
		keyring,
		account,
		transferWrapped,
		isTransferWrappedResponseRunning,
	} = props;

	const handleSendTransferWrapped = (form) => {
		const { receiver, wrappedId, convertedAmount } = form;
		transferWrapped(keyring, account, receiver, wrappedId, convertedAmount);
	};
	return (
		<div className={classes.transfer}>
			<SendTransferWrapped
				onSubmit={handleSendTransferWrapped}
				// @ts-ignore
				isLoading={isTransferWrappedResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
