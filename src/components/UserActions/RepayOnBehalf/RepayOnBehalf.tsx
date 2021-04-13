import React from 'react';

import SendRepayOnBehalf from '../../Forms/SendRepayOnBehalf/SendRepayOnBehalf';

import {
	RepayOnBehalfProps,
	RepayOnBehalfFormValues,
} from '../UserActions.types';

export default function RepayOnBehalf(props: RepayOnBehalfProps) {
	const {
		keyring,
		account,
		repayOnBehalf,
		isRepayOnBehalfResponseRunning,
		currenciesOptions,
	} = props;

	const handleSendRepayOnBehalf = (form: RepayOnBehalfFormValues) => {
		const { underlyingAssetId, borrower, repayAmount } = form;
		repayOnBehalf(keyring, account, underlyingAssetId, borrower, repayAmount);
	};
	return (
		<SendRepayOnBehalf
			// @ts-ignore
			onSubmit={handleSendRepayOnBehalf}
			// @ts-ignore
			isLoading={isRepayOnBehalfResponseRunning}
			isAccountReady={!!account}
			currenciesOptions={currenciesOptions}
		/>
	);
}
