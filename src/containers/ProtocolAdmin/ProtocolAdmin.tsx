import React, { useEffect } from 'react';
import { connect } from 'react-redux';

//import EconomicUpdateControls from '../../components/EconomicUpdateControls/EconomicUpdateControls';
//import InsuranceFactor from '../../components/InsuranceFactor/InsuranceFactor';
//import CollateralBlock from '../../components/CollateralBlock/CollateralBlock';
//import EconomicParameters from '../../components/EconomicParameters/EconomicParameters';
import {
	switchMode,
	setInsuranceFactor,
	setBaseRatePerYear,
	setJumpMultiplierPerYear,
	setKink,
	setMultiplierPerYear,
	feedValues,
	lockPrice,
	unlockPrice,
	setBorrowCap,
	setCollateralFactor,
	pauseSpecificOperation,
	unpauseSpecificOperation,
} from '../../actions/economicUpdates';
import { getPoolsBalance } from '../../actions/dashboardData';
import { State } from '../../util/types';
import { ProtocolAdminProps } from './ProtocolAdmin.types';
import {
	getWhitelistMode,
	getControllerData,
	getPauseKeepers,
	getMinterestModel,
	getLockedPrices,
} from '../../actions/economicData';
// @ts-ignore
import classes from './ProtocolAdmin.module.css';
import WhitelistMode from '../../components/WhitelistMode/WhitelistMode';
import ProtocolConfiguration from '../../components/ProtocolConfiguration/ProtocolConfiguration';
import PoolOperationsStatuses from '../../components/PoolOperationsStatuses/PoolOperationsStatuses';
import PoolOperationsSwitch from '../../components/PoolOperationsSwitch/PoolOperationsSwitch';
import ProtocolConfigurationActions from '../../components/ProtocolConfigurationActions/ProtocolConfigurationActions';

function ProtocolAdmin(props: ProtocolAdminProps) {
	const {
		account,
		keyring,

		getMinterestModel,
		getControllerData,
		getLockedPrices,
		getPauseKeepers,
		getWhitelistMode,

		minterestModelData,
		controllerData,
		//lockedPricesData,
		pauseKeepers,
		whitelistMode,

		resetEconomicUpdateRequests,

		switchMode,
		switchModeResponse,
		isSwitchModeResponseRunning,

		setInsuranceFactor,
		setInsuranceFactorResponse,
		isSetInsuranceFactorResponseRunning,

		setCollateralFactor,
		isSetCollateralFactorResponseRunning,
		setCollateralFactorResponse,

		setBaseRatePerYear,
		setBaseRateYearResponse,
		isSetBaseRateYearResponseRunning,

		setMultiplierPerYear,
		setMultiplierPerYearResponse,
		isSetMultiplierPerYearResponseRunning,

		setKink,
		setKinkResponse,
		isSetKinkResponseRunning,

		setJumpMultiplierPerYear,
		setJumpMultiplierYearResponse,
		isSetJumpMultiplierYearResponseRunning,

		setBorrowCap,
		setBorrowCapResponse,
		isSetBorrowCapResponseRunning,

		pauseSpecificOperation,
		pauseSpecificOperationResponse,
		isPauseSpecificOperationResponseRunning,

		unpauseSpecificOperation,
		unpauseSpecificOperationResponse,
		isUnpauseSpecificOperationResponseRunning,

		// feedValues,
		feedValuesResponse,
		isFeedValuesResponseRunning,

		// lockPrice,
		lockPriceResponse,
		isLockPriceResponseRunning,

		// unlockPrice,
		unlockPriceResponse,
		isUnlockPriceResponseRunning,
	} = props;

	useEffect(() => {
		getEconomicParameters();

		return () => {
			resetEconomicUpdateRequests();
		};
	}, []);

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
		getLockedPrices();
		getPauseKeepers();
		getPoolsBalance();
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.whitelist_mode}>
				<WhitelistMode
					account={account}
					keyring={keyring}
					whitelistMode={whitelistMode}
					switchMode={switchMode}
					isSwitchModeResponseRunning={isSwitchModeResponseRunning}
				/>
			</div>
			<div className={classes.protocol_configuration}>
				<ProtocolConfiguration
					minterestModelData={minterestModelData}
					controllerData={controllerData}
				/>
			</div>
			<div>
				<ProtocolConfigurationActions
					account={account}
					keyring={keyring}
					setInsuranceFactor={setInsuranceFactor}
					isSetInsuranceFactorResponseRunning={
						isSetInsuranceFactorResponseRunning
					}
					setCollateralFactor={setCollateralFactor}
					isSetCollateralFactorResponseRunning={
						isSetCollateralFactorResponseRunning
					}
					setBaseRatePerYear={setBaseRatePerYear}
					isSetBaseRateYearResponseRunning={isSetBaseRateYearResponseRunning}
					setMultiplierPerYear={setMultiplierPerYear}
					isSetMultiplierPerYearResponseRunning={
						isSetMultiplierPerYearResponseRunning
					}
					setKink={setKink}
					isSetKinkResponseRunning={isSetKinkResponseRunning}
					setJumpMultiplierPerYear={setJumpMultiplierPerYear}
					isSetJumpMultiplierYearResponseRunning={
						isSetJumpMultiplierYearResponseRunning
					}
					setBorrowCap={setBorrowCap}
					isSetBorrowCapResponseRunning={isSetBorrowCapResponseRunning}
				/>
			</div>
			<div>
				<PoolOperationsStatuses pauseKeepers={pauseKeepers} />
			</div>
			<div>
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
			</div>
			{/* <h2>Admin panel</h2>
			<div className={classes.admin_panel}>
				<div className={classes.fildset}>
				</div>
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
				</div> */}
			{/* <EconomicParameters
					minterestModelData={minterestModelData}
					controllerData={controllerData}
					lockedPricesData={lockedPricesData}
				/> */}
			{/* <EconomicUpdateControls
					account={account}
					keyring={keyring}
					setBaseRatePerYear={setBaseRatePerYear}
					setJumpMultiplierPerYear={setJumpMultiplierPerYear}
					setKink={setKink}
					setMultiplierPerYear={setMultiplierPerYear}
					feedValues={feedValues}
					lockPrice={lockPrice}
					unlockPrice={unlockPrice}
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
					isSetBorrowCapResponseRunning={isSetBorrowCapResponseRunning}
				/> */}
			{/* <InsuranceFactor
					account={account}
					keyring={keyring}
					setInsuranceFactor={setInsuranceFactor}
					isSetInsuranceFactorResponseRunning={
						isSetInsuranceFactorResponseRunning
					}
				/> */}
			{/* <CollateralBlock
					account={account}
					keyring={keyring}
					setCollateralFactor={setCollateralFactor}
					isSetCollateralFactorResponseRunning={
						isSetCollateralFactorResponseRunning
					}
				/> */}
			{/* </div> */}
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

	setInsuranceFactorResponse: state.economicUpdates.setInsuranceFactorResponse,
	isSetInsuranceFactorResponseRunning:
		state.economicUpdates.isSetInsuranceFactorResponseRunning,

	setCollateralFactorResponse:
		state.economicUpdates.setCollateralFactorResponse,
	isSetCollateralFactorResponseRunning:
		state.economicUpdates.isSetCollateralFactorResponseRunning,
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

	minterestModelData: state.economicData.minterestModelData,
	controllerData: state.economicData.controllerData,
	riskManagerData: state.economicData.riskManagerData,
	lockedPricesData: state.economicData.lockedPricesData,
	liquidationPoolsBalance: state.economicData.liquidationPoolsBalance,
	poolsBalance: state.dashboardData.poolsBalance,
	liquidationPoolBalancingPeriod:
		state.economicData.liquidationPoolBalancingPeriod,
	whitelistMode: state.economicData.whitelistMode,
	pauseKeepers: state.economicData.pauseKeepers,
	liquidationPoolsParams: state.economicData.liquidationPoolsParams,

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

	isSwitchModeResponseRunning:
		state.economicUpdates.isSwitchModeResponseRunning,
	switchModeResponse: state.economicUpdates.switchModeResponse,

	isSetBorrowCapResponseRunning:
		state.economicUpdates.isSetBorrowCapResponseRunning,
	setBorrowCapResponse: state.economicUpdates.setBorrowCapResponse,

	isPauseSpecificOperationResponseRunning:
		state.economicUpdates.isPauseSpecificOperationResponseRunning,
	pauseSpecificOperationResponse:
		state.economicUpdates.pauseSpecificOperationResponse,

	isUnpauseSpecificOperationResponseRunning:
		state.economicUpdates.isUnpauseSpecificOperationResponseRunning,
	unpauseSpecificOperationResponse:
		state.economicUpdates.unpauseSpecificOperationResponse,

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
	setCollateralFactor,
	getControllerData,
	getMinterestModel,
	feedValues,
	lockPrice,
	unlockPrice,
	getLockedPrices,
	switchMode,
	setBorrowCap,
	getPauseKeepers,
	pauseSpecificOperation,
	unpauseSpecificOperation,
	getPoolsBalance,
	getWhitelistMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtocolAdmin);
