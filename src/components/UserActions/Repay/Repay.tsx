import React from 'react';

import SendRepay from '../../Forms/SendRepay/SendRepay';
// @ts-ignore
import classes from './Repay.module.css';
import { RepayProps, RepayFormValues } from '../UserActions.types';

export default function Repay(props: RepayProps) {
	const { keyring, account, repay, isRepayResponseRunning } = props;

	const handleSendRepay = (form: RepayFormValues) => {
		const { underlyingAssetId, repayAmount } = form;
		repay(keyring, account, underlyingAssetId, repayAmount);
	};
	return (
		<div className={classes.repay}>
			<SendRepay
				// @ts-ignore
				onSubmit={handleSendRepay}
				// @ts-ignore
				isLoading={isRepayResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
