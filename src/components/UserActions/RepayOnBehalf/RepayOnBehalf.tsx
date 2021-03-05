import React from 'react';

import SendRepayOnBehalf from '../../Forms/SendRepayOnBehalf/SendRepayOnBehalf';
// @ts-ignore
import classes from './RepayOnBehalf.module.css';

export default function RepayOnBehalf(props) {
	const {
		keyring,
		account,
		repayOnBehalf,
		isRepayOnBehalfResponseRunning,
	} = props;

	const handleSendRepayOnBehalf = (form) => {
		const { underlyingAssetId, borrower, repayAmount } = form;
		repayOnBehalf(keyring, account, underlyingAssetId, borrower, repayAmount);
	};
	return (
		<div className={classes.repay}>
			<SendRepayOnBehalf
				onSubmit={handleSendRepayOnBehalf}
				// @ts-ignore
				isLoading={isRepayOnBehalfResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
