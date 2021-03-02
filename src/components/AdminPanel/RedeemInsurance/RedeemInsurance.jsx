import React from 'react';

import SendRedeemInsurance from '../../Forms/SendRedeemInsurance/SendRedeemInsurance';
import classes from './RedeemInsurance.module.css';

export default function RedeemInsurance(props) {
	const {
		account,
		keyring,
		redeemInsurance,
		isRedeemInsuranceResponseRunning,
	} = props;

	const handleSendRedeemInsurance = (form) => {
		const { poolId, amount } = form;
		redeemInsurance(account, keyring, poolId, amount);
	};
	return (
		<div className={classes.deposit}>
			<SendRedeemInsurance
				onSubmit={handleSendRedeemInsurance}
				isLoading={isRedeemInsuranceResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
