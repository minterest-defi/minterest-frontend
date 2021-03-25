import React from 'react';
// @ts-ignore
import classes from './CollateralBlock.module.css';
import {
	CollateralBlockProps,
	CollateralFactorFormValues,
	ThresholdFormValues,
} from '../../containers/AdminPanel/AdminPanel.types';
import SetCollateralFactor from '../Forms/SetCollateralFactor/SetCollateralFactor';
import SetThreshold from '../Forms/SetThreshold/SetThreshold';

export default function CollateralBlock(props: CollateralBlockProps) {
	const {
		account,
		keyring,

		setCollateralFactor,
		setThreshold,

		isSetThresholdResponseRunning,
		isSetCollateralFactorResponseRunning,
	} = props;

	const handleSetCollateralFactor = (form: CollateralFactorFormValues) => {
		const { poolId, newAmount } = form;
		if (account) setCollateralFactor(account, keyring, poolId, newAmount);
	};

	const handleSetThreshold = (form: ThresholdFormValues) => {
		const { poolId, newThreshold } = form;
		if (account) setThreshold(account, keyring, poolId, newThreshold);
	};

	return (
		<div className={classes.wrapper}>
			<SetCollateralFactor
				// @ts-ignore
				onSubmit={handleSetCollateralFactor}
				// @ts-ignore
				isLoading={isSetCollateralFactorResponseRunning}
				isAccountReady={!!account}
			/>
			<SetThreshold
				// @ts-ignore
				onSubmit={handleSetThreshold}
				// @ts-ignore
				isLoading={isSetThresholdResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
