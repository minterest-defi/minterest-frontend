import React from 'react';

import SendTransferWrapped from '../../Forms/SendTransferWrapped/SendTransferWrapped';

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
		<SendTransferWrapped
			// @ts-ignore
			onSubmit={handleSendTransferWrapped}
			// @ts-ignore
			isLoading={isTransferWrappedResponseRunning}
			isAccountReady={!!account}
		/>
	);
}
