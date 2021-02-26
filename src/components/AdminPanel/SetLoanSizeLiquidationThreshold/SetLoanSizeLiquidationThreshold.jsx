import React from 'react';

import classes from './SetLoanSizeLiquidationThreshold.module.css';
import SetLoanSizeLiquidationThresholdForm from '../../Forms/SetLoanSizeLiquidationThreshold/SetLoanSizeLiquidationThreshold';

export default function SetLoanSizeLiquidationThreshold(props) {
	const {
		account,
		keyring,
		setLoanSizeLiquidationThreshold,

		isSetLoanSizeLiquidationThresholdResponseRunning,
	} = props;

	const handleSetLoanSizeLiquidationThreshold = (form) => {
		const { poolId, newMaxValue } = form;
		setLoanSizeLiquidationThreshold(account, keyring, poolId, newMaxValue);
	};

	return (
		<div className={classes.wrapper}>
			<SetLoanSizeLiquidationThresholdForm
				onSubmit={handleSetLoanSizeLiquidationThreshold}
				isLoading={isSetLoanSizeLiquidationThresholdResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
