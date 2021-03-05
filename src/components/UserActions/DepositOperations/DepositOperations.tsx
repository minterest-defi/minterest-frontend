import React from 'react';

import SendDepositUnderlying from '../../Forms/SendDepositUnderlying/SendDepositUnderlying';
// @ts-ignore
import classes from './DepositOperations.module.css';

export default function DepositOperations(props) {
	const {
		keyring,
		account,
		depositUnderlying,
		isDepositUnderlyingResponseRunning,
	} = props;

	const handleSendDepoditUnderlying = (form) => {
		const { underlyingAssetId, underlyingAmount } = form;
		depositUnderlying(keyring, account, underlyingAssetId, underlyingAmount);
	};
	return (
		<div className={classes.deposit}>
			<SendDepositUnderlying
				onSubmit={handleSendDepoditUnderlying}
				// @ts-ignore
				isLoading={isDepositUnderlyingResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
