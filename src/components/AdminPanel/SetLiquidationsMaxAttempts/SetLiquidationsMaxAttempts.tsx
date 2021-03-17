import React from 'react';

// @ts-ignore
import classes from './SetLiquidationsMaxAttempts.module.css';
import SetLiquidationsMaxAttemptsForm from '../../Forms/SetLiquidationsMaxAttempts/SetLiquidationsMaxAttempts';
import {
	LiquidationsMaxAttemptsProps,
	LiquidationsMaxAttemptsFormValues,
} from '../AdminPanel.types';

export default function SetLiquidationsMaxAttempts(
	props: LiquidationsMaxAttemptsProps
) {
	const {
		account,
		keyring,
		setLiquidationMaxAttempts,

		isSetLiquidationsMaxAttemptsResponseRunning,
	} = props;

	const handleSetLiquidationsMaxAttempts = (
		form: LiquidationsMaxAttemptsFormValues
	) => {
		const { poolId, newMaxValue } = form;
		if (account)
			setLiquidationMaxAttempts(account, keyring, poolId, newMaxValue);
	};

	return (
		<div className={classes.wrapper}>
			<SetLiquidationsMaxAttemptsForm
				// @ts-ignore
				onSubmit={handleSetLiquidationsMaxAttempts}
				// @ts-ignore
				isLoading={isSetLiquidationsMaxAttemptsResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
