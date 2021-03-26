import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
	getWhitelistMode,
	getControllerData,
	getMinterestModel,
	getPauseKeepers,
	getLockedPrices,
} from '../../actions/economicData';
import {
	switchMode,
	setInsuranceFactor,
	setCollateralFactor,
	setBaseRatePerYear,
	setMultiplierPerYear,
	setKink,
	setJumpMultiplierPerYear,
	setBorrowCap,
	pauseSpecificOperation,
	unpauseSpecificOperation,
	lockPrice,
	unlockPrice,
	feedValues,
} from '../../actions/economicUpdates';
import { State } from '../../util/types';
import { ProtocolAdminProps } from './ProtocolAdmin.types';

// @ts-ignore
import classes from './ProtocolAdmin.module.css';

import WhitelistMode from '../../components/WhitelistMode/WhitelistMode';
import ProtocolConfiguration from '../../components/ProtocolConfiguration/ProtocolConfiguration';
import PoolOperationsStatuses from '../../components/PoolOperationsStatuses/PoolOperationsStatuses';
import PoolOperationsSwitch from '../../components/PoolOperationsSwitch/PoolOperationsSwitch';
import ProtocolConfigurationActions from '../../components/ProtocolConfigurationActions/ProtocolConfigurationActions';
import PriceFeedData from '../../components/PriceFeedData/PriceFeedData';
import PriceFeedUpdate from '../../components/PriceFeedUpdate/PriceFeedUpdate';

function ProtocolAdmin(props: ProtocolAdminProps) {
	const {
		account,
		keyring,

		getWhitelistMode,
		whitelistMode,

		getControllerData,
		controllerData,

		getMinterestModel,
		minterestModelData,

		getPauseKeepers,
		pauseKeepers,

		getLockedPrices,
		lockedPricesData,

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

		lockPrice,
		lockPriceResponse,
		isLockPriceResponseRunning,

		unlockPrice,
		unlockPriceResponse,
		isUnlockPriceResponseRunning,

		feedValues,
		feedValuesResponse,
		isFeedValuesResponseRunning,
	} = props;

	useEffect(() => {
		getProtocolAdminData();
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
		if (isFeedValuesResponseRunning || !feedValuesResponse) return;
		const { isError, errorMessage } = feedValuesResponse;
		if (isError) {
			handleError(errorMessage);
		} else {
			handleSuccess();
		}
	}, [feedValuesResponse, isFeedValuesResponseRunning]);

	const handleError = (errorMessage: string) => alert(errorMessage);
	const handleSuccess = () => alert('Transaction completed successfully.');

	const getProtocolAdminData = () => {
		getWhitelistMode();
		getControllerData();
		getMinterestModel();
		getPauseKeepers();
		getLockedPrices();
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
			<div>
				<PriceFeedData lockedPricesData={lockedPricesData} />
			</div>
			<div>
				<PriceFeedUpdate
					account={account}
					keyring={keyring}
					lockPrice={lockPrice}
					isLockPriceResponseRunning={isLockPriceResponseRunning}
					unlockPrice={unlockPrice}
					isUnlockPriceResponseRunning={isUnlockPriceResponseRunning}
					feedValues={feedValues}
					isFeedValuesResponseRunning={isFeedValuesResponseRunning}
				/>
			</div>
		</div>
	);
}

const mapStateToProps = (state: State) => ({
	account: state.account.currentAccount,
	keyring: state.account.keyring,

	whitelistMode: state.economicData.whitelistMode,
	controllerData: state.economicData.controllerData,
	minterestModelData: state.economicData.minterestModelData,
	pauseKeepers: state.economicData.pauseKeepers,
	lockedPricesData: state.economicData.lockedPricesData,

	isSwitchModeResponseRunning:
		state.economicUpdates.isSwitchModeResponseRunning,
	switchModeResponse: state.economicUpdates.switchModeResponse,

	setInsuranceFactorResponse: state.economicUpdates.setInsuranceFactorResponse,
	isSetInsuranceFactorResponseRunning:
		state.economicUpdates.isSetInsuranceFactorResponseRunning,

	setCollateralFactorResponse:
		state.economicUpdates.setCollateralFactorResponse,
	isSetCollateralFactorResponseRunning:
		state.economicUpdates.isSetCollateralFactorResponseRunning,

	isSetBaseRateYearResponseRunning:
		state.economicUpdates.isSetBaseRateYearResponseRunning,
	setBaseRateYearResponse: state.economicUpdates.setBaseRateYearResponse,

	isSetMultiplierPerYearResponseRunning:
		state.economicUpdates.isSetMultiplierPerYearResponseRunning,
	setMultiplierPerYearResponse:
		state.economicUpdates.setMultiplierPerYearResponse,

	isSetKinkResponseRunning: state.economicUpdates.isSetKinkResponseRunning,
	setKinkResponse: state.economicUpdates.setKinkResponse,

	isSetJumpMultiplierYearResponseRunning:
		state.economicUpdates.isSetJumpMultiplierYearResponseRunning,
	setJumpMultiplierYearResponse:
		state.economicUpdates.setJumpMultiplierYearResponse,

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

	isLockPriceResponseRunning: state.economicUpdates.isLockPriceResponseRunning,
	lockPriceResponse: state.economicUpdates.lockPriceResponse,

	isUnlockPriceResponseRunning:
		state.economicUpdates.isUnlockPriceResponseRunning,
	unlockPriceResponse: state.economicUpdates.unlockPriceResponse,

	isFeedValuesResponseRunning:
		state.economicUpdates.isFeedValuesResponseRunning,
	feedValuesResponse: state.economicUpdates.feedValuesResponse,
});

const mapDispatchToProps = {
	getWhitelistMode,
	getControllerData,
	getMinterestModel,
	getPauseKeepers,
	getLockedPrices,

	switchMode,

	setInsuranceFactor,
	setCollateralFactor,
	setBaseRatePerYear,
	setMultiplierPerYear,
	setKink,
	setJumpMultiplierPerYear,
	setBorrowCap,

	pauseSpecificOperation,
	unpauseSpecificOperation,

	lockPrice,
	unlockPrice,
	feedValues,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtocolAdmin);
