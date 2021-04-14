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
import { useInterval, useAPIResponse } from '../../util';
import config from '../../config';
import { LiquidationAdminProps } from './LiquidationAdmin.types';
import {
	getLiquidationPoolsBalance,
	getLiquidationPoolParams,
	getRiskManagerParams,
	getLiquidationBalancingPeriod,
} from '../../actions/liquidationAdminData';
import classes from './LiquidationAdmin.module.scss';
import LiquidationPoolsConfigurationData from '../../components/LiquidationPoolsConfigurationData/LiquidationPoolsConfigurationData';
import LiquidationPoolsConfigurationUpdates from '../../components/LiquidationPoolsConfigurationUpdates/LiquidationPoolsConfigurationUpdates';

function LiquidationAdmin(props: LiquidationAdminProps) {
	const {
		account,
		keyring,
		currenciesOptions,
		currencies,

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

	const handleError = (errorMessage: string) => alert(errorMessage);
	const handleSuccess = () => alert('Transaction completed successfully.');

	const onSuccessLiquidationPoolParams = () => {
		getLiquidationPoolParams();
		handleSuccess();
	};

	const onSuccessLiquidationPoolsBalance = () => {
		getLiquidationPoolsBalance();
		handleSuccess();
	};

	const onSuccessRiskManagerParams = () => {
		getRiskManagerParams();
		handleSuccess();
	};

	const onSuccessLiquidationBalancingPeriod = () => {
		getLiquidationBalancingPeriod();
		handleSuccess();
	};

	useAPIResponse(
		[isSetBalanceRatioResponseRunning, setBalanceRatioResponse],
		onSuccessLiquidationPoolParams,
		handleError
	);

	useAPIResponse(
		[isSetDeviationThresholdResponseRunning, setDeviationThresholdResponse],
		onSuccessLiquidationPoolParams,
		handleError
	);

	useAPIResponse(
		[isSetLiquidationFeeResponseRunning, setLiquidationFeeResponse],
		onSuccessRiskManagerParams,
		handleError
	);

	useAPIResponse(
		[isSetMaxIdealBalanceResponseRunning, setMaxIdealBalanceResponse],
		onSuccessLiquidationPoolParams,
		handleError
	);

	useAPIResponse(
		[isSetThresholdResponseRunning, setThresholdResponse],
		onSuccessRiskManagerParams,
		handleError
	);

	useAPIResponse(
		[
			isSetLiquidationsMaxAttemptsResponseRunning,
			setLiquidationsMaxAttemptsResponse,
		],
		onSuccessRiskManagerParams,
		handleError
	);

	useAPIResponse(
		[
			isSetMinPartialLiquidationSumResponseRunning,
			setMinPartialLiquidationSumResponse,
		],
		onSuccessRiskManagerParams,
		handleError
	);

	useAPIResponse(
		[
			isSetMinPartialLiquidationSumResponseRunning,
			setMinPartialLiquidationSumResponse,
		],
		onSuccessRiskManagerParams,
		handleError
	);

	useAPIResponse(
		[isSetLiquidationPoolTotalRequestRunning, setLiquidationPoolTotalResponse],
		onSuccessLiquidationPoolsBalance,
		handleError
	);

	const updateWatcher = () => {
		getLiquidationPoolsBalance();
	};
	useInterval(updateWatcher, config.POOL_PERIOD_SEC * 1000);

	useAPIResponse(
		[isSetBalancingPeriodResponseRunning, setBalancingPeriodResponse],
		onSuccessLiquidationBalancingPeriod,
		handleError
	);

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
					currencies={currencies}
				/>
			</div>
			<div className={classes.updates}>
				<LiquidationPoolsConfigurationUpdates
					account={account}
					keyring={keyring}
					currenciesOptions={currenciesOptions}
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
	currencies: state.protocolData.currencies,
	currenciesOptions: state.protocolData.currenciesOptions,

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
