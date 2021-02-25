import React from 'react';

import SendRepay from '../../Forms/SendRepay/SendRepay';
import classes from './Repay.module.css';

export default function Repay(props) {
	const { keyring, account, repay, isRepayResponseRunning } = props;

	const handleSendRepay = (form) => {
		const { underlyingAssetId, repayAmount } = form;
		repay(keyring, account, underlyingAssetId, repayAmount);
	};
	return (
		<div className={classes.repay}>
			<SendRepay
				onSubmit={handleSendRepay}
				isLoading={isRepayResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
