import React from 'react';

import SendDepositInsurance from '../../Forms/SendDepositInsurance/SendDepositInsurance';
import classes from './DepositInsurance.module.css';

export default function DepositInsurance(props) {
	const {
		account,
		keyring,
		depositInsurance,
		isDepositInsuranceResponseRunning,
	} = props;

	const handleSendDepoditInsurance = (form) => {
		const { poolId, amount } = form;
		depositInsurance(account, keyring, poolId, amount);
	};
	return (
		<div className={classes.deposit}>
			<SendDepositInsurance
				onSubmit={handleSendDepoditInsurance}
				isLoading={isDepositInsuranceResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
