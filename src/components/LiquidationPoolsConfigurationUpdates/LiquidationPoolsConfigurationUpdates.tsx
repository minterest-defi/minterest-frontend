import React from 'react';
import classes from './LiquidationPoolsConfigurationUpdates.module.scss';
import {
	LiquidationPoolsConfigurationUpdatesProps,
	BalanceRatioFormValues,
	DeviationTresholdFormValues,
	ThresholdFormValues,
	LiquidationsMaxAttemptsFormValues,
	MinPartialLiquidationSumFormValues,
	SetLiquidationPoolTotalFormValues,
	LiquidationIncentiveFormValues,
	MaxIdealBalanceFormValues,
	SeedLiquidationPoolFormValues,
} from '../../containers/LiquidationAdmin/LiquidationAdmin.types';
import SetBalanceRatio from '../Forms/SetBalanceRatio/SetBalanceRatio';
import SendDeviationThreshold from '../Forms/SendDeviationThreshold/SendDeviationThreshold';
import SetLiquidationFee from '../Forms/SetLiquidationFee/SetLiquidationFee';
import SetMaxIdealBalance from '../Forms/SetMaxIdealBalance/SetMaxIdealBalance';
import SetThreshold from '../Forms/SetThreshold/SetThreshold';
import SetLiquidationsMaxAttemptsForm from '../Forms/SetLiquidationsMaxAttempts/SetLiquidationsMaxAttempts';
import SetMinPartialLiquidationSumForm from '../Forms/SetMinPartialLiquidationSum/SetMinPartialLiquidationSum';
import SetLiquidationPoolTotalForm from '../Forms/SetLiquidationPoolTotal/SetLiquidationPoolTotal';
import SeedLiquidationPool from '../Forms/SeedLiquidationPool/SeedLiquidationPool';

export default function LiquidationPoolsConfigurationUpdates(
	props: LiquidationPoolsConfigurationUpdatesProps
) {
	const {
		account,
		keyring,
		currenciesOptions,

		setBalanceRatio,
		isSetBalanceRatioResponseRunning,

		setDeviationThreshold,
		isSetDeviationThresholdResponseRunning,

		setLiquidationFee,
		isSetLiquidationFeeResponseRunning,

		setMaxIdealBalance,
		isSetMaxIdealBalanceResponseRunning,

		setThreshold,
		isSetThresholdResponseRunning,

		setLiquidationMaxAttempts,
		isSetLiquidationsMaxAttemptsResponseRunning,

		setMinPartialLiquidationSum,
		isSetMinPartialLiquidationSumResponseRunning,

		setLiquidationPoolTotal,
		isSetLiquidationPoolTotalRequestRunning,

		transferToLiquidationPool,
		isTransferToLiquidationPoolRequestRunning,
	} = props;

	const handleSetBalanceRatio = (form: BalanceRatioFormValues) => {
		const { poolId, newBalanceRatio } = form;
		if (account) setBalanceRatio(account, keyring, poolId, newBalanceRatio);
	};

	const handleSendDeviationThreshold = (form: DeviationTresholdFormValues) => {
		const { poolId, newThreshold } = form;
		if (account) setDeviationThreshold(account, keyring, poolId, newThreshold);
	};

	const handleSetThreshold = (form: ThresholdFormValues) => {
		const { poolId, newThreshold } = form;
		if (account) setThreshold(account, keyring, poolId, newThreshold);
	};

	const handleSetLiquidationsMaxAttempts = (
		form: LiquidationsMaxAttemptsFormValues
	) => {
		const { poolId, newMaxValue } = form;
		if (account)
			setLiquidationMaxAttempts(account, keyring, poolId, newMaxValue);
	};

	const handleSetMinPartialLiquidationSum = (
		form: MinPartialLiquidationSumFormValues
	) => {
		const { poolId, newMinSum } = form;

		if (account)
			setMinPartialLiquidationSum(account, keyring, poolId, newMinSum);
	};

	const handleSeedLiquidationPool = (form: SeedLiquidationPoolFormValues) => {
		const { currencyId, amount } = form;
		if (account)
			transferToLiquidationPool(account, keyring, currencyId, amount);
	};

	const handleSetLiquidationFee = (form: LiquidationIncentiveFormValues) => {
		const { poolId, liquidationFee } = form;

		if (account) setLiquidationFee(account, keyring, poolId, liquidationFee);
	};

	const handleSetMaxIdealBalance = (form: MaxIdealBalanceFormValues) => {
		const { poolId, maxIdealBalance } = form;

		if (account) setMaxIdealBalance(account, keyring, poolId, maxIdealBalance);
	};

	const handleSetLiquidationPoolTotal = (
		form: SetLiquidationPoolTotalFormValues
	) => {
		const { amount, currencyId } = form;
		if (account) setLiquidationPoolTotal(account, keyring, currencyId, amount);
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.a}>
				<SetBalanceRatio
					// @ts-ignore
					onSubmit={handleSetBalanceRatio}
					// @ts-ignore
					isLoading={isSetBalanceRatioResponseRunning}
					isAccountReady={!!account}
					currenciesOptions={currenciesOptions}
				/>
				<SendDeviationThreshold
					// @ts-ignore
					onSubmit={handleSendDeviationThreshold}
					// @ts-ignore
					isLoading={isSetDeviationThresholdResponseRunning}
					isAccountReady={!!account}
					currenciesOptions={currenciesOptions}
				/>
				<SetLiquidationPoolTotalForm
					// @ts-ignore
					onSubmit={handleSetLiquidationPoolTotal}
					// @ts-ignore
					isLoading={isSetLiquidationPoolTotalRequestRunning}
					isAccountReady={!!account}
					currenciesOptions={currenciesOptions}
				/>
			</div>
			<div className={classes.b}>
				<SetLiquidationFee
					// @ts-ignore
					onSubmit={handleSetLiquidationFee}
					// @ts-ignore
					isLoading={isSetLiquidationFeeResponseRunning}
					isAccountReady={!!account}
					currenciesOptions={currenciesOptions}
				/>
				<SetMaxIdealBalance
					// @ts-ignore
					onSubmit={handleSetMaxIdealBalance}
					// @ts-ignore
					isLoading={isSetMaxIdealBalanceResponseRunning}
					isAccountReady={!!account}
					currenciesOptions={currenciesOptions}
				/>
				<SetThreshold
					// @ts-ignore
					onSubmit={handleSetThreshold}
					// @ts-ignore
					isLoading={isSetThresholdResponseRunning}
					isAccountReady={!!account}
					currenciesOptions={currenciesOptions}
				/>
				<SetLiquidationsMaxAttemptsForm
					// @ts-ignore
					onSubmit={handleSetLiquidationsMaxAttempts}
					// @ts-ignore
					isLoading={isSetLiquidationsMaxAttemptsResponseRunning}
					isAccountReady={!!account}
					currenciesOptions={currenciesOptions}
				/>
			</div>
			<div className={classes.c}>
				<SetMinPartialLiquidationSumForm
					// @ts-ignore
					onSubmit={handleSetMinPartialLiquidationSum}
					// @ts-ignore
					isLoading={isSetMinPartialLiquidationSumResponseRunning}
					isAccountReady={!!account}
					currenciesOptions={currenciesOptions}
				/>
				<SeedLiquidationPool
					// @ts-ignore
					onSubmit={handleSeedLiquidationPool}
					// @ts-ignore
					isLoading={isTransferToLiquidationPoolRequestRunning}
					isAccountReady={!!account}
					currenciesOptions={currenciesOptions}
				/>
			</div>
		</div>
	);
}
