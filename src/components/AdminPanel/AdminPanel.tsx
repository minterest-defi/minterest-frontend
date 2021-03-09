import React, { useState, useEffect } from 'react';
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
	setBaseRatePerBlock,
	setJumpMultiplierPerBlock,
	setKink,
	setMultiplierPerBlock,
	resetEconomicUpdateRequests,
	getMinterestModel,
	feedValues,
	lockPrice,
	unlockPrice,
	getLockedPrices,
} from '../../actions/economicUpdates';
import { State } from '../../util/types';
import {
	setInsuranceFactor,
	setCollateralFactor,
	setCollateralThreshold,
	resetAdminRequests,
	setLiquidationMaxAttempts,
	getControllerData,
	getRiskManagerData,
	setLoanSizeLiquidationThreshold,
} from '../../actions/admin';

// @ts-ignore
import classes from './AdminPanel.module.css';
import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';

function AdminPanel(props) {
	const {
		account,
		api,
		keyring,

		getMinterestModel,
		getControllerData,
		getRiskManagerData,
		getLockedPrices,

		resetEconomicUpdateRequests,
		resetAdminRequests,

		setKink,
		setKinkResponse,
		isSetKinkResponseRunning,

		setBaseRatePerBlock,
		setBaseRateBlockResponse,
		isSetBaseRateBlockResponseRunning,

		setJumpMultiplierPerBlock,
		setJumpMultiplierBlockResponse,
		isSetJumpMultiplierBlockResponseRunning,

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

		minterestModelData,
		controllerData,
		riskManagerData,
		lockedPricesData,

		isFeedValuesResponseRunning,
		feedValuesResponse,
		feedValues,

		isLockPriceResponseRunning,
		lockPriceResponse,
		lockPrice,

		isUnlockPriceResponseRunning,
		unlockPriceResponse,
		unlockPrice,
	} = props;
	const [poolOperationData, setPoolOperationData] = useState([]);

	useEffect(() => {
		getPoolOperationStatuses();
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
		if (isSetBaseRateBlockResponseRunning || !setBaseRateBlockResponse) return;

		const { isError, errorMessage } = setBaseRateBlockResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getMinterestModel();
			handleSuccess();
		}
	}, [setBaseRateBlockResponse, isSetBaseRateBlockResponseRunning]);

	useEffect(() => {
		if (
			isSetJumpMultiplierBlockResponseRunning ||
			!setJumpMultiplierBlockResponse
		)
			return;

		const { isError, errorMessage } = setJumpMultiplierBlockResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getMinterestModel();
			handleSuccess();
		}
	}, [setJumpMultiplierBlockResponse, isSetJumpMultiplierBlockResponseRunning]);

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

	// TODO refactoring
	const getPoolOperationStatuses = async () => {
		const poolOperationData = await Promise.all(
			UNDERLYING_ASSETS_TYPES.map((assert) => {
				return api.query.controller.pauseKeepers(assert);
			})
		);
		// @ts-ignore
		setPoolOperationData(poolOperationData);
	};

	const handleError = (errorMessage) => alert(errorMessage);
	const handleSuccess = () => alert('Transaction completed successfully.');

	const getEconomicParameters = () => {
		getControllerData();
		getMinterestModel();
		getRiskManagerData();
		getLockedPrices();
	};

	return (
		<div className={classes.admin_panel}>
			<div className={classes.switch}>
				<PoolOperationsSwitch
					getPoolOperationStatuses={getPoolOperationStatuses}
					account={account}
					keyring={keyring}
					api={api}
				/>
				<PoolOperationsStatuses poolOperationData={poolOperationData} />
			</div>
			<EconomicParameters
				minterestModelData={minterestModelData}
				controllerData={controllerData}
				riskManagerData={riskManagerData}
				lockedPricesData={lockedPricesData}
			/>
			<EconomicUpdateControls
				account={account}
				keyring={keyring}
				setBaseRatePerBlock={setBaseRatePerBlock}
				setJumpMultiplierPerBlock={setJumpMultiplierPerBlock}
				setKink={setKink}
				setMultiplierPerBlock={setMultiplierPerBlock}
				feedValues={feedValues}
				lockPrice={lockPrice}
				unlockPrice={unlockPrice}
				isSetBaseRateBlockResponseRunning={isSetBaseRateBlockResponseRunning}
				isSetJumpMultiplierBlockResponseRunning={
					isSetJumpMultiplierBlockResponseRunning
				}
				isSetKinkResponseRunning={isSetKinkResponseRunning}
				isSetMultiplierPerBlockResponseRunning={
					isSetMultiplierPerBlockResponseRunning
				}
				isFeedValuesResponseRunning={isFeedValuesResponseRunning}
				isLockPriceResponseRunning={isLockPriceResponseRunning}
				isUnlockPriceResponseRunning={isUnlockPriceResponseRunning}
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
	);
}

const mapStateToProps = (state: State) => ({
	api: state.substrate.api,
	keyring: state.account.keyring,

	isSetBaseRateBlockResponseRunning:
		state.economicUpdates.isSetBaseRateBlockResponseRunning,
	setBaseRateBlockResponse: state.economicUpdates.setBaseRateBlockResponse,

	isSetJumpMultiplierBlockResponseRunning:
		state.economicUpdates.isSetJumpMultiplierBlockResponseRunning,
	setJumpMultiplierBlockResponse:
		state.economicUpdates.setJumpMultiplierBlockResponse,

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

	isFeedValuesResponseRunning:
		state.economicUpdates.isFeedValuesResponseRunning,
	feedValuesResponse: state.economicUpdates.feedValuesResponse,

	isLockPriceResponseRunning: state.economicUpdates.isLockPriceResponseRunning,
	lockPriceResponse: state.economicUpdates.lockPriceResponse,

	isUnlockPriceResponseRunning:
		state.economicUpdates.isUnlockPriceResponseRunning,
	unlockPriceResponse: state.economicUpdates.unlockPriceResponse,
});

const mapDispatchToProps = {
	setBaseRatePerBlock,
	setJumpMultiplierPerBlock,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
