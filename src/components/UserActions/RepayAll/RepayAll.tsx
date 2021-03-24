import React from 'react';

import SendRepayAll from '../../Forms/SendRepayAll/SendRepayAll';

import { RepayAllProps, RepayAllFormValues } from '../UserActions.types';

export default function RepayAll(props: RepayAllProps) {
	const { keyring, account, repayAll, isRepayAllResponseRunning } = props;

	const handleSendRepayAll = (form: RepayAllFormValues) => {
		const { underlyingAssetId } = form;
		repayAll(keyring, account, underlyingAssetId);
	};
	return (
		<SendRepayAll
			// @ts-ignore
			onSubmit={handleSendRepayAll}
			// @ts-ignore
			isLoading={isRepayAllResponseRunning}
			isAccountReady={!!account}
		/>
	);
}
