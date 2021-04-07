import React from 'react';
import classes from './LiquidationPoolsConfigurationUpdates.module.css';
import {
	LiquidationPoolsConfigurationUpdatesProps,
	BalanceRatioFormValues,
	DeviationTresholdFormValues,
	ThresholdFormValues,
	LiquidationsMaxAttemptsFormValues,
	MinPartialLiquidationSumFormValues,
	BalancingPeriod,
	SetLiquidationPoolTotalFormValues,
	LiquidationIncentiveFormValues,
} from '../../containers/LiquidationAdmin/LiquidationAdmin.types';
import SetBalanceRatio from '../Forms/SetBalanceRatio/SetBalanceRatio';
import SendDeviationThreshold from '../Forms/SendDeviationThreshold/SendDeviationThreshold';
import SetLiquidationFee from '../Forms/SetLiquidationFee/SetLiquidationFee';
import SetThreshold from '../Forms/SetThreshold/SetThreshold';
import SetLiquidationsMaxAttemptsForm from '../Forms/SetLiquidationsMaxAttempts/SetLiquidationsMaxAttempts';
import SetMinPartialLiquidationSumForm from '../Forms/SetMinPartialLiquidationSum/SetMinPartialLiquidationSum';
import SetBalancingPeriod from '../Forms/SetBalancingPeriod/SetBalancingPeriod';
import SetLiquidationPoolTotalForm from '../Forms/SetLiquidationPoolTotal/SetLiquidationPoolTotal';

export default function LiquidationPoolsConfigurationUpdates(
	props: LiquidationPoolsConfigurationUpdatesProps
) {
	const {
		account,
		keyring,

		setBalanceRatio,
		isSetBalanceRatioResponseRunning,

		setDeviationThreshold,
		isSetDeviationThresholdResponseRunning,

		setLiquidationFee,
		isSetLiquidationFeeResponseRunning,

		setThreshold,
		isSetThresholdResponseRunning,

		setLiquidationMaxAttempts,
		isSetLiquidationsMaxAttemptsResponseRunning,

		setMinPartialLiquidationSum,
		isSetMinPartialLiquidationSumResponseRunning,

		setBalancingPeriod,
		isSetBalancingPeriodResponseRunning,

		setLiquidationPoolTotal,
		isSetLiquidationPoolTotalRequestRunning,
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

	const handleSetBalancingPeriod = (form: BalancingPeriod) => {
		const { newPeriod } = form;
		if (account) setBalancingPeriod(account, keyring, newPeriod);
	};

	const handleSetLiquidationFee = (form: LiquidationIncentiveFormValues) => {
		const { poolId, liquidationFee } = form;

		if (account) setLiquidationFee(account, keyring, poolId, liquidationFee);
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
				/>
				<SendDeviationThreshold
					// @ts-ignore
					onSubmit={handleSendDeviationThreshold}
					// @ts-ignore
					isLoading={isSetDeviationThresholdResponseRunning}
					isAccountReady={!!account}
				/>
				<SetLiquidationPoolTotalForm
					// @ts-ignore
					onSubmit={handleSetLiquidationPoolTotal}
					// @ts-ignore
					isLoading={isSetLiquidationPoolTotalRequestRunning}
					isAccountReady={!!account}
				/>
			</div>
			<div className={classes.b}>
				<SetLiquidationFee
					// @ts-ignore
					onSubmit={handleSetLiquidationFee}
					// @ts-ignore
					isLoading={isSetLiquidationFeeResponseRunning}
					isAccountReady={!!account}
				/>
				<SetThreshold
					// @ts-ignore
					onSubmit={handleSetThreshold}
					// @ts-ignore
					isLoading={isSetThresholdResponseRunning}
					isAccountReady={!!account}
				/>
				<SetLiquidationsMaxAttemptsForm
					// @ts-ignore
					onSubmit={handleSetLiquidationsMaxAttempts}
					// @ts-ignore
					isLoading={isSetLiquidationsMaxAttemptsResponseRunning}
					isAccountReady={!!account}
				/>
			</div>
			<div className={classes.c}>
				<SetMinPartialLiquidationSumForm
					// @ts-ignore
					onSubmit={handleSetMinPartialLiquidationSum}
					// @ts-ignore
					isLoading={isSetMinPartialLiquidationSumResponseRunning}
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
		</div>
	);
}
