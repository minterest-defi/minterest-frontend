import React from 'react';

import SendRedeemWrapped from '../../Forms/SendRedeemWrapped/SendRedeemWrapped';

import {
	RedeemWrappedProps,
	RedeemWrappedFormValues,
} from '../UserActions.types';

export default function RedeemWrapped(props: RedeemWrappedProps) {
	const {
		keyring,
		account,
		redeemWrapped,
		isRedeemWrappedResponseRunning,
		wrappedCurrenciesOptions,
	} = props;

	const handleSendRedeemWrapped = (form: RedeemWrappedFormValues) => {
		const { wrappedId, wrappedAmount } = form;
		redeemWrapped(keyring, account, wrappedId, wrappedAmount);
	};
	return (
		<SendRedeemWrapped
			// @ts-ignore
			onSubmit={handleSendRedeemWrapped}
			// @ts-ignore
			isLoading={isRedeemWrappedResponseRunning}
			isAccountReady={!!account}
			wrappedCurrenciesOptions={wrappedCurrenciesOptions}
		/>
	);
}
