import React from 'react';
// @ts-ignore
import classes from './ProtocolConfigurationUpdates.module.css';

import {
	ProtocolConfigurationUpdatesProps,
	InsuranceFactorFormValues,
	CollateralFactorFormValues,
	BaseRatePerYearFormValues,
	MultiplierPerYearFormValues,
	KinkFormValues,
	JumpMultiplierPerYearFormValues,
	BorrowCapFormValues,
} from '../../containers/ProtocolAdmin/ProtocolAdmin.types';

import SetInsuranceFactor from '../Forms/SetInsuranceFactor/SetInsuranceFactor';
import SetCollateralFactor from '../Forms/SetCollateralFactor/SetCollateralFactor';
import SetBaseRatePerYear from '../Forms/SetBaseRatePerYear/SetBaseRatePerYear';
import SetMultiplierPerYear from '../Forms/SetMultiplierPerYear/SetMultiplierPerYear';
import SetKink from '../Forms/SetKink/SetKink';
import SetJumpMultiplierPerYear from '../Forms/SetJumpMultiplierPerYear/SetJumpMultiplierPerYear';
import SetBorrowCap from '../Forms/SetBorrowCap/SetBorrowCap';

export default function ProtocolConfigurationUpdates(
	props: ProtocolConfigurationUpdatesProps
) {
	const {
		account,
		keyring,

		setInsuranceFactor,
		isSetInsuranceFactorResponseRunning,

		setCollateralFactor,
		isSetCollateralFactorResponseRunning,

		setBaseRatePerYear,
		isSetBaseRateYearResponseRunning,

		setMultiplierPerYear,
		isSetMultiplierPerYearResponseRunning,

		setKink,
		isSetKinkResponseRunning,

		setJumpMultiplierPerYear,
		isSetJumpMultiplierYearResponseRunning,

		setBorrowCap,
		isSetBorrowCapResponseRunning,
	} = props;

	const handleSetInsuranceFactor = (form: InsuranceFactorFormValues) => {
		const { poolId, newAmount } = form;
		if (account) setInsuranceFactor(account, keyring, poolId, newAmount);
	};

	const handleSetCollateralFactor = (form: CollateralFactorFormValues) => {
		const { poolId, newAmount } = form;
		if (account) setCollateralFactor(account, keyring, poolId, newAmount);
	};

	const handleSetBaseRatePerYear = (form: BaseRatePerYearFormValues) => {
		const { poolId, baseRatePerYear } = form;
		if (account) setBaseRatePerYear(account, keyring, poolId, baseRatePerYear);
	};

	const handleSetMultiplierPerYear = (form: MultiplierPerYearFormValues) => {
		const { poolId, multiplierRatePerYear } = form;
		if (account)
			setMultiplierPerYear(account, keyring, poolId, multiplierRatePerYear);
	};

	const handleSetKink = (form: KinkFormValues) => {
		const { poolId, kink } = form;
		if (account) setKink(account, keyring, poolId, kink);
	};

	const handleSetJumpMultiplierPerYear = (
		form: JumpMultiplierPerYearFormValues
	) => {
		const { poolId, jumpMultiplierRatePerYear } = form;
		if (account)
			setJumpMultiplierPerYear(
				account,
				keyring,
				poolId,
				jumpMultiplierRatePerYear
			);
	};

	const handleSetBorrowCap = (form: BorrowCapFormValues) => {
		const { poolId, borrowCap } = form;
		if (account) setBorrowCap(account, keyring, poolId, borrowCap);
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.a}>
				<SetInsuranceFactor
					// @ts-ignore
					onSubmit={handleSetInsuranceFactor}
					// @ts-ignore
					isLoading={isSetInsuranceFactorResponseRunning}
					isAccountReady={!!account}
				/>
				<SetCollateralFactor
					// @ts-ignore
					onSubmit={handleSetCollateralFactor}
					// @ts-ignore
					isLoading={isSetCollateralFactorResponseRunning}
					isAccountReady={!!account}
				/>
				<SetBaseRatePerYear
					// @ts-ignore
					onSubmit={handleSetBaseRatePerYear}
					// @ts-ignore
					isLoading={isSetBaseRateYearResponseRunning}
					isAccountReady={!!account}
				/>
			</div>
			<div className={classes.b}>
				<SetMultiplierPerYear
					// @ts-ignore
					onSubmit={handleSetMultiplierPerYear}
					// @ts-ignore
					isLoading={isSetMultiplierPerYearResponseRunning}
					isAccountReady={!!account}
				/>
				<SetKink
					// @ts-ignore
					onSubmit={handleSetKink}
					// @ts-ignore
					isLoading={isSetKinkResponseRunning}
					isAccountReady={!!account}
				/>
				<SetJumpMultiplierPerYear
					// @ts-ignore
					onSubmit={handleSetJumpMultiplierPerYear}
					// @ts-ignore
					isLoading={isSetJumpMultiplierYearResponseRunning}
					isAccountReady={!!account}
				/>
			</div>
			<div className={classes.c}>
				<SetBorrowCap
					// @ts-ignore
					onSubmit={handleSetBorrowCap}
					// @ts-ignore
					isLoading={isSetBorrowCapResponseRunning}
					isAccountReady={!!account}
				/>
			</div>
		</div>
	);
}
