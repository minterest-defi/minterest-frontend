import React from 'react';

import SendRedeemUnderlying from '../../Forms/SendRedeemUnderlying/SendRedeemUnderlying';
// @ts-ignore
import classes from './RedeemUnderlying.module.css';
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
	} = props;

	const handleSendRedeemUnderlying = (form: RedeemUnderlyingFormValues) => {
		const { underlyingAssetId, underlyingAmount } = form;
		redeemUnderlying(keyring, account, underlyingAssetId, underlyingAmount);
	};
	return (
		<div className={classes.redeem}>
			<SendRedeemUnderlying
				// @ts-ignore
				onSubmit={handleSendRedeemUnderlying}
				// @ts-ignore
				isLoading={isRedeemUnderlyingResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
