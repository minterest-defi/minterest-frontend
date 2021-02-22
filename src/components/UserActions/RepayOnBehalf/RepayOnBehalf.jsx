import React from 'react';

import SendRepayOnBehalf from '../../Forms/SendRepayOnBehalf/SendRepayOnBehalf';
import classes from './RepayOnBehalf.module.css';

export default function RepayOnBehalf(props) {
	const {
		account,
		keyring,
		repayOnBehalf,
		isRepayOnBehalfResponseRunning,
	} = props;

	const handleSendRepayOnBehalf = (form) => {
		const { underlyingAssetId, borrower, repayAmount } = form;
		repayOnBehalf(account, keyring, underlyingAssetId, borrower, repayAmount);
	};
	return (
		<div className={classes.repay}>
			<SendRepayOnBehalf
				onSubmit={handleSendRepayOnBehalf}
				isLoading={isRepayOnBehalfResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
