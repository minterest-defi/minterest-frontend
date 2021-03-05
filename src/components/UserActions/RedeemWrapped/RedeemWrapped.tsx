import React from 'react';

import SendRedeemWrapped from '../../Forms/SendRedeemWrapped/SendRedeemWrapped';
// @ts-ignore
import classes from './RedeemWrapped.module.css';

export default function RedeemWrapped(props) {
	const {
		keyring,
		account,
		redeemWrapped,
		isRedeemWrappedResponseRunning,
	} = props;

	const handleSendRedeemWrapped = (form) => {
		const { wrappedId, wrappedAmount } = form;
		redeemWrapped(keyring, account, wrappedId, wrappedAmount);
	};
	return (
		<div className={classes.redeem}>
			<SendRedeemWrapped
				onSubmit={handleSendRedeemWrapped}
				// @ts-ignore
				isLoading={isRedeemWrappedResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
