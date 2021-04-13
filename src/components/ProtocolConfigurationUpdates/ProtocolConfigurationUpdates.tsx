import React from 'react';
import classes from './ProtocolConfigurationUpdates.module.scss';

import {
	ProtocolConfigurationUpdatesProps,
	ProtocolInterestFactorFormValues,
	ProtocolInterestTresholdFormValues,
	CollateralFactorFormValues,
	BaseRatePerYearFormValues,
	MultiplierPerYearFormValues,
	KinkFormValues,
	JumpMultiplierPerYearFormValues,
	BorrowCapFormValues,
} from '../../containers/ProtocolAdmin/ProtocolAdmin.types';

import SetProtocolInterestFactor from '../Forms/SetProtocolInterestFactor/SetProtocolInterestFactor';
import SetCollateralFactor from '../Forms/SetCollateralFactor/SetCollateralFactor';
import SetBaseRatePerYear from '../Forms/SetBaseRatePerYear/SetBaseRatePerYear';
import SetMultiplierPerYear from '../Forms/SetMultiplierPerYear/SetMultiplierPerYear';
import SetKink from '../Forms/SetKink/SetKink';
import SetJumpMultiplierPerYear from '../Forms/SetJumpMultiplierPerYear/SetJumpMultiplierPerYear';
import SetBorrowCap from '../Forms/SetBorrowCap/SetBorrowCap';
import SetProtocolInterestThreshold from '../Forms/SetProtocolInterestTreshold/SetProtocolInterestThreshold';

export default function ProtocolConfigurationUpdates(
	props: ProtocolConfigurationUpdatesProps
) {
	const {
		account,
		keyring,
		currenciesOptions,

		setProtocolInterestFactor,
		isSetProtocolInterestFactorResponseRunning,

		setProtocolInterestThreshold,
		isSetProtocolInterestThresholdResponseRunning,

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

	const handleSetProtocolInterestFactor = (
		form: ProtocolInterestFactorFormValues
	) => {
		const { poolId, newAmount } = form;
		if (account) setProtocolInterestFactor(account, keyring, poolId, newAmount);
	};

	const handleSetProtocolInterestThreshold = (
		form: ProtocolInterestTresholdFormValues
	) => {
		const { poolId, protocolInterestThreshold } = form;
		if (account)
			setProtocolInterestThreshold(
				account,
				keyring,
				poolId,
				protocolInterestThreshold
			);
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
				<SetProtocolInterestFactor
					// @ts-ignore
					onSubmit={handleSetProtocolInterestFactor}
					// @ts-ignore
					isLoading={isSetProtocolInterestFactorResponseRunning}
					isAccountReady={!!account}
					currenciesOptions={currenciesOptions}
				/>
				<SetProtocolInterestThreshold
					// @ts-ignore
					onSubmit={handleSetProtocolInterestThreshold}
					// @ts-ignore
					isLoading={isSetProtocolInterestThresholdResponseRunning}
					isAccountReady={!!account}
					currenciesOptions={currenciesOptions}
				/>
				<SetCollateralFactor
					// @ts-ignore
					onSubmit={handleSetCollateralFactor}
					// @ts-ignore
					isLoading={isSetCollateralFactorResponseRunning}
					isAccountReady={!!account}
					currenciesOptions={currenciesOptions}
				/>
				<SetBaseRatePerYear
					// @ts-ignore
					onSubmit={handleSetBaseRatePerYear}
					// @ts-ignore
					isLoading={isSetBaseRateYearResponseRunning}
					isAccountReady={!!account}
					currenciesOptions={currenciesOptions}
				/>
			</div>
			<div className={classes.b}>
				<SetMultiplierPerYear
					// @ts-ignore
					onSubmit={handleSetMultiplierPerYear}
					// @ts-ignore
					isLoading={isSetMultiplierPerYearResponseRunning}
					isAccountReady={!!account}
					currenciesOptions={currenciesOptions}
				/>
				<SetKink
					// @ts-ignore
					onSubmit={handleSetKink}
					// @ts-ignore
					isLoading={isSetKinkResponseRunning}
					isAccountReady={!!account}
					currenciesOptions={currenciesOptions}
				/>
				<SetJumpMultiplierPerYear
					// @ts-ignore
					onSubmit={handleSetJumpMultiplierPerYear}
					// @ts-ignore
					isLoading={isSetJumpMultiplierYearResponseRunning}
					isAccountReady={!!account}
					currenciesOptions={currenciesOptions}
				/>
			</div>
			<div className={classes.c}>
				<SetBorrowCap
					// @ts-ignore
					onSubmit={handleSetBorrowCap}
					// @ts-ignore
					isLoading={isSetBorrowCapResponseRunning}
					isAccountReady={!!account}
					currenciesOptions={currenciesOptions}
				/>
			</div>
		</div>
	);
}
