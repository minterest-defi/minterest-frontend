import React from 'react';
// @ts-ignore
import classes from './CollateralBlock.module.css';
import SetCollateralFactor from '../../Forms/SetCollateralFactor/SetCollateralFactor';
import SetCollateralThreshold from '../../Forms/SetCollateralThreshold/SetCollateralThreshold';

export default function CollateralBlock(props) {
	const {
		account,
		keyring,

		setCollateralFactor,
		setCollateralThreshold,

		isSetCollateralThresholdResponseRunning,
		isSetCollateralFactorResponseRunning,
	} = props;

	const handleSetCollateralFactor = (form) => {
		const { poolId, newAmountN, newAmountD } = form;
		setCollateralFactor(account, keyring, poolId, newAmountN, newAmountD);
	};

	const handleSetCollateralThreshold = (form) => {
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
				onSubmit={handleSetCollateralFactor}
				// @ts-ignore
				isLoading={isSetCollateralFactorResponseRunning}
				isAccountReady={!!account}
			/>
			<SetCollateralThreshold
				onSubmit={handleSetCollateralThreshold}
				// @ts-ignore
				isLoading={isSetCollateralThresholdResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
