import React from 'react';

import SendRedeem from '../../Forms/SendRedeem/SendRedeem';
import classes from './Redeem.module.css';

export default function BorrowOperations(props) {
	const { account, keyring, redeem, isRedeemResponseRunning } = props;

	const handleSendRedeem = (form) => {
		const { underlyingAssetId } = form;
		redeem(account, keyring, underlyingAssetId);
	};
	return (
		<div className={classes.redeem}>
			<SendRedeem
				onSubmit={handleSendRedeem}
				isLoading={isRedeemResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
