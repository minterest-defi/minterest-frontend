import React from 'react';

import SendBorrow from '../../Forms/SendRedeem/SendRedeem';
import classes from './Redeem.module.css';

export default function BorrowOperations(props) {
	const { account, keyring, redeem, isRedeemResponseRunning } = props;

	const handleSendRedeem = (form) => {
		const { underlyingAssetId } = form;
		redeem(account, keyring, underlyingAssetId);
	};
	return (
		<div className={classes.deposit}>
			<SendBorrow
				onSubmit={handleSendRedeem}
				isLoading={isRedeemResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
