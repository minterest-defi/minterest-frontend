import React from 'react';

import SendRedeemUnderlying from '../../Forms/SendRedeemUnderlying/SendRedeemUnderlying';

import {
	RedeemUnderlyingProps,
	RedeemUnderlyingFormValues,
} from '../UserActions.types';

export default function RedeemUnderlying(props: RedeemUnderlyingProps) {
	const {
		keyring,
		account,
		redeemUnderlying,
		isRedeemUnderlyingResponseRunning,
		currenciesOptions,
	} = props;

	const handleSendRedeemUnderlying = (form: RedeemUnderlyingFormValues) => {
		const { underlyingAssetId, underlyingAmount } = form;
		redeemUnderlying(keyring, account, underlyingAssetId, underlyingAmount);
	};
	return (
		<SendRedeemUnderlying
			// @ts-ignore
			onSubmit={handleSendRedeemUnderlying}
			// @ts-ignore
			isLoading={isRedeemUnderlyingResponseRunning}
			isAccountReady={!!account}
			currenciesOptions={currenciesOptions}
		/>
	);
}
