import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AdminContentPool from './AdminContentPool/AdminContentPool';
import DepositInsurance from './DepositInsurance/DepositInsurance';
import RedeemInsurance from './RedeemInsurance/RedeemInsurance';
import PoolOperationsStatuses from './PoolOperationsStatuses/PoolOperationsStatuses';
import PoolOperationsSwitch from './PoolOperationsSwitch/PoolOperationsSwitch';
import EconomicUpdateControls from './EconomicUpdateControls/EconomicUpdateControls';
import InsuranceFactor from './InsuranceFactor/InsuranceFactor';
import SetLiquidationsMaxAttempts from './SetLiquidationsMaxAttempts/SetLiquidationsMaxAttempts';
import CollateralBlock from './CollateralBlock/CollateralBlock';
import EconomicParameters from './EconomicParameters/EconomicParameters';
import {
	setBaseRatePerBlock,
	setJumpMultiplierPerBlock,
	setKink,
	setMultiplierPerBlock,
	resetEconomicUpdateRequests,
	getMinterestModel,
} from '../../actions/economicUpdates';
import {
	setInsuranceFactor,
	depositInsurance,
	redeemInsurance,
	setCollateralFactor,
	setCollateralThreshold,
	resetAdminRequests,
	setLiquidationMaxAttempts,
	getControllerData,
	getRiskManagerData,
} from '../../actions/admin';

import classes from './AdminPanel.module.css';
import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';

function AdminPanel(props) {
	const {
		account,
		api,
		keyring,
		updateData,

		getMinterestModel,
		getControllerData,
		getRiskManagerData,

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

		isSetCollateralThresholdResponseRunning,
		setCollateralThresholdResponse,
		isSetCollateralFactorResponseRunning,
		setCollateralFactorResponse,

		minterestModelData,
		controllerData,
		riskManagerData,

		depositInsurance,
		depositInsuranceResponse,
		isDepositInsuranceResponseRunning,

		redeemInsurance,
		redeemInsuranceResponse,
		isRedeemInsuranceResponseRunning,
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

	// TODO refactoring
	const getPoolOperationStatuses = async () => {
		const poolOperationData = await Promise.all(
			UNDERLYING_ASSETS_TYPES.map((assert) => {
				return api.query.controller.pauseKeepers(assert);
			})
		);
		setPoolOperationData(poolOperationData);
	};

	useEffect(() => {
		if (isDepositInsuranceResponseRunning || !depositInsuranceResponse) return;

		const { isError, errorMessage } = depositInsuranceResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			handleSuccess();
		}
	}, [depositInsuranceResponse, isDepositInsuranceResponseRunning]);

	useEffect(() => {
		if (isRedeemInsuranceResponseRunning || !redeemInsuranceResponse) return;

		const { isError, errorMessage } = redeemInsuranceResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			handleSuccess();
		}
	}, [redeemInsuranceResponse, isRedeemInsuranceResponseRunning]);

	const handleError = (errorMessage) => alert(errorMessage);
	const handleSuccess = () => alert('Transaction completed successfully.');

	const getEconomicParameters = () => {
		getControllerData();
		getMinterestModel();
		getRiskManagerData();
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
			<fieldset className={classes.fieldset}>
				<legend>Insurance operations</legend>
				<DepositInsurance
					account={account}
					keyring={keyring}
					depositInsurance={depositInsurance}
					isDepositInsuranceResponseRunning={isDepositInsuranceResponseRunning}
					updateData={updateData}
				/>
				<RedeemInsurance
					account={account}
					keyring={keyring}
					redeemInsurance={redeemInsurance}
					isRedeemInsuranceResponseRunning={isRedeemInsuranceResponseRunning}
					updateData={updateData}
				/>
			</fieldset>
			<EconomicParameters
				minterestModelData={minterestModelData}
				controllerData={controllerData}
				riskManagerData={riskManagerData}
			/>
			<div className={classes.content}>
				<AdminContentPool />
			</div>
			<EconomicUpdateControls
				account={account}
				keyring={keyring}
				setBaseRatePerBlock={setBaseRatePerBlock}
				setJumpMultiplierPerBlock={setJumpMultiplierPerBlock}
				setKink={setKink}
				setMultiplierPerBlock={setMultiplierPerBlock}
				isSetBaseRateBlockResponseRunning={isSetBaseRateBlockResponseRunning}
				isSetJumpMultiplierBlockResponseRunning={
					isSetJumpMultiplierBlockResponseRunning
				}
				isSetKinkResponseRunning={isSetKinkResponseRunning}
				isSetMultiplierPerBlockResponseRunning={
					isSetMultiplierPerBlockResponseRunning
				}
			/>
			<InsuranceFactor
				account={account}
				keyring={keyring}
				setInsuranceFactor={setInsuranceFactor}
				isSetInsuranceFactorResponseRunning={
					isSetInsuranceFactorResponseRunning
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

const mapStateToProps = (state) => ({
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

	depositInsuranceResponse: state.admin.depositInsuranceResponse,
	isDepositInsuranceResponseRunning:
		state.admin.isDepositInsuranceResponseRunning,

	redeemInsuranceResponse: state.admin.redeemInsuranceResponse,
	isRedeemInsuranceResponseRunning:
		state.admin.isRedeemInsuranceResponseRunning,

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

	minterestModelData: state.economicUpdates.minterestModelData,
	controllerData: state.admin.controllerData,
	riskManagerData: state.admin.riskManagerData,
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
	depositInsurance,
	redeemInsurance,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
