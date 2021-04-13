import React from 'react';

import SendRedeem from '../../Forms/SendRedeem/SendRedeem';

import { RedeemProps, RedeemFormValues } from '../UserActions.types';

export default function Redeem(props: RedeemProps) {
	const {
		keyring,
		account,
		redeem,
		isRedeemResponseRunning,
		currenciesOptions,
	} = props;

	const handleSendRedeem = (form: RedeemFormValues) => {
		const { underlyingAssetId } = form;
		redeem(keyring, account, underlyingAssetId);
	};
	return (
		<SendRedeem
			// @ts-ignore
			onSubmit={handleSendRedeem}
			// @ts-ignore
			isLoading={isRedeemResponseRunning}
			isAccountReady={!!account}
			currenciesOptions={currenciesOptions}
		/>
	);
}
