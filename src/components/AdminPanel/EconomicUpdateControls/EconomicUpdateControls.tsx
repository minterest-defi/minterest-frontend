import React from 'react';
// @ts-ignore
import classes from './EconomicUpdateControls.module.css';
import SetBaseRatePerBlock from '../../Forms/SetBaseRatePerBlock/SetBaseRatePerBlock';
import SetJumpMultiplierPerBlock from '../../Forms/SetJumpMultiplierPerBlock/SetJumpMultiplierPerBlock';
import SetKink from '../../Forms/SetKink/SetKink';
import SetMultiplierPerBlock from '../../Forms/SetMultiplierPerBlock/SetMultiplierPerBlock';
import FeedValues from '../../Forms/FeedValues/FeedValues';
import LockPrice from '../../Forms/LockPrice/LockPrice';
import UnlockPrice from '../../Forms/UnlockPrice/UnlockPrice';
import SendDeviationTreshold from '../../Forms/SendDeviationTreshold/SendDeviationTreshold';
import SetBalanceRatio from '../../Forms/SetBalanceRatio/SetBalanceRatio';
import SetBorrowCap from '../../Forms/SetBorrowCap/SetBorrowCap';

export default function EconomicUpdateControls(props) {
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
		setBorrowCap,

		isSetBaseRateBlockResponseRunning,
		isSetJumpMultiplierBlockResponseRunning,
		isSetKinkResponseRunning,
		isSetMultiplierPerBlockResponseRunning,
		isFeedValuesResponseRunning,
		isLockPriceResponseRunning,
		isUnlockPriceResponseRunning,
		isSetDeviationThresholdResponseRunning,
		isSetBalanceRatioResponseRunning,
		isSetBorrowCapResponseRunning,
	} = props;

	const handleSetBaseRatePerBlock = (form) => {
		const { poolId, baseRatePerYearN, baseRatePerYearD } = form;
		setBaseRatePerBlock(
			account,
			keyring,
			poolId,
			baseRatePerYearN,
			baseRatePerYearD
		);
	};
	const handleSetJumpMultiplierPerBlock = (form) => {
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
	const handleSetKink = (form) => {
		const { poolId, kinkNominator, kinkDivider } = form;
		setKink(account, keyring, poolId, kinkNominator, kinkDivider);
	};
	const handleSetMultiplierPerBlock = (form) => {
		const { poolId, multiplierRatePerYearN, multiplierRatePerYearD } = form;
		setMultiplierPerBlock(
			account,
			keyring,
			poolId,
			multiplierRatePerYearN,
			multiplierRatePerYearD
		);
	};

	const handleFeedValues = (form) => {
		const { values } = form;
		feedValues(account, keyring, values);
	};

	const handleLockPrice = (form) => {
		const { currencyId } = form;
		lockPrice(account, keyring, currencyId);
	};

	const handleUnlockPrice = (form) => {
		const { currencyId } = form;
		unlockPrice(account, keyring, currencyId);
	};

	const handleSendDeviationTreshold = (form) => {
		const { poolId, newThreshold } = form;
		setDeviationThreshold(account, keyring, poolId, newThreshold);
	};

	const handleSetBalanceRatio = (form) => {
		const { poolId, newBalanceRatio } = form;
		setBalanceRatio(account, keyring, poolId, newBalanceRatio);
	};

	const handleSetBorrowCap = (form) => {
		const { poolId, borrowCap } = form;
		setBorrowCap(account, keyring, poolId, borrowCap);
	};

	return (
		<div className={classes.wrapper}>
			<SetBaseRatePerBlock
				onSubmit={handleSetBaseRatePerBlock}
				// @ts-ignore
				isLoading={isSetBaseRateBlockResponseRunning}
				isAccountReady={!!account}
			/>
			<SetJumpMultiplierPerBlock
				onSubmit={handleSetJumpMultiplierPerBlock}
				// @ts-ignore
				isLoading={isSetJumpMultiplierBlockResponseRunning}
				isAccountReady={!!account}
			/>
			<SetKink
				onSubmit={handleSetKink}
				// @ts-ignore
				isLoading={isSetKinkResponseRunning}
				isAccountReady={!!account}
			/>
			<SetMultiplierPerBlock
				onSubmit={handleSetMultiplierPerBlock}
				// @ts-ignore
				isLoading={isSetMultiplierPerBlockResponseRunning}
				isAccountReady={!!account}
			/>
			<FeedValues
				onSubmit={handleFeedValues}
				// @ts-ignore
				isLoading={isFeedValuesResponseRunning}
				isAccountReady={!!account}
			/>
			<LockPrice
				onSubmit={handleLockPrice}
				// @ts-ignore
				isLoading={isLockPriceResponseRunning}
				isAccountReady={!!account}
			/>
			<UnlockPrice
				onSubmit={handleUnlockPrice}
				// @ts-ignore
				isLoading={isUnlockPriceResponseRunning}
				isAccountReady={!!account}
			/>
			<SendDeviationTreshold
				onSubmit={handleSendDeviationTreshold}
				// @ts-ignore
				isLoading={isSetDeviationThresholdResponseRunning}
				isAccountReady={!!account}
			/>
			<SetBalanceRatio
				onSubmit={handleSetBalanceRatio}
				// @ts-ignore
				isLoading={isSetBalanceRatioResponseRunning}
				isAccountReady={!!account}
			/>
			<SetBorrowCap
				onSubmit={handleSetBorrowCap}
				// @ts-ignore
				isLoading={isSetBorrowCapResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
