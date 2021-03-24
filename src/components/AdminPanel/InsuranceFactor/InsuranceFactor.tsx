import React from 'react';

// @ts-ignore
import classes from './InsuranceFactor.module.css';
import SetInsuranceFactor from '../../Forms/SetInsuranceFactor/SetInsuranceFactor';
import {
	InsuranceFactorProps,
	InsuranceFactorFormValues,
} from '../AdminPanel.types';

export default function InsuranceFactor(props: InsuranceFactorProps) {
	const {
		account,
		keyring,

		setInsuranceFactor,
		isSetInsuranceFactorResponseRunning,
	} = props;

	const handleSetInsuranceFactor = (form: InsuranceFactorFormValues) => {
		const { poolId, newAmount } = form;
		if (account) setInsuranceFactor(account, keyring, poolId, newAmount);
	};

	return (
		<div className={classes.wrapper}>
			<SetInsuranceFactor
				// @ts-ignore
				onSubmit={handleSetInsuranceFactor}
				// @ts-ignore
				isLoading={isSetInsuranceFactorResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
