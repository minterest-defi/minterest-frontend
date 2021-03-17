import React from 'react';

import SendTransferWrapped from '../../Forms/SendTransferWrapped/SendTransferWrapped';
// @ts-ignore
import classes from './TransferWrapped.module.css';
import {
	TransferWrappedProps,
	TransferWrappedFormValues,
} from '../UserActions.types';

export default function TransferWrapped(props: TransferWrappedProps) {
	const {
		keyring,
		account,
		transferWrapped,
		isTransferWrappedResponseRunning,
	} = props;

	const handleSendTransferWrapped = (form: TransferWrappedFormValues) => {
		const { receiver, wrappedId, convertedAmount } = form;
		transferWrapped(keyring, account, receiver, wrappedId, convertedAmount);
	};
	return (
		<div className={classes.transfer}>
			<SendTransferWrapped
				// @ts-ignore
				onSubmit={handleSendTransferWrapped}
				// @ts-ignore
				isLoading={isTransferWrappedResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
