import React from 'react';

import SendBorrow from '../../Forms/SendBorrow/SendBorrow';
import classes from './BorrowOperations.module.css';

export default function BorrowOperations(props) {
	const { account, keyring, borrow, isBorrowResponseRunning } = props;

	const handleSendBorrow = (form) => {
		const { underlyingAssetId, borrowAmount } = form;
		borrow(account, keyring, underlyingAssetId, borrowAmount);
	};
	return (
		<div className={classes.deposit}>
			<SendBorrow
				onSubmit={handleSendBorrow}
				isLoading={isBorrowResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
