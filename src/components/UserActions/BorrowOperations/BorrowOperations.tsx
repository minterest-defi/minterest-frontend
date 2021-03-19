import React from 'react';
import SendBorrow from '../../Forms/SendBorrow/SendBorrow';
// @ts-ignore
import classes from './BorrowOperations.module.css';
import {
	BorrowOperationsProps,
	SendBorrowFormValues,
} from '../UserActions.types';

export default function BorrowOperations(props: BorrowOperationsProps) {
	const { keyring, account, borrow, isBorrowResponseRunning } = props;

	const handleSendBorrow = (form: SendBorrowFormValues) => {
		const { underlyingAssetId, borrowAmount } = form;
		borrow(keyring, account, underlyingAssetId, borrowAmount);
	};
	return (
		<div className={classes.deposit}>
			<SendBorrow
				// @ts-ignore
				onSubmit={handleSendBorrow}
				// @ts-ignore
				isLoading={isBorrowResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
