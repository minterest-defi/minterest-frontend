import React from 'react';

import SendRepay from '../../Forms/SendRepay/SendRepay';

import { RepayProps, RepayFormValues } from '../UserActions.types';

export default function Repay(props: RepayProps) {
	const { keyring, account, repay, isRepayResponseRunning } = props;

	const handleSendRepay = (form: RepayFormValues) => {
		const { underlyingAssetId, repayAmount } = form;
		repay(keyring, account, underlyingAssetId, repayAmount);
	};
	return (
		<SendRepay
			// @ts-ignore
			onSubmit={handleSendRepay}
			// @ts-ignore
			isLoading={isRepayResponseRunning}
			isAccountReady={!!account}
		/>
	);
}
