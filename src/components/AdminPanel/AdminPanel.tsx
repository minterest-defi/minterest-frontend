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
	setMultiplierPerBlock,
	resetEconomicUpdateRequests,
	getMinterestModel,
	feedValues,
	lockPrice,
	unlockPrice,
	getLockedPrices,
	getLiquidationPoolsBalance,
	getLiquidationPoolsParameters,
	setDeviationThreshold,
	setBalanceRatio,
	setBorrowCap,
} from '../../actions/economicUpdates';
import { getPoolsBalance } from '../../actions/dashboardData';
import { State } from '../../util/types';
import { AdminPanelProps } from './AdminPanel.types';
import {
	setInsuranceFactor,
	setCollateralFactor,
	setCollateralThreshold,
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
		getLiquidationPoolsParameters,
		getWhitelistMode,
		getPauseKeepers,

		minterestModelData,
		controllerData,
		riskManagerData,
		lockedPricesData,
		liquidationPoolsBalance,
		liquidationPoolsParameters,
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

		setMultiplierPerBlock,
		setMultiplierPerBlockResponse,
		isSetMultiplierPerBlockResponseRunning,

		setInsuranceFactor,
		setInsuranceFactorResponse,
		isSetInsuranceFactorResponseRunning,

		setLiquidationMaxAttempts,
		setLiquidationsMaxAttemptsResponse,
		isSetLiquidationsMaxAttemptsResponseRunning,

		setCollateralFactor,
		setCollateralThreshold,
		setLoanSizeLiquidationThreshold,

		setLoanSizeLiquidationThresholdResponse,
		isSetLoanSizeLiquidationThresholdResponseRunning,

		isSetCollateralThresholdResponseRunning,
		setCollateralThresholdResponse,
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
	} = props;

	useEffect(() => {
		getEconomicParameters();

		return () => {
			resetEconomicUpdateRequests();
			resetAdminRequests();
		};
	}, []);

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
		if (
			isSetMultiplierPerBlockResponseRunning ||
			!setMultiplierPerBlockResponse
		)
			return;

		const { isError, errorMessage } = setMultiplierPerBlockResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getMinterestModel();
			handleSuccess();
		}
	}, [setMultiplierPerBlockResponse, isSetMultiplierPerBlockResponseRunning]);

	useEffect(() => {
		if (
			isSetCollateralThresholdResponseRunning ||
			!setCollateralThresholdResponse
		)
			return;

		const { isError, errorMessage } = setCollateralThresholdResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getRiskManagerData();
			handleSuccess();
		}
	}, [setCollateralThresholdResponse, isSetCollateralThresholdResponseRunning]);

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
			getLiquidationPoolsParameters();
			handleSuccess();
		}
	}, [setDeviationThresholdResponse, isSetDeviationThresholdResponseRunning]);

	useEffect(() => {
		if (isSetBalanceRatioResponseRunning || !setBalanceRatioResponse) return;

		const { isError, errorMessage } = setBalanceRatioResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getLiquidationPoolsParameters();
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
		getLockedPrices();
		getLiquidationPoolsBalance();
		getLiquidationPoolsParameters();
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
					liquidationPoolsParameters={liquidationPoolsParameters}
					poolsBalance={poolsBalance}
				/>
				<EconomicUpdateControls
					account={account}
					keyring={keyring}
					setBaseRatePerYear={setBaseRatePerYear}
					setJumpMultiplierPerYear={setJumpMultiplierPerYear}
					setKink={setKink}
					setMultiplierPerBlock={setMultiplierPerBlock}
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
					isSetMultiplierPerBlockResponseRunning={
						isSetMultiplierPerBlockResponseRunning
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
					setCollateralThreshold={setCollateralThreshold}
					isSetCollateralThresholdResponseRunning={
						isSetCollateralThresholdResponseRunning
					}
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

	isSetMultiplierPerBlockResponseRunning:
		state.economicUpdates.isSetMultiplierPerBlockResponseRunning,
	setMultiplierPerBlockResponse:
		state.economicUpdates.setMultiplierPerBlockResponse,

	setInsuranceFactorResponse: state.admin.setInsuranceFactorResponse,
	isSetInsuranceFactorResponseRunning:
		state.admin.isSetInsuranceFactorResponseRunning,

	setCollateralFactorResponse: state.admin.setCollateralFactorResponse,
	isSetCollateralFactorResponseRunning:
		state.admin.isSetCollateralFactorResponseRunning,
	setCollateralThresholdResponse: state.admin.setCollateralThresholdResponse,
	isSetCollateralThresholdResponseRunning:
		state.admin.isSetCollateralThresholdResponseRunning,

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
	liquidationPoolsParameters: state.economicUpdates.liquidationPoolsParameters,
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
});

const mapDispatchToProps = {
	setBaseRatePerYear,
	setJumpMultiplierPerYear,
	setKink,
	setMultiplierPerBlock,
	setInsuranceFactor,
	resetEconomicUpdateRequests,
	resetAdminRequests,
	setLiquidationMaxAttempts,
	setCollateralFactor,
	setCollateralThreshold,
	getControllerData,
	getMinterestModel,
	getRiskManagerData,
	setLoanSizeLiquidationThreshold,
	feedValues,
	lockPrice,
	unlockPrice,
	getLockedPrices,
	getLiquidationPoolsBalance,
	getLiquidationPoolsParameters,
	setDeviationThreshold,
	setBalanceRatio,
	getWhitelistMode,
	switchMode,
	setBorrowCap,
	getPauseKeepers,
	pauseSpecificOperation,
	unpauseSpecificOperation,
	getPoolsBalance,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
