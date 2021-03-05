import React from 'react';
// @ts-ignore
import classes from './EconomicUpdateControls.module.css';
import SetBaseRatePerBlock from '../../Forms/SetBaseRatePerBlock/SetBaseRatePerBlock';
import SetJumpMultiplierPerBlock from '../../Forms/SetJumpMultiplierPerBlock/SetJumpMultiplierPerBlock';
import SetKink from '../../Forms/SetKink/SetKink';
import SetMultiplierPerBlock from '../../Forms/SetMultiplierPerBlock/SetMultiplierPerBlock';

export default function EconomicUpdateControls(props) {
	const {
		account,
		keyring,
		setKink,
		setBaseRatePerBlock,
		setJumpMultiplierPerBlock,
		setMultiplierPerBlock,

		isSetBaseRateBlockResponseRunning,
		isSetJumpMultiplierBlockResponseRunning,
		isSetKinkResponseRunning,
		isSetMultiplierPerBlockResponseRunning,
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
		</div>
	);
}
