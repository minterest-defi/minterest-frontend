import React from 'react';

import SendRedeemWrapped from '../../Forms/SendRedeemWrapped/SendRedeemWrapped';
import classes from './RedeemWrapped.module.css';

export default function RedeemWrapped(props) {
	const {
		account,
		keyring,
		redeemWrapped,
		isRedeemWrappedResponseRunning,
	} = props;

	const handleSendRedeemWrapped = (form) => {
		const { wrappedId, wrappedAmount } = form;
		redeemWrapped(account, keyring, wrappedId, wrappedAmount);
	};
	return (
		<div className={classes.redeem}>
			<SendRedeemWrapped
				onSubmit={handleSendRedeemWrapped}
				isLoading={isRedeemWrappedResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
