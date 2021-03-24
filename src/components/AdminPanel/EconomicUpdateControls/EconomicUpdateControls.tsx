import React from 'react';
// @ts-ignore
import classes from './EconomicUpdateControls.module.css';
import SetBaseRatePerYear from '../../Forms/SetBaseRatePerYear/SetBaseRatePerYear';
import {
	EconomicUpdateControlsProps,
	BaseRatePerYearFormValues,
	JumpMultiplierPerYearFormValues,
	KinkFormValues,
	MultiplierPerYearFormValues,
	FeedValuesFormValues,
	LockPriceFormValues,
	UnlockPriceFormValues,
	DeviationTresholdFormValues,
	BalanceRatioFormValues,
	BorrowCapFormValues,
	BalancingPeriod,
} from '../AdminPanel.types';
import SetJumpMultiplierPerYear from '../../Forms/SetJumpMultiplierPerYear/SetJumpMultiplierPerYear';
import SetKink from '../../Forms/SetKink/SetKink';
import SetMultiplierPerYear from '../../Forms/SetMultiplierPerYear/SetMultiplierPerYear';
import FeedValues from '../../Forms/FeedValues/FeedValues';
import LockPrice from '../../Forms/LockPrice/LockPrice';
import UnlockPrice from '../../Forms/UnlockPrice/UnlockPrice';
import SendDeviationThreshold from '../../Forms/SendDeviationThreshold/SendDeviationThreshold';
import SetBalanceRatio from '../../Forms/SetBalanceRatio/SetBalanceRatio';
import SetBorrowCap from '../../Forms/SetBorrowCap/SetBorrowCap';
import SetBalancingPeriod from '../../Forms/SetBalancingPeriod/SetBalancingPeriod';

export default function EconomicUpdateControls(
	props: EconomicUpdateControlsProps
) {
	const {
		account,
		keyring,
		setKink,
		setBaseRatePerYear,
		setJumpMultiplierPerYear,
		setMultiplierPerYear,
		feedValues,
		lockPrice,
		unlockPrice,
		setDeviationThreshold,
		setBalanceRatio,
		setBorrowCap,
		setBalancingPeriod,

		isSetBaseRateYearResponseRunning,
		isSetJumpMultiplierYearResponseRunning,
		isSetKinkResponseRunning,
		isSetMultiplierPerYearResponseRunning,
		isFeedValuesResponseRunning,
		isLockPriceResponseRunning,
		isUnlockPriceResponseRunning,
		isSetDeviationThresholdResponseRunning,
		isSetBalanceRatioResponseRunning,
		isSetBorrowCapResponseRunning,
		isSetBalancingPeriodResponseRunning,
	} = props;

	const handleSetBaseRatePerYear = (form: BaseRatePerYearFormValues) => {
		const { poolId, baseRatePerYear } = form;
		if (account) setBaseRatePerYear(account, keyring, poolId, baseRatePerYear);
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
	const handleSetKink = (form: KinkFormValues) => {
		const { poolId, kink } = form;
		if (account) setKink(account, keyring, poolId, kink);
	};
	const handleSetMultiplierPerYear = (form: MultiplierPerYearFormValues) => {
		const { poolId, multiplierRatePerYear } = form;
		if (account)
			setMultiplierPerYear(account, keyring, poolId, multiplierRatePerYear);
	};

	const handleFeedValues = (form: FeedValuesFormValues) => {
		const { values } = form;
		if (account) feedValues(account, keyring, values);
	};

	const handleLockPrice = (form: LockPriceFormValues) => {
		const { currencyId } = form;
		if (account) lockPrice(account, keyring, currencyId);
	};

	const handleUnlockPrice = (form: UnlockPriceFormValues) => {
		const { currencyId } = form;
		if (account) unlockPrice(account, keyring, currencyId);
	};

	const handleSendDeviationThreshold = (form: DeviationTresholdFormValues) => {
		const { poolId, newThreshold } = form;
		if (account) setDeviationThreshold(account, keyring, poolId, newThreshold);
	};

	const handleSetBalanceRatio = (form: BalanceRatioFormValues) => {
		const { poolId, newBalanceRatio } = form;
		if (account) setBalanceRatio(account, keyring, poolId, newBalanceRatio);
	};

	const handleSetBorrowCap = (form: BorrowCapFormValues) => {
		const { poolId, borrowCap } = form;
		if (account) setBorrowCap(account, keyring, poolId, borrowCap);
	};

	const handleSetBalancingPeriod = (form: BalancingPeriod) => {
		const { newPeriod } = form;
		if (account) setBalancingPeriod(account, keyring, newPeriod);
	};

	return (
		<div className={classes.wrapper}>
			<SetBaseRatePerYear
				// @ts-ignore
				onSubmit={handleSetBaseRatePerYear}
				// @ts-ignore
				isLoading={isSetBaseRateYearResponseRunning}
				isAccountReady={!!account}
			/>
			<SetJumpMultiplierPerYear
				// @ts-ignore
				onSubmit={handleSetJumpMultiplierPerYear}
				// @ts-ignore
				isLoading={isSetJumpMultiplierYearResponseRunning}
				isAccountReady={!!account}
			/>
			<SetKink
				// @ts-ignore
				onSubmit={handleSetKink}
				// @ts-ignore
				isLoading={isSetKinkResponseRunning}
				isAccountReady={!!account}
			/>
			<SetMultiplierPerYear
				// @ts-ignore
				onSubmit={handleSetMultiplierPerYear}
				// @ts-ignore
				isLoading={isSetMultiplierPerYearResponseRunning}
				isAccountReady={!!account}
			/>
			<FeedValues
				// @ts-ignore
				onSubmit={handleFeedValues}
				// @ts-ignore
				isLoading={isFeedValuesResponseRunning}
				isAccountReady={!!account}
			/>
			<LockPrice
				// @ts-ignore
				onSubmit={handleLockPrice}
				// @ts-ignore
				isLoading={isLockPriceResponseRunning}
				isAccountReady={!!account}
			/>
			<UnlockPrice
				// @ts-ignore
				onSubmit={handleUnlockPrice}
				// @ts-ignore
				isLoading={isUnlockPriceResponseRunning}
				isAccountReady={!!account}
			/>
			<SendDeviationThreshold
				// @ts-ignore
				onSubmit={handleSendDeviationThreshold}
				// @ts-ignore
				isLoading={isSetDeviationThresholdResponseRunning}
				isAccountReady={!!account}
			/>
			<SetBalanceRatio
				// @ts-ignore
				onSubmit={handleSetBalanceRatio}
				// @ts-ignore
				isLoading={isSetBalanceRatioResponseRunning}
				isAccountReady={!!account}
			/>
			<SetBorrowCap
				// @ts-ignore
				onSubmit={handleSetBorrowCap}
				// @ts-ignore
				isLoading={isSetBorrowCapResponseRunning}
				isAccountReady={!!account}
			/>
			<SetBalancingPeriod
				// @ts-ignore
				onSubmit={handleSetBalancingPeriod}
				// @ts-ignore
				isLoading={isSetBalancingPeriodResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
