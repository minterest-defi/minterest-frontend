import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
	resetLiquidationAdminUpdateRequests,
	setBalanceRatio,
	setDeviationThreshold,
	setThreshold,
	setLiquidationMaxAttempts,
	setLoanSizeLiquidationThreshold,
	setBalancingPeriod,
} from '../../actions/liquidationAdminUpdates';
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
import LiquidationPoolsConfigurationUpdates from '../../components/LiquidationPoolsConfigurationUpdates/LiquidationPoolsConfigurationUpdates';

function LiquidationAdmin(props: LiquidationAdminProps) {
	const {
		account,
		keyring,

		getLiquidationPoolsBalance,
		liquidationPoolsBalance,

		getLiquidationPoolParams,
		liquidationPoolsParams,

		getRiskManagerData,
		riskManagerData,

		getLiquidationBalancingPeriod,
		liquidationPoolBalancingPeriod,

		getPoolsBalance,
		poolsBalance,

		resetLiquidationAdminUpdateRequests,

		setLiquidationMaxAttempts,
		setLiquidationsMaxAttemptsResponse,
		isSetLiquidationsMaxAttemptsResponseRunning,

		setLoanSizeLiquidationThreshold,
		setLoanSizeLiquidationThresholdResponse,
		isSetLoanSizeLiquidationThresholdResponseRunning,

		setThreshold,
		isSetThresholdResponseRunning,
		setThresholdResponse,

		setBalancingPeriod,
		setBalancingPeriodResponse,
		isSetBalancingPeriodResponseRunning,

		isSetDeviationThresholdResponseRunning,
		setDeviationThresholdResponse,
		setDeviationThreshold,

		isSetBalanceRatioResponseRunning,
		setBalanceRatioResponse,
		setBalanceRatio,
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
		if (isSetThresholdResponseRunning || !setThresholdResponse) return;
		const { isError, errorMessage } = setThresholdResponse;
		if (isError) {
			handleError(errorMessage);
		} else {
			getRiskManagerData();
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
			getRiskManagerData();
			handleSuccess();
		}
	}, [
		setLiquidationsMaxAttemptsResponse,
		isSetLiquidationsMaxAttemptsResponseRunning,
	]);

	useEffect(() => {
		if (
			isSetLoanSizeLiquidationThresholdResponseRunning ||
			!setLoanSizeLiquidationThresholdResponse
		)
			return;
		const { isError, errorMessage } = setLoanSizeLiquidationThresholdResponse;
		if (isError) {
			handleError(errorMessage);
		} else {
			getRiskManagerData();
			handleSuccess();
		}
	}, [
		setLoanSizeLiquidationThresholdResponse,
		isSetLoanSizeLiquidationThresholdResponseRunning,
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
		getRiskManagerData();
		getLiquidationBalancingPeriod();
		getPoolsBalance();
	};

	return (
		<div className={classes.admin}>
			<div className={classes.admin_panel}>
				<div>
					<LiquidationPoolsConfigurationData
						liquidationPoolsBalance={liquidationPoolsBalance}
						liquidationPoolsParams={liquidationPoolsParams}
						riskManagerData={riskManagerData}
						liquidationPoolBalancingPeriod={liquidationPoolBalancingPeriod}
						poolsBalance={poolsBalance}
					/>
				</div>
				<div>
					<LiquidationPoolsConfigurationUpdates
						account={account}
						keyring={keyring}
						setBalanceRatio={setBalanceRatio}
						isSetBalanceRatioResponseRunning={isSetBalanceRatioResponseRunning}
						setDeviationThreshold={setDeviationThreshold}
						isSetDeviationThresholdResponseRunning={
							isSetDeviationThresholdResponseRunning
						}
						setThreshold={setThreshold}
						isSetThresholdResponseRunning={isSetThresholdResponseRunning}
						setLiquidationMaxAttempts={setLiquidationMaxAttempts}
						isSetLiquidationsMaxAttemptsResponseRunning={
							isSetLiquidationsMaxAttemptsResponseRunning
						}
						setLoanSizeLiquidationThreshold={setLoanSizeLiquidationThreshold}
						isSetLoanSizeLiquidationThresholdResponseRunning={
							isSetLoanSizeLiquidationThresholdResponseRunning
						}
						setBalancingPeriod={setBalancingPeriod}
						isSetBalancingPeriodResponseRunning={
							isSetBalancingPeriodResponseRunning
						}
					/>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state: State) => ({
	account: state.account.currentAccount,
	keyring: state.account.keyring,

	liquidationPoolsBalance: state.liquidationAdminData.liquidationPoolsBalance,
	liquidationPoolsParams: state.liquidationAdminData.liquidationPoolsParams,
	riskManagerData: state.liquidationAdminData.riskManagerData,
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

	setThresholdResponse: state.liquidationAdminUpdates.setThresholdResponse,
	isSetThresholdResponseRunning:
		state.liquidationAdminUpdates.isSetThresholdResponseRunning,

	setLiquidationsMaxAttemptsResponse:
		state.liquidationAdminUpdates.setLiquidationsMaxAttemptsResponse,
	isSetLiquidationsMaxAttemptsResponseRunning:
		state.liquidationAdminUpdates.isSetLiquidationsMaxAttemptsResponseRunning,

	isSetLoanSizeLiquidationThresholdResponseRunning:
		state.liquidationAdminUpdates
			.isSetLoanSizeLiquidationThresholdResponseRunning,
	setLoanSizeLiquidationThresholdResponse:
		state.liquidationAdminUpdates.setLoanSizeLiquidationThresholdResponse,

	setBalancingPeriodResponse:
		state.liquidationAdminUpdates.setBalancingPeriodResponse,
	isSetBalancingPeriodResponseRunning:
		state.liquidationAdminUpdates.isSetBalancingPeriodResponseRunning,
});

const mapDispatchToProps = {
	getLiquidationPoolsBalance,
	getLiquidationPoolParams,
	getRiskManagerData,
	getLiquidationBalancingPeriod,
	getPoolsBalance,

	resetLiquidationAdminUpdateRequests,

	setBalanceRatio,
	setDeviationThreshold,
	setThreshold,
	setLiquidationMaxAttempts,
	setLoanSizeLiquidationThreshold,
	setBalancingPeriod,
};

export default connect(mapStateToProps, mapDispatchToProps)(LiquidationAdmin);
