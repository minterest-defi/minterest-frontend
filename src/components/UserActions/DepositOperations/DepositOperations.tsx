import React from 'react';

import SendDepositUnderlying from '../../Forms/SendDepositUnderlying/SendDepositUnderlying';

import {
	DepositOperationsProps,
	DepositUnderlyingFormValues,
} from '../UserActions.types';

export default function DepositOperations(props: DepositOperationsProps) {
	const {
		keyring,
		account,
		depositUnderlying,
		isDepositUnderlyingResponseRunning,
	} = props;

	const handleSendDepositUnderlying = (form: DepositUnderlyingFormValues) => {
		const { underlyingAssetId, underlyingAmount } = form;
		depositUnderlying(keyring, account, underlyingAssetId, underlyingAmount);
	};
	return (
		<SendDepositUnderlying
			// @ts-ignore
			onSubmit={handleSendDepositUnderlying}
			// @ts-ignore
			isLoading={isDepositUnderlyingResponseRunning}
			isAccountReady={!!account}
		/>
	);
}
