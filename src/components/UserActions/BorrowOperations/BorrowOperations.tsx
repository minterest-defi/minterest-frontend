import React from 'react';
import SendBorrow from '../../Forms/SendBorrow/SendBorrow';

import {
	BorrowOperationsProps,
	SendBorrowFormValues,
} from '../UserActions.types';

export default function BorrowOperations(props: BorrowOperationsProps) {
	const {
		keyring,
		account,
		borrow,
		isBorrowResponseRunning,
		currenciesOptions,
	} = props;

	const handleSendBorrow = (form: SendBorrowFormValues) => {
		const { underlyingAssetId, borrowAmount } = form;
		borrow(keyring, account, underlyingAssetId, borrowAmount);
	};
	return (
		<SendBorrow
			// @ts-ignore
			onSubmit={handleSendBorrow}
			// @ts-ignore
			isLoading={isBorrowResponseRunning}
			isAccountReady={!!account}
			currenciesOptions={currenciesOptions}
		/>
	);
}
