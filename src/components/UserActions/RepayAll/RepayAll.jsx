import React from 'react';

import SendRepayAll from '../../Forms/SendRepayAll/SendRepayAll';
import classes from './RepayAll.module.css';

export default function RepayAll(props) {
	const { account, keyring, repayAll, isRepayAllResponseRunning } = props;

	const handleSendRepayAll = (form) => {
		const { underlyingAssetId } = form;
		repayAll(account, keyring, underlyingAssetId);
	};
	return (
		<div className={classes.repay}>
			<SendRepayAll
				onSubmit={handleSendRepayAll}
				isLoading={isRepayAllResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
