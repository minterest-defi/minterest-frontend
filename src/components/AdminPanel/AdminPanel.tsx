import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PoolOperationsStatuses from './PoolOperationsStatuses/PoolOperationsStatuses';
import PoolOperationsSwitch from './PoolOperationsSwitch/PoolOperationsSwitch';
import EconomicUpdateControls from './EconomicUpdateControls/EconomicUpdateControls';
import InsuranceFactor from './InsuranceFactor/InsuranceFactor';
import SetLiquidationsMaxAttempts from './SetLiquidationsMaxAttempts/SetLiquidationsMaxAttempts';
import CollateralBlock from './CollateralBlock/CollateralBlock';
import EconomicParameters from './EconomicParameters/EconomicParameters';
import SetLoanSizeLiquidationThreshold from './SetLoanSizeLiquidationThreshold/SetLoanSizeLiquidationThreshold';
import {
	setBaseRatePerYear,
	setJumpMultiplierPerYear,
	setKink,
	setMultiplierPerYear,
	resetEconomicUpdateRequests,
	getMinterestModel,
	feedValues,
	lockPrice,
	unlockPrice,
	getLockedPrices,
	getLiquidationPoolsBalance,
	getLiquidationBalancingPeriod,
	setDeviationThreshold,
	setBalanceRatio,
	setBalancingPeriod,
	getLiquidationPoolParams,
	setBorrowCap,
} from '../../actions/economicUpdates';
import { getPoolsBalance } from '../../actions/dashboardData';
import { State } from '../../util/types';
import { useInterval } from '../../util';
import config from '../../config';
import { AdminPanelProps } from './AdminPanel.types';
import {
	setInsuranceFactor,
	setCollateralFactor,
	setThreshold,
	resetAdminRequests,
	setLiquidationMaxAttempts,
	getControllerData,
	getRiskManagerData,
	setLoanSizeLiquidationThreshold,
	getWhitelistMode,
	switchMode,
	getPauseKeepers,
	pauseSpecificOperation,
	unpauseSpecificOperation,
} from '../../actions/admin';
// @ts-ignore
import classes from './AdminPanel.module.css';
import ProtocolOperationMode from './ProtocolOperationMode/ProtocolOperationMode';

function AdminPanel(props: AdminPanelProps) {
	const {
		account,
		keyring,

		getMinterestModel,
		getControllerData,
		getRiskManagerData,
		getLockedPrices,
		getLiquidationPoolsBalance,
		getLiquidationBalancingPeriod,
		getWhitelistMode,
		getPauseKeepers,

		minterestModelData,
		controllerData,
		riskManagerData,
		lockedPricesData,
		liquidationPoolsBalance,
		liquidationPoolBalancingPeriod,
		whitelistMode,
		pauseKeepers,

		resetEconomicUpdateRequests,
		resetAdminRequests,

		setKink,
		setKinkResponse,
		isSetKinkResponseRunning,

		setBaseRatePerYear,
		setBaseRateYearResponse,
		isSetBaseRateYearResponseRunning,

		setJumpMultiplierPerYear,
		setJumpMultiplierYearResponse,
		isSetJumpMultiplierYearResponseRunning,

		setMultiplierPerYear,
		setMultiplierPerYearResponse,
		isSetMultiplierPerYearResponseRunning,

		setInsuranceFactor,
		setInsuranceFactorResponse,
		isSetInsuranceFactorResponseRunning,

		setLiquidationMaxAttempts,
		setLiquidationsMaxAttemptsResponse,
		isSetLiquidationsMaxAttemptsResponseRunning,

		setCollateralFactor,
		setThreshold,
		setLoanSizeLiquidationThreshold,

		setLoanSizeLiquidationThresholdResponse,
		isSetLoanSizeLiquidationThresholdResponseRunning,

		isSetThresholdResponseRunning,
		setThresholdResponse,
		isSetCollateralFactorResponseRunning,
		setCollateralFactorResponse,

		isFeedValuesResponseRunning,
		feedValuesResponse,
		feedValues,

		isLockPriceResponseRunning,
		lockPriceResponse,
		lockPrice,

		isUnlockPriceResponseRunning,
		unlockPriceResponse,
		unlockPrice,

		getLiquidationPoolParams,
		setBalancingPeriod,
		setBalancingPeriodResponse,
		isSetBalancingPeriodResponseRunning,

		poolsBalance,
		getPoolsBalance,

		isSetDeviationThresholdResponseRunning,
		setDeviationThresholdResponse,
		setDeviationThreshold,

		isSetBalanceRatioResponseRunning,
		setBalanceRatioResponse,
		setBalanceRatio,

		isSwitchModeResponseRunning,
		switchModeResponse,
		switchMode,

		isSetBorrowCapResponseRunning,
		setBorrowCapResponse,
		setBorrowCap,

		isPauseSpecificOperationResponseRunning,
		pauseSpecificOperationResponse,
		pauseSpecificOperation,

		isUnpauseSpecificOperationResponseRunning,
		unpauseSpecificOperationResponse,
		unpauseSpecificOperation,
		liquidationPoolsParams,
	} = props;

	useEffect(() => {
		getEconomicParameters();

		return () => {
			resetEconomicUpdateRequests();
			resetAdminRequests();
		};
	}, []);

	const updateWatcher = () => {
		getLiquidationPoolsBalance();
	};

	useInterval(updateWatcher, config.POOL_PERIOD_SEC * 1000);

	useEffect(() => {
		if (isUnlockPriceResponseRunning || !unlockPriceResponse) return;

		const { isError, errorMessage } = unlockPriceResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getLockedPrices();
			handleSuccess();
		}
	}, [unlockPriceResponse, isUnlockPriceResponseRunning]);

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

	useEffect(() => {
		if (isLockPriceResponseRunning || !lockPriceResponse) return;

		const { isError, errorMessage } = lockPriceResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getLockedPrices();
			handleSuccess();
		}
	}, [lockPriceResponse, isLockPriceResponseRunning]);

	useEffect(() => {
		if (isFeedValuesResponseRunning || !feedValuesResponse) return;

		const { isError, errorMessage } = feedValuesResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			handleSuccess();
		}
	}, [feedValuesResponse, isFeedValuesResponseRunning]);

	useEffect(() => {
		if (isSetBaseRateYearResponseRunning || !setBaseRateYearResponse) return;

		const { isError, errorMessage } = setBaseRateYearResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getMinterestModel();
			handleSuccess();
		}
	}, [setBaseRateYearResponse, isSetBaseRateYearResponseRunning]);

	useEffect(() => {
		if (
			isSetJumpMultiplierYearResponseRunning ||
			!setJumpMultiplierYearResponse
		)
			return;

		const { isError, errorMessage } = setJumpMultiplierYearResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getMinterestModel();
			handleSuccess();
		}
	}, [setJumpMultiplierYearResponse, isSetJumpMultiplierYearResponseRunning]);

	useEffect(() => {
		if (isSetMultiplierPerYearResponseRunning || !setMultiplierPerYearResponse)
			return;

		const { isError, errorMessage } = setMultiplierPerYearResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getMinterestModel();
			handleSuccess();
		}
	}, [setMultiplierPerYearResponse, isSetMultiplierPerYearResponseRunning]);

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
		if (isSetCollateralFactorResponseRunning || !setCollateralFactorResponse)
			return;

		const { isError, errorMessage } = setCollateralFactorResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getControllerData();
			handleSuccess();
		}
	}, [setCollateralFactorResponse, isSetCollateralFactorResponseRunning]);

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
		if (isSetKinkResponseRunning || !setKinkResponse) return;

		const { isError, errorMessage } = setKinkResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getMinterestModel();
			handleSuccess();
		}
	}, [setKinkResponse, isSetKinkResponseRunning]);

	useEffect(() => {
		if (isSetInsuranceFactorResponseRunning || !setInsuranceFactorResponse)
			return;

		const { isError, errorMessage } = setInsuranceFactorResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getControllerData();
			handleSuccess();
		}
	}, [setInsuranceFactorResponse, isSetInsuranceFactorResponseRunning]);

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
		if (isSwitchModeResponseRunning || !switchModeResponse) return;

		const { isError, errorMessage } = switchModeResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getWhitelistMode();
			handleSuccess();
		}
	}, [switchModeResponse, isSwitchModeResponseRunning]);

	useEffect(() => {
		if (isSetBorrowCapResponseRunning || !setBorrowCapResponse) return;

		const { isError, errorMessage } = setBorrowCapResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getControllerData();
			handleSuccess();
		}
	}, [setBorrowCapResponse, isSetBorrowCapResponseRunning]);

	useEffect(() => {
		if (
			isPauseSpecificOperationResponseRunning ||
			!pauseSpecificOperationResponse
		)
			return;

		const { isError, errorMessage } = pauseSpecificOperationResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getPauseKeepers();
			handleSuccess();
		}
	}, [pauseSpecificOperationResponse, isPauseSpecificOperationResponseRunning]);

	useEffect(() => {
		if (
			isUnpauseSpecificOperationResponseRunning ||
			!unpauseSpecificOperationResponse
		)
			return;

		const { isError, errorMessage } = unpauseSpecificOperationResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getPauseKeepers();
			handleSuccess();
		}
	}, [
		unpauseSpecificOperationResponse,
		isUnpauseSpecificOperationResponseRunning,
	]);

	const handleError = (errorMessage: string) => alert(errorMessage);
	const handleSuccess = () => alert('Transaction completed successfully.');

	const getEconomicParameters = () => {
		getControllerData();
		getMinterestModel();
		getRiskManagerData();
		getLiquidationPoolParams();
		getLockedPrices();
		getLiquidationPoolsBalance();
		getLiquidationBalancingPeriod();
		getWhitelistMode();
		getPauseKeepers();
		getPoolsBalance();
	};

	return (
		<div className={classes.admin}>
			<h2>Admin panel</h2>
			<div className={classes.admin_panel}>
				<div className={classes.switch}>
					<PoolOperationsSwitch
						account={account}
						keyring={keyring}
						pauseSpecificOperation={pauseSpecificOperation}
						isPauseSpecificOperationResponseRunning={
							isPauseSpecificOperationResponseRunning
						}
						unpauseSpecificOperation={unpauseSpecificOperation}
						isUnpauseSpecificOperationResponseRunning={
							isUnpauseSpecificOperationResponseRunning
						}
					/>
					<PoolOperationsStatuses pauseKeepers={pauseKeepers} />
				</div>
				<div className={classes.fildset}>
					<ProtocolOperationMode
						account={account}
						keyring={keyring}
						whitelistMode={whitelistMode}
						switchMode={switchMode}
						isSwitchModeResponseRunning={isSwitchModeResponseRunning}
					/>
				</div>
				<EconomicParameters
					minterestModelData={minterestModelData}
					controllerData={controllerData}
					riskManagerData={riskManagerData}
					lockedPricesData={lockedPricesData}
					liquidationPoolsBalance={liquidationPoolsBalance}
					liquidationPoolBalancingPeriod={liquidationPoolBalancingPeriod}
					poolsBalance={poolsBalance}
					liquidationPoolsParams={liquidationPoolsParams}
				/>
				<EconomicUpdateControls
					account={account}
					keyring={keyring}
					setBalancingPeriod={setBalancingPeriod}
					isSetBalancingPeriodResponseRunning={
						isSetBalancingPeriodResponseRunning
					}
					setBaseRatePerYear={setBaseRatePerYear}
					setJumpMultiplierPerYear={setJumpMultiplierPerYear}
					setKink={setKink}
					setMultiplierPerYear={setMultiplierPerYear}
					feedValues={feedValues}
					lockPrice={lockPrice}
					unlockPrice={unlockPrice}
					setDeviationThreshold={setDeviationThreshold}
					setBalanceRatio={setBalanceRatio}
					setBorrowCap={setBorrowCap}
					isSetBaseRateYearResponseRunning={isSetBaseRateYearResponseRunning}
					isSetJumpMultiplierYearResponseRunning={
						isSetJumpMultiplierYearResponseRunning
					}
					isSetKinkResponseRunning={isSetKinkResponseRunning}
					isSetMultiplierPerYearResponseRunning={
						isSetMultiplierPerYearResponseRunning
					}
					isFeedValuesResponseRunning={isFeedValuesResponseRunning}
					isLockPriceResponseRunning={isLockPriceResponseRunning}
					isUnlockPriceResponseRunning={isUnlockPriceResponseRunning}
					isSetDeviationThresholdResponseRunning={
						isSetDeviationThresholdResponseRunning
					}
					isSetBalanceRatioResponseRunning={isSetBalanceRatioResponseRunning}
					isSetBorrowCapResponseRunning={isSetBorrowCapResponseRunning}
				/>
				<InsuranceFactor
					account={account}
					keyring={keyring}
					setInsuranceFactor={setInsuranceFactor}
					isSetInsuranceFactorResponseRunning={
						isSetInsuranceFactorResponseRunning
					}
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
					setCollateralFactor={setCollateralFactor}
					setThreshold={setThreshold}
					isSetThresholdResponseRunning={isSetThresholdResponseRunning}
					isSetCollateralFactorResponseRunning={
						isSetCollateralFactorResponseRunning
					}
				/>
				<SetLiquidationsMaxAttempts
					account={account}
					keyring={keyring}
					setLiquidationMaxAttempts={setLiquidationMaxAttempts}
					isSetLiquidationsMaxAttemptsResponseRunning={
						isSetLiquidationsMaxAttemptsResponseRunning
					}
				/>
			</div>
		</div>
	);
}

const mapStateToProps = (state: State) => ({
	account: state.account.currentAccount,
	keyring: state.account.keyring,

	isSetBaseRateYearResponseRunning:
		state.economicUpdates.isSetBaseRateYearResponseRunning,
	setBaseRateYearResponse: state.economicUpdates.setBaseRateYearResponse,

	isSetJumpMultiplierYearResponseRunning:
		state.economicUpdates.isSetJumpMultiplierYearResponseRunning,
	setJumpMultiplierYearResponse:
		state.economicUpdates.setJumpMultiplierYearResponse,

	isSetKinkResponseRunning: state.economicUpdates.isSetKinkResponseRunning,
	setKinkResponse: state.economicUpdates.setKinkResponse,

	isSetMultiplierPerYearResponseRunning:
		state.economicUpdates.isSetMultiplierPerYearResponseRunning,
	setMultiplierPerYearResponse:
		state.economicUpdates.setMultiplierPerYearResponse,

	setInsuranceFactorResponse: state.admin.setInsuranceFactorResponse,
	isSetInsuranceFactorResponseRunning:
		state.admin.isSetInsuranceFactorResponseRunning,

	setCollateralFactorResponse: state.admin.setCollateralFactorResponse,
	isSetCollateralFactorResponseRunning:
		state.admin.isSetCollateralFactorResponseRunning,
	setThresholdResponse: state.admin.setThresholdResponse,
	isSetThresholdResponseRunning: state.admin.isSetThresholdResponseRunning,

	setLiquidationsMaxAttemptsResponse:
		state.admin.setLiquidationsMaxAttemptsResponse,
	isSetLiquidationsMaxAttemptsResponseRunning:
		state.admin.isSetLiquidationsMaxAttemptsResponseRunning,

	isSetLoanSizeLiquidationThresholdResponseRunning:
		state.admin.isSetLoanSizeLiquidationThresholdResponseRunning,
	setLoanSizeLiquidationThresholdResponse:
		state.admin.setLoanSizeLiquidationThresholdResponse,

	minterestModelData: state.economicUpdates.minterestModelData,
	controllerData: state.admin.controllerData,
	riskManagerData: state.admin.riskManagerData,
	lockedPricesData: state.economicUpdates.lockedPricesData,
	liquidationPoolsBalance: state.economicUpdates.liquidationPoolsBalance,
	poolsBalance: state.dashboardData.poolsBalance,
	liquidationPoolBalancingPeriod:
		state.economicUpdates.liquidationPoolBalancingPeriod,
	whitelistMode: state.admin.whitelistMode,
	pauseKeepers: state.admin.pauseKeepers,

	isFeedValuesResponseRunning:
		state.economicUpdates.isFeedValuesResponseRunning,
	feedValuesResponse: state.economicUpdates.feedValuesResponse,

	isLockPriceResponseRunning: state.economicUpdates.isLockPriceResponseRunning,
	lockPriceResponse: state.economicUpdates.lockPriceResponse,

	isUnlockPriceResponseRunning:
		state.economicUpdates.isUnlockPriceResponseRunning,
	unlockPriceResponse: state.economicUpdates.unlockPriceResponse,

	isSetDeviationThresholdResponseRunning:
		state.economicUpdates.isSetDeviationThresholdResponseRunning,
	setDeviationThresholdResponse:
		state.economicUpdates.setDeviationThresholdResponse,

	isSetBalanceRatioResponseRunning:
		state.economicUpdates.isSetBalanceRatioResponseRunning,
	setBalanceRatioResponse: state.economicUpdates.setBalanceRatioResponse,

	isSwitchModeResponseRunning: state.admin.isSwitchModeResponseRunning,
	switchModeResponse: state.admin.switchModeResponse,

	isSetBorrowCapResponseRunning:
		state.economicUpdates.isSetBorrowCapResponseRunning,
	setBorrowCapResponse: state.economicUpdates.setBorrowCapResponse,

	isPauseSpecificOperationResponseRunning:
		state.admin.isPauseSpecificOperationResponseRunning,
	pauseSpecificOperationResponse: state.admin.pauseSpecificOperationResponse,

	isUnpauseSpecificOperationResponseRunning:
		state.admin.isUnpauseSpecificOperationResponseRunning,
	unpauseSpecificOperationResponse:
		state.admin.unpauseSpecificOperationResponse,

	liquidationPoolsParams: state.economicUpdates.liquidationPoolsParams,

	setBalancingPeriodResponse: state.economicUpdates.setBalancingPeriodResponse,
	isSetBalancingPeriodResponseRunning:
		state.economicUpdates.isSetBalancingPeriodResponseRunning,
});

const mapDispatchToProps = {
	setBaseRatePerYear,
	setJumpMultiplierPerYear,
	setKink,
	setMultiplierPerYear,
	setInsuranceFactor,
	resetEconomicUpdateRequests,
	resetAdminRequests,
	setLiquidationMaxAttempts,
	setCollateralFactor,
	setThreshold,
	getControllerData,
	getMinterestModel,
	getRiskManagerData,
	setLoanSizeLiquidationThreshold,
	feedValues,
	lockPrice,
	unlockPrice,
	getLockedPrices,
	getLiquidationPoolsBalance,
	getLiquidationBalancingPeriod,
	setDeviationThreshold,
	setBalanceRatio,
	setBalancingPeriod,
	getLiquidationPoolParams,
	getWhitelistMode,
	switchMode,
	setBorrowCap,
	getPauseKeepers,
	pauseSpecificOperation,
	unpauseSpecificOperation,
	getPoolsBalance,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
