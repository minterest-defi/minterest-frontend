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
	setLiquidationPoolTotal,
	transferToLiquidationPool,
} from '../../actions/liquidationAdminUpdates';
import { getPoolsBalance } from '../../actions/dashboardData';
import { State } from '../../util/types';
import { MESSAGE_SUCCESS } from '../../util/constants';
import { useInterval, useAPIResponse } from '../../util';
import config from '../../config';
import { LiquidationAdminProps } from './LiquidationAdmin.types';
import {
	getLiquidationPoolsBalance,
	getLiquidationPoolParams,
	getRiskManagerParams,
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

		setLiquidationPoolTotalResponse,
		isSetLiquidationPoolTotalRequestRunning,
		setLiquidationPoolTotal,

		transferToLiquidationPoolResponse,
		isTransferToLiquidationPoolRequestRunning,
		transferToLiquidationPool,
	} = props;

	useEffect(() => {
		getLiquidationAdminData();
		return () => {
			resetLiquidationAdminUpdateRequests();
		};
	}, []);

	const showMessage = (message: string = MESSAGE_SUCCESS) => {
		alert(message);
	};

	const onSuccessLiquidationPoolParams = () => {
		getLiquidationPoolParams();
		showMessage();
	};

	const onSuccessLiquidationPoolsBalance = () => {
		getLiquidationPoolsBalance();
		showMessage();
	};

	const onSuccessRiskManagerParams = () => {
		getRiskManagerParams();
		showMessage();
	};

	useAPIResponse(
		[isSetBalanceRatioResponseRunning, setBalanceRatioResponse],
		onSuccessLiquidationPoolParams,
		showMessage
	);

	useAPIResponse(
		[isSetDeviationThresholdResponseRunning, setDeviationThresholdResponse],
		onSuccessLiquidationPoolParams,
		showMessage
	);

	useAPIResponse(
		[isSetLiquidationFeeResponseRunning, setLiquidationFeeResponse],
		onSuccessRiskManagerParams,
		showMessage
	);

	useAPIResponse(
		[isSetMaxIdealBalanceResponseRunning, setMaxIdealBalanceResponse],
		onSuccessLiquidationPoolParams,
		showMessage
	);

	useAPIResponse(
		[isSetThresholdResponseRunning, setThresholdResponse],
		onSuccessRiskManagerParams,
		showMessage
	);

	useAPIResponse(
		[
			isSetLiquidationsMaxAttemptsResponseRunning,
			setLiquidationsMaxAttemptsResponse,
		],
		onSuccessRiskManagerParams,
		showMessage
	);

	useAPIResponse(
		[
			isSetMinPartialLiquidationSumResponseRunning,
			setMinPartialLiquidationSumResponse,
		],
		onSuccessRiskManagerParams,
		showMessage
	);

	useAPIResponse(
		[
			isSetMinPartialLiquidationSumResponseRunning,
			setMinPartialLiquidationSumResponse,
		],
		onSuccessRiskManagerParams,
		showMessage
	);

	useAPIResponse(
		[isSetLiquidationPoolTotalRequestRunning, setLiquidationPoolTotalResponse],
		onSuccessLiquidationPoolsBalance,
		showMessage
	);

	useAPIResponse(
		[
			isTransferToLiquidationPoolRequestRunning,
			transferToLiquidationPoolResponse,
		],
		onSuccessLiquidationPoolsBalance,
		showMessage
	);

	const updateWatcher = () => {
		getLiquidationPoolsBalance();
	};
	useInterval(updateWatcher, config.POOL_PERIOD_SEC * 1000);

	const getLiquidationAdminData = () => {
		getLiquidationPoolsBalance();
		getLiquidationPoolParams();
		getRiskManagerParams();
		getPoolsBalance();
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.data}>
				<LiquidationPoolsConfigurationData
					liquidationPoolsBalance={liquidationPoolsBalance}
					liquidationPoolsParams={liquidationPoolsParams}
					riskManagerParams={riskManagerParams}
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
					setLiquidationPoolTotal={setLiquidationPoolTotal}
					isSetLiquidationPoolTotalRequestRunning={
						isSetLiquidationPoolTotalRequestRunning
					}
					transferToLiquidationPool={transferToLiquidationPool}
					isTransferToLiquidationPoolRequestRunning={
						isTransferToLiquidationPoolRequestRunning
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

	setLiquidationPoolTotalResponse:
		state.liquidationAdminUpdates.setLiquidationPoolTotalResponse,
	isSetLiquidationPoolTotalRequestRunning:
		state.liquidationAdminUpdates.isSetLiquidationPoolTotalRequestRunning,

	transferToLiquidationPoolResponse:
		state.liquidationAdminUpdates.transferToLiquidationPoolResponse,
	isTransferToLiquidationPoolRequestRunning:
		state.liquidationAdminUpdates.isTransferToLiquidationPoolRequestRunning,
});

const mapDispatchToProps = {
	getLiquidationPoolsBalance,
	getLiquidationPoolParams,
	getRiskManagerParams,
	getPoolsBalance,

	resetLiquidationAdminUpdateRequests,

	setBalanceRatio,
	setDeviationThreshold,
	setLiquidationFee,
	setMaxIdealBalance,
	setThreshold,
	setLiquidationMaxAttempts,
	setMinPartialLiquidationSum,
	setLiquidationPoolTotal,
	transferToLiquidationPool,
};

export default connect(mapStateToProps, mapDispatchToProps)(LiquidationAdmin);
