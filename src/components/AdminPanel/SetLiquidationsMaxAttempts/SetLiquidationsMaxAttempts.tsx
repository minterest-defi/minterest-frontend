import React from 'react';

// @ts-ignore
import classes from './SetLiquidationsMaxAttempts.module.css';
import SetLiquidationsMaxAttemptsForm from '../../Forms/SetLiquidationsMaxAttempts/SetLiquidationsMaxAttempts';

export default function SetLiquidationsMaxAttempts(props) {
	const {
		account,
		keyring,
		setLiquidationMaxAttempts,

		isSetLiquidationsMaxAttemptsResponseRunning,
	} = props;

	const handleSetLiquidationsMaxAttempts = (form) => {
		const { poolId, newMaxValue } = form;
		setLiquidationMaxAttempts(account, keyring, poolId, newMaxValue);
	};

	return (
		<div className={classes.wrapper}>
			<SetLiquidationsMaxAttemptsForm
				onSubmit={handleSetLiquidationsMaxAttempts}
				// @ts-ignore
				isLoading={isSetLiquidationsMaxAttemptsResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
