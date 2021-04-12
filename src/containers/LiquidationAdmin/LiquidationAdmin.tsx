import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
	resetLiquidationAdminUpdateRequests,
	setBalanceRatio,
	setDeviationThreshold,
	setLiquidationFee,
	setMaxIdealBalance,
	setThreshold,
	setLiquidationMaxAttempts,
	setMinPartialLiquidationSum,
	setBalancingPeriod,
	setLiquidationPoolTotal,
} from '../../actions/liquidationAdminUpdates';
import { getPoolsBalance } from '../../actions/dashboardData';
import { State } from '../../util/types';
import { useInterval } from '../../util';
import config from '../../config';
import { LiquidationAdminProps } from './LiquidationAdmin.types';
import {
	getLiquidationPoolsBalance,
	getLiquidationPoolParams,
	getRiskManagerParams,
	getLiquidationBalancingPeriod,
} from '../../actions/liquidationAdminData';
// @ts-ignore
import classes from './LiquidationAdmin.module.css';
import LiquidationPoolsConfigurationData from '../../components/LiquidationPoolsConfigurationData/LiquidationPoolsConfigurationData';
import LiquidationPoolsConfigurationUpdates from '../../components/LiquidationPoolsConfigurationUpdates/LiquidationPoolsConfigurationUpdates';

function LiquidationAdmin(props: LiquidationAdminProps) {
	const {
		account,
		keyring,

		getLiquidationPoolsBalance,
		liquidationPoolsBalance,

		getLiquidationPoolParams,
		liquidationPoolsParams,

		getRiskManagerParams,
		riskManagerParams,

		getLiquidationBalancingPeriod,
		liquidationPoolBalancingPeriod,

		getPoolsBalance,
		poolsBalance,

		resetLiquidationAdminUpdateRequests,

		setBalanceRatio,
		setBalanceRatioResponse,
		isSetBalanceRatioResponseRunning,

		setDeviationThreshold,
		setDeviationThresholdResponse,
		isSetDeviationThresholdResponseRunning,

		setLiquidationFee,
		setLiquidationFeeResponse,
		isSetLiquidationFeeResponseRunning,

		setMaxIdealBalance,
		setMaxIdealBalanceResponse,
		isSetMaxIdealBalanceResponseRunning,

		setThreshold,
		setThresholdResponse,
		isSetThresholdResponseRunning,

		setLiquidationMaxAttempts,
		setLiquidationsMaxAttemptsResponse,
		isSetLiquidationsMaxAttemptsResponseRunning,

		setMinPartialLiquidationSum,
		setMinPartialLiquidationSumResponse,
		isSetMinPartialLiquidationSumResponseRunning,

		setBalancingPeriod,
		setBalancingPeriodResponse,
		isSetBalancingPeriodResponseRunning,

		setLiquidationPoolTotalResponse,
		isSetLiquidationPoolTotalRequestRunning,
		setLiquidationPoolTotal,
	} = props;

	useEffect(() => {
		getLiquidationAdminData();
		return () => {
			resetLiquidationAdminUpdateRequests();
		};
	}, []);

	useEffect(() => {
		if (isSetBalanceRatioResponseRunning || !setBalanceRatioResponse) return;
		const { isError, errorMessage } = setBalanceRatioResponse;
		if (isError) {
			handleError(errorMessage);
		} else {
			getLiquidationPoolParams();
			handleSuccess();
		}
	}, [setBalanceRatioResponse, isSetBalanceRatioResponseRunning]);

	useEffect(() => {
		if (
			isSetDeviationThresholdResponseRunning ||
			!setDeviationThresholdResponse
		)
			return;
		const { isError, errorMessage } = setDeviationThresholdResponse;
		if (isError) {
			handleError(errorMessage);
		} else {
			getLiquidationPoolParams();
			handleSuccess();
		}
	}, [setDeviationThresholdResponse, isSetDeviationThresholdResponseRunning]);

	useEffect(() => {
		if (isSetLiquidationFeeResponseRunning || !setLiquidationFeeResponse)
			return;
		const { isError, errorMessage } = setLiquidationFeeResponse;
		if (isError) {
			handleError(errorMessage);
		} else {
			getRiskManagerParams();
			handleSuccess();
		}
	}, [setLiquidationFeeResponse, isSetLiquidationFeeResponseRunning]);

	useEffect(() => {
		if (isSetMaxIdealBalanceResponseRunning || !setMaxIdealBalanceResponse)
			return;
		const { isError, errorMessage } = setMaxIdealBalanceResponse;
		if (isError) {
			handleError(errorMessage);
		} else {
			getLiquidationPoolParams();
			handleSuccess();
		}
	}, [setMaxIdealBalanceResponse, isSetMaxIdealBalanceResponseRunning]);

	useEffect(() => {
		if (isSetThresholdResponseRunning || !setThresholdResponse) return;
		const { isError, errorMessage } = setThresholdResponse;
		if (isError) {
			handleError(errorMessage);
		} else {
			getRiskManagerParams();
			handleSuccess();
		}
	}, [setThresholdResponse, isSetThresholdResponseRunning]);

	useEffect(() => {
		if (
			isSetLiquidationsMaxAttemptsResponseRunning ||
			!setLiquidationsMaxAttemptsResponse
		)
			return;
		const { isError, errorMessage } = setLiquidationsMaxAttemptsResponse;
		if (isError) {
			handleError(errorMessage);
		} else {
			getRiskManagerParams();
			handleSuccess();
		}
	}, [
		setLiquidationsMaxAttemptsResponse,
		isSetLiquidationsMaxAttemptsResponseRunning,
	]);

	useEffect(() => {
		if (
			isSetMinPartialLiquidationSumResponseRunning ||
			!setMinPartialLiquidationSumResponse
		)
			return;
		const { isError, errorMessage } = setMinPartialLiquidationSumResponse;
		if (isError) {
			handleError(errorMessage);
		} else {
			getRiskManagerParams();
			handleSuccess();
		}
	}, [
		setMinPartialLiquidationSumResponse,
		isSetMinPartialLiquidationSumResponseRunning,
	]);

	useEffect(() => {
		if (
			isSetLiquidationPoolTotalRequestRunning ||
			!setLiquidationPoolTotalResponse
		)
			return;
		const { isError, errorMessage } = setLiquidationPoolTotalResponse;
		if (isError) {
			handleError(errorMessage);
		} else {
			getLiquidationPoolsBalance();
			handleSuccess();
		}
	}, [
		setLiquidationPoolTotalResponse,
		isSetLiquidationPoolTotalRequestRunning,
	]);

	const updateWatcher = () => {
		getLiquidationPoolsBalance();
	};
	useInterval(updateWatcher, config.POOL_PERIOD_SEC * 1000);

	useEffect(() => {
		if (isSetBalancingPeriodResponseRunning || !setBalancingPeriodResponse)
			return;

		const { isError, errorMessage } = setBalancingPeriodResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getLiquidationBalancingPeriod();
			handleSuccess();
		}
	}, [setBalancingPeriodResponse, isSetBalancingPeriodResponseRunning]);

	const handleError = (errorMessage: string) => alert(errorMessage);
	const handleSuccess = () => alert('Transaction completed successfully.');

	const getLiquidationAdminData = () => {
		getLiquidationPoolsBalance();
		getLiquidationPoolParams();
		getRiskManagerParams();
		getLiquidationBalancingPeriod();
		getPoolsBalance();
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.data}>
				<LiquidationPoolsConfigurationData
					liquidationPoolsBalance={liquidationPoolsBalance}
					liquidationPoolsParams={liquidationPoolsParams}
					riskManagerParams={riskManagerParams}
					liquidationPoolBalancingPeriod={liquidationPoolBalancingPeriod}
					poolsBalance={poolsBalance}
				/>
			</div>
			<div className={classes.updates}>
				<LiquidationPoolsConfigurationUpdates
					account={account}
					keyring={keyring}
					setBalanceRatio={setBalanceRatio}
					isSetBalanceRatioResponseRunning={isSetBalanceRatioResponseRunning}
					setDeviationThreshold={setDeviationThreshold}
					isSetDeviationThresholdResponseRunning={
						isSetDeviationThresholdResponseRunning
					}
					setLiquidationFee={setLiquidationFee}
					isSetLiquidationFeeResponseRunning={
						isSetLiquidationFeeResponseRunning
					}
					setMaxIdealBalance={setMaxIdealBalance}
					isSetMaxIdealBalanceResponseRunning={
						isSetMaxIdealBalanceResponseRunning
					}
					setThreshold={setThreshold}
					isSetThresholdResponseRunning={isSetThresholdResponseRunning}
					setLiquidationMaxAttempts={setLiquidationMaxAttempts}
					isSetLiquidationsMaxAttemptsResponseRunning={
						isSetLiquidationsMaxAttemptsResponseRunning
					}
					setMinPartialLiquidationSum={setMinPartialLiquidationSum}
					isSetMinPartialLiquidationSumResponseRunning={
						isSetMinPartialLiquidationSumResponseRunning
					}
					setBalancingPeriod={setBalancingPeriod}
					isSetBalancingPeriodResponseRunning={
						isSetBalancingPeriodResponseRunning
					}
					setLiquidationPoolTotal={setLiquidationPoolTotal}
					isSetLiquidationPoolTotalRequestRunning={
						isSetLiquidationPoolTotalRequestRunning
					}
				/>
			</div>
		</div>
	);
}

const mapStateToProps = (state: State) => ({
	account: state.account.currentAccount,
	keyring: state.account.keyring,

	liquidationPoolsBalance: state.liquidationAdminData.liquidationPoolsBalance,
	liquidationPoolsParams: state.liquidationAdminData.liquidationPoolsParams,
	riskManagerParams: state.liquidationAdminData.riskManagerParams,
	liquidationPoolBalancingPeriod:
		state.liquidationAdminData.liquidationPoolBalancingPeriod,
	poolsBalance: state.dashboardData.poolsBalance,

	isSetBalanceRatioResponseRunning:
		state.liquidationAdminUpdates.isSetBalanceRatioResponseRunning,
	setBalanceRatioResponse:
		state.liquidationAdminUpdates.setBalanceRatioResponse,

	isSetDeviationThresholdResponseRunning:
		state.liquidationAdminUpdates.isSetDeviationThresholdResponseRunning,
	setDeviationThresholdResponse:
		state.liquidationAdminUpdates.setDeviationThresholdResponse,

	setLiquidationFeeResponse:
		state.liquidationAdminUpdates.setLiquidationFeeResponse,
	isSetLiquidationFeeResponseRunning:
		state.liquidationAdminUpdates.isSetLiquidationFeeResponseRunning,

	setMaxIdealBalanceResponse:
		state.liquidationAdminUpdates.setMaxIdealBalanceResponse,
	isSetMaxIdealBalanceResponseRunning:
		state.liquidationAdminUpdates.isSetMaxIdealBalanceResponseRunning,

	setThresholdResponse: state.liquidationAdminUpdates.setThresholdResponse,
	isSetThresholdResponseRunning:
		state.liquidationAdminUpdates.isSetThresholdResponseRunning,

	setLiquidationsMaxAttemptsResponse:
		state.liquidationAdminUpdates.setLiquidationsMaxAttemptsResponse,
	isSetLiquidationsMaxAttemptsResponseRunning:
		state.liquidationAdminUpdates.isSetLiquidationsMaxAttemptsResponseRunning,

	isSetMinPartialLiquidationSumResponseRunning:
		state.liquidationAdminUpdates.isSetMinPartialLiquidationSumResponseRunning,
	setMinPartialLiquidationSumResponse:
		state.liquidationAdminUpdates.setMinPartialLiquidationSumResponse,

	setBalancingPeriodResponse:
		state.liquidationAdminUpdates.setBalancingPeriodResponse,
	isSetBalancingPeriodResponseRunning:
		state.liquidationAdminUpdates.isSetBalancingPeriodResponseRunning,

	setLiquidationPoolTotalResponse:
		state.liquidationAdminUpdates.setLiquidationPoolTotalResponse,
	isSetLiquidationPoolTotalRequestRunning:
		state.liquidationAdminUpdates.isSetLiquidationPoolTotalRequestRunning,
});

const mapDispatchToProps = {
	getLiquidationPoolsBalance,
	getLiquidationPoolParams,
	getRiskManagerParams,
	getLiquidationBalancingPeriod,
	getPoolsBalance,

	resetLiquidationAdminUpdateRequests,

	setBalanceRatio,
	setDeviationThreshold,
	setLiquidationFee,
	setMaxIdealBalance,
	setThreshold,
	setLiquidationMaxAttempts,
	setMinPartialLiquidationSum,
	setBalancingPeriod,
	setLiquidationPoolTotal,
};

export default connect(mapStateToProps, mapDispatchToProps)(LiquidationAdmin);
