import React from 'react';

import SendBorrow from '../../Forms/SendBorrow/SendBorrow';
// @ts-ignore
import classes from './BorrowOperations.module.css';

export default function BorrowOperations(props) {
	const { keyring, account, borrow, isBorrowResponseRunning } = props;

	const handleSendBorrow = (form) => {
		const { underlyingAssetId, borrowAmount } = form;
		borrow(keyring, account, underlyingAssetId, borrowAmount);
	};
	return (
		<div className={classes.deposit}>
			<SendBorrow
				onSubmit={handleSendBorrow}
				// @ts-ignore
				isLoading={isBorrowResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
