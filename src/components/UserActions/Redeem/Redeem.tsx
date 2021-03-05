import React from 'react';

import SendRedeem from '../../Forms/SendRedeem/SendRedeem';
// @ts-ignore
import classes from './Redeem.module.css';

export default function Redeem(props) {
	const { keyring, account, redeem, isRedeemResponseRunning } = props;

	const handleSendRedeem = (form) => {
		const { underlyingAssetId } = form;
		redeem(keyring, account, underlyingAssetId);
	};
	return (
		<div className={classes.redeem}>
			<SendRedeem
				onSubmit={handleSendRedeem}
				// @ts-ignore
				isLoading={isRedeemResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
