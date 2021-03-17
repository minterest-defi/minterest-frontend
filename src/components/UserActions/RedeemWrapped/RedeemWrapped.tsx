import React from 'react';

import SendRedeemWrapped from '../../Forms/SendRedeemWrapped/SendRedeemWrapped';
// @ts-ignore
import classes from './RedeemWrapped.module.css';
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
	} = props;

	const handleSendRedeemWrapped = (form: RedeemWrappedFormValues) => {
		const { wrappedId, wrappedAmount } = form;
		redeemWrapped(keyring, account, wrappedId, wrappedAmount);
	};
	return (
		<div className={classes.redeem}>
			<SendRedeemWrapped
				// @ts-ignore
				onSubmit={handleSendRedeemWrapped}
				// @ts-ignore
				isLoading={isRedeemWrappedResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
