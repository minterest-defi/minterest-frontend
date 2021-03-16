import React from 'react';

// @ts-ignore
import classes from './SetLoanSizeLiquidationThreshold.module.css';
import SetLoanSizeLiquidationThresholdForm from '../../Forms/SetLoanSizeLiquidationThreshold/SetLoanSizeLiquidationThreshold';
import {
	LoanSizeLiquidationThresholdProps,
	LoanSizeLiquidationThresholdFormValues,
} from '../AdminPanel.types';

export default function SetLoanSizeLiquidationThreshold(
	props: LoanSizeLiquidationThresholdProps
) {
	const {
		account,
		keyring,
		setLoanSizeLiquidationThreshold,

		isSetLoanSizeLiquidationThresholdResponseRunning,
	} = props;

	const handleSetLoanSizeLiquidationThreshold = (
		form: LoanSizeLiquidationThresholdFormValues
	) => {
		const { poolId, newMinSum } = form;

		setLoanSizeLiquidationThreshold(account, keyring, poolId, newMinSum);
	};

	return (
		<div className={classes.wrapper}>
			<SetLoanSizeLiquidationThresholdForm
				// @ts-ignore
				onSubmit={handleSetLoanSizeLiquidationThreshold}
				// @ts-ignore
				isLoading={isSetLoanSizeLiquidationThresholdResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
