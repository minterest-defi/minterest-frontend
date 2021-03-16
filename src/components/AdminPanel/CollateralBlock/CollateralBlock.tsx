import React from 'react';
// @ts-ignore
import classes from './CollateralBlock.module.css';
import {
	CollateralBlockProps,
	CollateralFactorFormValues,
	CollateralThresholdFormValues,
} from '../AdminPanel.types';
import SetCollateralFactor from '../../Forms/SetCollateralFactor/SetCollateralFactor';
import SetCollateralThreshold from '../../Forms/SetCollateralThreshold/SetCollateralThreshold';

export default function CollateralBlock(props: CollateralBlockProps) {
	const {
		account,
		keyring,

		setCollateralFactor,
		setCollateralThreshold,

		isSetCollateralThresholdResponseRunning,
		isSetCollateralFactorResponseRunning,
	} = props;

	const handleSetCollateralFactor = (form: CollateralFactorFormValues) => {
		const { poolId, newAmountN, newAmountD } = form;
		setCollateralFactor(account, keyring, poolId, newAmountN, newAmountD);
	};

	const handleSetCollateralThreshold = (
		form: CollateralThresholdFormValues
	) => {
		const { poolId, newThresholdN, newThresholdD } = form;
		setCollateralThreshold(
			account,
			keyring,
			poolId,
			newThresholdN,
			newThresholdD
		);
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
			<SetCollateralThreshold
				// @ts-ignore
				onSubmit={handleSetCollateralThreshold}
				// @ts-ignore
				isLoading={isSetCollateralThresholdResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
