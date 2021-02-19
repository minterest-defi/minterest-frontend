import React from 'react';

import SendDepositUnderlying from '../../Forms/SendDepositUnderlying/SendDepositUnderlying';
import classes from './DepositOperations.module.css';

export default function DepositOperations(props) {
	const {
		account,
		keyring,
		depositUnderlying,
		isDepositUnderlyingResponseRunning,
	} = props;

	const handleSendDepoditUnderlying = (form) => {
		const { underlyingAssetId, underlyingAmount } = form;
		depositUnderlying(account, keyring, underlyingAssetId, underlyingAmount);
	};
	return (
		<div className={classes.deposit}>
			<SendDepositUnderlying
				onSubmit={handleSendDepoditUnderlying}
				isLoading={isDepositUnderlyingResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
