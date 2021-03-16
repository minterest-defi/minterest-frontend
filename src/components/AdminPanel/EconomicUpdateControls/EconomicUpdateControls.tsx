import React from 'react';
// @ts-ignore
import classes from './EconomicUpdateControls.module.css';
import SetBaseRatePerBlock from '../../Forms/SetBaseRatePerBlock/SetBaseRatePerBlock';
import {
	EconomicUpdateControlsProps,
	BaseRatePerBlockFormValues,
	JumpMultiplierPerBlockFormValues,
	KinkFormValues,
	MultiplierPerFormValues,
	FeedValuesFormValues,
	LockPriceFormValues,
	UnlockPriceFormValues,
	DeviationTresholdFormValues,
	BalanceRatioFormValues,
} from '../AdminPanel.types';
import SetJumpMultiplierPerBlock from '../../Forms/SetJumpMultiplierPerBlock/SetJumpMultiplierPerBlock';
import SetKink from '../../Forms/SetKink/SetKink';
import SetMultiplierPerBlock from '../../Forms/SetMultiplierPerBlock/SetMultiplierPerBlock';
import FeedValues from '../../Forms/FeedValues/FeedValues';
import LockPrice from '../../Forms/LockPrice/LockPrice';
import UnlockPrice from '../../Forms/UnlockPrice/UnlockPrice';
import SendDeviationTreshold from '../../Forms/SendDeviationTreshold/SendDeviationTreshold';
import SetBalanceRatio from '../../Forms/SetBalanceRatio/SetBalanceRatio';

export default function EconomicUpdateControls(
	props: EconomicUpdateControlsProps
) {
	const {
		account,
		keyring,
		setKink,
		setBaseRatePerBlock,
		setJumpMultiplierPerBlock,
		setMultiplierPerBlock,
		feedValues,
		lockPrice,
		unlockPrice,
		setDeviationThreshold,
		setBalanceRatio,

		isSetBaseRateBlockResponseRunning,
		isSetJumpMultiplierBlockResponseRunning,
		isSetKinkResponseRunning,
		isSetMultiplierPerBlockResponseRunning,
		isFeedValuesResponseRunning,
		isLockPriceResponseRunning,
		isUnlockPriceResponseRunning,
		isSetDeviationThresholdResponseRunning,
		isSetBalanceRatioResponseRunning,
	} = props;

	const handleSetBaseRatePerBlock = (form: BaseRatePerBlockFormValues) => {
		const { poolId, baseRatePerYearN, baseRatePerYearD } = form;
		setBaseRatePerBlock(
			account,
			keyring,
			poolId,
			baseRatePerYearN,
			baseRatePerYearD
		);
	};
	const handleSetJumpMultiplierPerBlock = (
		form: JumpMultiplierPerBlockFormValues
	) => {
		const {
			poolId,
			jumpMultiplierRatePerYearN,
			jumpMultiplierRatePerYearD,
		} = form;
		setJumpMultiplierPerBlock(
			account,
			keyring,
			poolId,
			jumpMultiplierRatePerYearN,
			jumpMultiplierRatePerYearD
		);
	};
	const handleSetKink = (form: KinkFormValues) => {
		const { poolId, kinkNominator, kinkDivider } = form;
		setKink(account, keyring, poolId, kinkNominator, kinkDivider);
	};
	const handleSetMultiplierPerBlock = (form: MultiplierPerFormValues) => {
		const { poolId, multiplierRatePerYearN, multiplierRatePerYearD } = form;
		setMultiplierPerBlock(
			account,
			keyring,
			poolId,
			multiplierRatePerYearN,
			multiplierRatePerYearD
		);
	};

	const handleFeedValues = (form: FeedValuesFormValues) => {
		const { values } = form;
		feedValues(account, keyring, values);
	};

	const handleLockPrice = (form: LockPriceFormValues) => {
		const { currencyId } = form;
		lockPrice(account, keyring, currencyId);
	};

	const handleUnlockPrice = (form: UnlockPriceFormValues) => {
		const { currencyId } = form;
		unlockPrice(account, keyring, currencyId);
	};

	const handleSendDeviationTreshold = (form: DeviationTresholdFormValues) => {
		const { poolId, newThreshold } = form;
		setDeviationThreshold(account, keyring, poolId, newThreshold);
	};

	const handleSetBalanceRatio = (form: BalanceRatioFormValues) => {
		const { poolId, newBalanceRatio } = form;
		setBalanceRatio(account, keyring, poolId, newBalanceRatio);
	};

	return (
		<div className={classes.wrapper}>
			<SetBaseRatePerBlock
				// @ts-ignore
				onSubmit={handleSetBaseRatePerBlock}
				// @ts-ignore
				isLoading={isSetBaseRateBlockResponseRunning}
				isAccountReady={!!account}
			/>
			<SetJumpMultiplierPerBlock
				// @ts-ignore
				onSubmit={handleSetJumpMultiplierPerBlock}
				// @ts-ignore
				isLoading={isSetJumpMultiplierBlockResponseRunning}
				isAccountReady={!!account}
			/>
			<SetKink
				// @ts-ignore
				onSubmit={handleSetKink}
				// @ts-ignore
				isLoading={isSetKinkResponseRunning}
				isAccountReady={!!account}
			/>
			<SetMultiplierPerBlock
				// @ts-ignore
				onSubmit={handleSetMultiplierPerBlock}
				// @ts-ignore
				isLoading={isSetMultiplierPerBlockResponseRunning}
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
			<SendDeviationTreshold
				// @ts-ignore
				onSubmit={handleSendDeviationTreshold}
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
		</div>
	);
}
