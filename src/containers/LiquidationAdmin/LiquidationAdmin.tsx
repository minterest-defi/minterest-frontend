import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// import EconomicUpdateControls from '../../components/EconomicUpdateControls/EconomicUpdateControls';
// import SetLiquidationsMaxAttempts from '../../components/SetLiquidationsMaxAttempts/SetLiquidationsMaxAttempts';
// import CollateralBlock from '../../components/CollateralBlock/CollateralBlock';
// import EconomicParameters from '../../components/EconomicParameters/EconomicParameters';
// import SetLoanSizeLiquidationThreshold from '../../components/SetLoanSizeLiquidationThreshold/SetLoanSizeLiquidationThreshold';
import {
	resetEconomicUpdateRequests,
	setDeviationThreshold,
	setBalanceRatio,
	setBalancingPeriod,
	setThreshold,
	setLiquidationMaxAttempts,
	setLoanSizeLiquidationThreshold,
} from '../../actions/economicUpdates';
import { getPoolsBalance } from '../../actions/dashboardData';
import { State } from '../../util/types';
import { useInterval } from '../../util';
import config from '../../config';
import { LiquidationAdminProps } from './LiquidationAdmin.types';
import {
	getLiquidationPoolsBalance,
	getLiquidationPoolParams,
	getRiskManagerData,
	getLiquidationBalancingPeriod,
} from '../../actions/liquidationAdminData';
// @ts-ignore
import classes from './LiquidationAdmin.module.css';
import LiquidationPoolsConfigurationData from '../../components/LiquidationPoolsConfigurationData/LiquidationPoolsConfigurationData';

function LiquidationAdmin(props: LiquidationAdminProps) {
	const {
		account,
		keyring,

		getLiquidationPoolsBalance,
		getLiquidationPoolParams,
		getRiskManagerData,
		getLiquidationBalancingPeriod,
		getPoolsBalance,

		liquidationPoolsBalance,
		liquidationPoolsParams,
		riskManagerData,
		liquidationPoolBalancingPeriod,
		poolsBalance,

		//resetEconomicUpdateRequests,

		//setLiquidationMaxAttempts,
		// setLiquidationsMaxAttemptsResponse,
		// isSetLiquidationsMaxAttemptsResponseRunning,

		//setThreshold,
		//setLoanSizeLiquidationThreshold,

		// setLoanSizeLiquidationThresholdResponse,
		// isSetLoanSizeLiquidationThresholdResponseRunning,

		// isSetThresholdResponseRunning,
		// setThresholdResponse,

		//setBalancingPeriod,
		// setBalancingPeriodResponse,
		// isSetBalancingPeriodResponseRunning,

		// isSetDeviationThresholdResponseRunning,
		// setDeviationThresholdResponse,
		//setDeviationThreshold,

		// isSetBalanceRatioResponseRunning,
		// setBalanceRatioResponse,
		//setBalanceRatio,
	} = props;

	useEffect(() => {
		getLiquidationAdminData();

		return () => {
			resetEconomicUpdateRequests();
		};
	}, []);

	const updateWatcher = () => {
		getLiquidationPoolsBalance();
	};

	useInterval(updateWatcher, config.POOL_PERIOD_SEC * 1000);

	// useEffect(() => {
	// 	if (isSetBalancingPeriodResponseRunning || !setBalancingPeriodResponse)
	// 		return;

	// 	const { isError, errorMessage } = setBalancingPeriodResponse;

	// 	if (isError) {
	// 		handleError(errorMessage);
	// 	} else {
	// 		getLiquidationBalancingPeriod();
	// 		handleSuccess();
	// 	}
	// }, [setBalancingPeriodResponse, isSetBalancingPeriodResponseRunning]);

	// useEffect(() => {
	// 	if (isSetThresholdResponseRunning || !setThresholdResponse) return;

	// 	const { isError, errorMessage } = setThresholdResponse;

	// 	if (isError) {
	// 		handleError(errorMessage);
	// 	} else {
	// 		getRiskManagerData();
	// 		handleSuccess();
	// 	}
	// }, [setThresholdResponse, isSetThresholdResponseRunning]);

	// useEffect(() => {
	// 	if (
	// 		isSetLiquidationsMaxAttemptsResponseRunning ||
	// 		!setLiquidationsMaxAttemptsResponse
	// 	)
	// 		return;

	// 	const { isError, errorMessage } = setLiquidationsMaxAttemptsResponse;

	// 	if (isError) {
	// 		handleError(errorMessage);
	// 	} else {
	// 		getRiskManagerData();
	// 		handleSuccess();
	// 	}
	// }, [
	// 	setLiquidationsMaxAttemptsResponse,
	// 	isSetLiquidationsMaxAttemptsResponseRunning,
	// ]);

	// useEffect(() => {
	// 	if (
	// 		isSetLoanSizeLiquidationThresholdResponseRunning ||
	// 		!setLoanSizeLiquidationThresholdResponse
	// 	)
	// 		return;

	// 	const { isError, errorMessage } = setLoanSizeLiquidationThresholdResponse;

	// 	if (isError) {
	// 		handleError(errorMessage);
	// 	} else {
	// 		getRiskManagerData();
	// 		handleSuccess();
	// 	}
	// }, [
	// 	setLoanSizeLiquidationThresholdResponse,
	// 	isSetLoanSizeLiquidationThresholdResponseRunning,
	// ]);

	// useEffect(() => {
	// 	if (
	// 		isSetDeviationThresholdResponseRunning ||
	// 		!setDeviationThresholdResponse
	// 	)
	// 		return;

	// 	const { isError, errorMessage } = setDeviationThresholdResponse;

	// 	if (isError) {
	// 		handleError(errorMessage);
	// 	} else {
	// 		getLiquidationPoolParams();
	// 		handleSuccess();
	// 	}
	// }, [setDeviationThresholdResponse, isSetDeviationThresholdResponseRunning]);

	// useEffect(() => {
	// 	if (isSetBalanceRatioResponseRunning || !setBalanceRatioResponse) return;

	// 	const { isError, errorMessage } = setBalanceRatioResponse;

	// 	if (isError) {
	// 		handleError(errorMessage);
	// 	} else {
	// 		getLiquidationPoolParams();
	// 		handleSuccess();
	// 	}
	// }, [setBalanceRatioResponse, isSetBalanceRatioResponseRunning]);

	// const handleError = (errorMessage: string) => alert(errorMessage);
	// const handleSuccess = () => alert('Transaction completed successfully.');

	const getLiquidationAdminData = () => {
		getLiquidationPoolsBalance();
		getLiquidationPoolParams();
		getRiskManagerData();
		getLiquidationBalancingPeriod();
		getPoolsBalance();
	};

	return (
		<div className={classes.admin}>
			<div className={classes.admin_panel}>
				<div>
					{/* @ts-ignore*/}
					<LiquidationPoolsConfigurationData
						liquidationPoolsBalance={liquidationPoolsBalance}
						liquidationPoolsParams={liquidationPoolsParams}
						riskManagerData={riskManagerData}
						liquidationPoolBalancingPeriod={liquidationPoolBalancingPeriod}
						poolsBalance={poolsBalance}
					/>
				</div>
				{/*
				<EconomicUpdateControls
					account={account}
					keyring={keyring}
					setBalancingPeriod={setBalancingPeriod}
					isSetBalancingPeriodResponseRunning={
						isSetBalancingPeriodResponseRunning
					}
					setDeviationThreshold={setDeviationThreshold}
					setBalanceRatio={setBalanceRatio}

					isSetDeviationThresholdResponseRunning={
						isSetDeviationThresholdResponseRunning
					}
					isSetBalanceRatioResponseRunning={isSetBalanceRatioResponseRunning}
				/>
				<SetLoanSizeLiquidationThreshold
					account={account}
					keyring={keyring}
					setLoanSizeLiquidationThreshold={setLoanSizeLiquidationThreshold}
					isSetLoanSizeLiquidationThresholdResponseRunning={
						isSetLoanSizeLiquidationThresholdResponseRunning
					}
				/>
				<CollateralBlock
					account={account}
					keyring={keyring}
					setThreshold={setThreshold}
					isSetThresholdResponseRunning={isSetThresholdResponseRunning}
				/>
				<SetLiquidationsMaxAttempts
					account={account}
					keyring={keyring}
					setLiquidationMaxAttempts={setLiquidationMaxAttempts}
					isSetLiquidationsMaxAttemptsResponseRunning={
						isSetLiquidationsMaxAttemptsResponseRunning
					}
				/> */}
			</div>
		</div>
	);
}

const mapStateToProps = (state: State) => ({
	account: state.account.currentAccount,
	keyring: state.account.keyring,

	liquidationPoolBalancingPeriod:
		state.liquidationAdminData.liquidationPoolBalancingPeriod,
	liquidationPoolsParams: state.liquidationAdminData.liquidationPoolsParams,
	riskManagerData: state.liquidationAdminData.riskManagerData,
	liquidationPoolsBalance: state.liquidationAdminData.liquidationPoolsBalance,
	poolsBalance: state.dashboardData.poolsBalance,

	setThresholdResponse: state.economicUpdates.setThresholdResponse,
	isSetThresholdResponseRunning:
		state.economicUpdates.isSetThresholdResponseRunning,

	setLiquidationsMaxAttemptsResponse:
		state.economicUpdates.setLiquidationsMaxAttemptsResponse,
	isSetLiquidationsMaxAttemptsResponseRunning:
		state.economicUpdates.isSetLiquidationsMaxAttemptsResponseRunning,

	isSetLoanSizeLiquidationThresholdResponseRunning:
		state.economicUpdates.isSetLoanSizeLiquidationThresholdResponseRunning,
	setLoanSizeLiquidationThresholdResponse:
		state.economicUpdates.setLoanSizeLiquidationThresholdResponse,

	isSetDeviationThresholdResponseRunning:
		state.economicUpdates.isSetDeviationThresholdResponseRunning,
	setDeviationThresholdResponse:
		state.economicUpdates.setDeviationThresholdResponse,

	isSetBalanceRatioResponseRunning:
		state.economicUpdates.isSetBalanceRatioResponseRunning,
	setBalanceRatioResponse: state.economicUpdates.setBalanceRatioResponse,

	setBalancingPeriodResponse: state.economicUpdates.setBalancingPeriodResponse,
	isSetBalancingPeriodResponseRunning:
		state.economicUpdates.isSetBalancingPeriodResponseRunning,
});

const mapDispatchToProps = {
	getLiquidationPoolsBalance,
	getLiquidationPoolParams,
	getRiskManagerData,
	getLiquidationBalancingPeriod,
	getPoolsBalance,

	resetEconomicUpdateRequests,
	setLiquidationMaxAttempts,
	setThreshold,
	setLoanSizeLiquidationThreshold,
	setDeviationThreshold,
	setBalanceRatio,
	setBalancingPeriod,
};

export default connect(mapStateToProps, mapDispatchToProps)(LiquidationAdmin);
