import React from 'react';

import SendRedeem from '../../Forms/SendRedeem/SendRedeem';
// @ts-ignore
import classes from './Redeem.module.css';
import { RedeemProps, RedeemFormValues } from '../UserActions.types';

export default function Redeem(props: RedeemProps) {
	const { keyring, account, redeem, isRedeemResponseRunning } = props;

	const handleSendRedeem = (form: RedeemFormValues) => {
		const { underlyingAssetId } = form;
		redeem(keyring, account, underlyingAssetId);
	};
	return (
		<div className={classes.redeem}>
			<SendRedeem
				// @ts-ignore
				onSubmit={handleSendRedeem}
				// @ts-ignore
				isLoading={isRedeemResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
