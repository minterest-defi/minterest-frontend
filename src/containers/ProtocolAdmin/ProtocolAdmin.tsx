import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
	getWhitelistMode,
	getControllerParams,
	getMinterestModelParams,
	getPauseKeepers,
	getAdminLockedPrices,
	getAdminFreshPrices,
	getMNTSpeeds,
	getMNTRate,
} from '../../actions/protocolAdminData';
import {
	resetProtocolAdminUpdateRequests,
	switchWhitelistMode,
	setProtocolInterestFactor,
	setProtocolInterestThreshold,
	setCollateralFactor,
	setBaseRatePerYear,
	setMultiplierPerYear,
	setKink,
	setJumpMultiplierPerYear,
	setBorrowCap,
	pauseOperation,
	resumeOperation,
	lockPrice,
	unlockPrice,
	feedValues,
	enableMNTMinting,
	disableMNTMinting,
	setMNTRateForSide,
} from '../../actions/protocolAdminUpdates';
import { getPoolsBorrowBalance } from '../../actions/dashboardData';
import { State } from '../../util/types';
import { MESSAGE_SUCCESS } from '../../util/constants';
import { useAPIResponse } from '../../util';
import { ProtocolAdminProps } from './ProtocolAdmin.types';

import classes from './ProtocolAdmin.module.scss';

import WhitelistMode from '../../components/WhitelistMode/WhitelistMode';
import ProtocolConfigurationData from '../../components/ProtocolConfigurationData/ProtocolConfigurationData';
import PoolOperationsData from '../../components/PoolOperationsData/PoolOperationsData';
import PoolOperationsUpdates from '../../components/PoolOperationsUpdates/PoolOperationsUpdates';
import ProtocolConfigurationUpdates from '../../components/ProtocolConfigurationUpdates/ProtocolConfigurationUpdates';
import PriceFeedData from '../../components/PriceFeedData/PriceFeedData';
import PriceFeedUpdate from '../../components/PriceFeedUpdate/PriceFeedUpdate';
import MNTTokenEconomy from '../../components/MNTTokenEconomy/MNTTokenEconomy';

function ProtocolAdmin(props: ProtocolAdminProps) {
	const {
		account,
		keyring,
		currenciesOptions,
		currencies,

		getWhitelistMode,
		whitelistMode,

		getControllerParams,
		controllerParams,

		getMinterestModelParams,
		minterestModelParams,

		getPauseKeepers,
		pauseKeepers,

		getAdminLockedPrices,
		lockedPricesData,

		getAdminFreshPrices,
		freshPricesData,

		getMNTSpeeds,
		MNTSpeeds,

		getMNTRate,
		MNTRate,

		getPoolsBorrowBalance,
		poolsBorrowBalance,

		resetProtocolAdminUpdateRequests,

		switchWhitelistMode,
		switchWhitelistModeResponse,
		isSwitchModeResponseRunning,

		setProtocolInterestFactor,
		setProtocolInterestFactorResponse,
		isSetProtocolInterestFactorResponseRunning,

		setProtocolInterestThreshold,
		setProtocolInterestThresholdResponse,
		isSetProtocolInterestThresholdResponseRunning,

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

		pauseOperation,
		pauseOperationResponse,
		isPauseOperationResponseRunning,

		resumeOperation,
		resumeOperationResponse,
		isResumeOperationResponseRunning,

		lockPrice,
		lockPriceResponse,
		isLockPriceResponseRunning,

		unlockPrice,
		unlockPriceResponse,
		isUnlockPriceResponseRunning,

		feedValues,
		feedValuesResponse,
		isFeedValuesResponseRunning,

		enableMNTMinting,
		disableMNTMinting,
		toggleMNTMintingResponse,
		isToggleMNTMintingRequestRunning,
		mintToggleCurrencyId,

		setMNTRateForSide,
		setMNTRateResponse,
		isSetMNTRateRequestRunning,
	} = props;

	useEffect(() => {
		getProtocolAdminData();
		return () => {
			resetProtocolAdminUpdateRequests();
		};
	}, []);

	const showMessage = (message: string = MESSAGE_SUCCESS) => {
		alert(message);
	};

	const onSuccessWhitelistMode = () => {
		getWhitelistMode();
		showMessage();
	};

	const onSuccessControllerParams = () => {
		getControllerParams();
		showMessage();
	};

	const onSuccessMinterestModelParams = () => {
		getMinterestModelParams();
		showMessage();
	};

	const onSuccessPauseKeepers = () => {
		getPauseKeepers();
		showMessage();
	};

	const onSuccessLockedPrices = () => {
		getAdminLockedPrices();
		getAdminFreshPrices();
		showMessage();
	};

	const onSuccessMNTParams = () => {
		getMNTSpeeds();
		getMNTRate();
		showMessage();
	};

	const onSuccessFeedValues = () => {
		getAdminLockedPrices();
		getAdminFreshPrices();
		showMessage();
	};

	useAPIResponse(
		[isSwitchModeResponseRunning, switchWhitelistModeResponse],
		onSuccessWhitelistMode,
		showMessage
	);

	useAPIResponse(
		[
			isSetProtocolInterestFactorResponseRunning,
			setProtocolInterestFactorResponse,
		],
		onSuccessControllerParams,
		showMessage
	);

	useAPIResponse(
		[
			isSetProtocolInterestThresholdResponseRunning,
			setProtocolInterestThresholdResponse,
		],
		onSuccessControllerParams,
		showMessage
	);

	useAPIResponse(
		[isSetCollateralFactorResponseRunning, setCollateralFactorResponse],
		onSuccessControllerParams,
		showMessage
	);

	useAPIResponse(
		[isSetBaseRateYearResponseRunning, setBaseRateYearResponse],
		onSuccessMinterestModelParams,
		showMessage
	);

	useAPIResponse(
		[isSetMultiplierPerYearResponseRunning, setMultiplierPerYearResponse],
		onSuccessMinterestModelParams,
		showMessage
	);

	useAPIResponse(
		[isSetKinkResponseRunning, setKinkResponse],
		onSuccessMinterestModelParams,
		showMessage
	);

	useAPIResponse(
		[isSetJumpMultiplierYearResponseRunning, setJumpMultiplierYearResponse],
		onSuccessMinterestModelParams,
		showMessage
	);

	useAPIResponse(
		[isSetBorrowCapResponseRunning, setBorrowCapResponse],
		onSuccessControllerParams,
		showMessage
	);

	useAPIResponse(
		[isPauseOperationResponseRunning, pauseOperationResponse],
		onSuccessPauseKeepers,
		showMessage
	);

	useAPIResponse(
		[isResumeOperationResponseRunning, resumeOperationResponse],
		onSuccessPauseKeepers,
		showMessage
	);

	useAPIResponse(
		[isLockPriceResponseRunning, lockPriceResponse],
		onSuccessLockedPrices,
		showMessage
	);

	useAPIResponse(
		[isUnlockPriceResponseRunning, unlockPriceResponse],
		onSuccessLockedPrices,
		showMessage
	);

	useAPIResponse(
		[isFeedValuesResponseRunning, feedValuesResponse],
		onSuccessFeedValues,
		showMessage
	);

	useAPIResponse(
		[isToggleMNTMintingRequestRunning, toggleMNTMintingResponse],
		onSuccessMNTParams,
		showMessage
	);

	useAPIResponse(
		[isSetMNTRateRequestRunning, setMNTRateResponse],
		onSuccessMNTParams,
		showMessage
	);

	const getProtocolAdminData = () => {
		getWhitelistMode();
		getControllerParams();
		getMinterestModelParams();
		getPauseKeepers();
		getAdminLockedPrices();
		getAdminFreshPrices();
		getMNTSpeeds();
		getMNTRate();
		getPoolsBorrowBalance();
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.whitelist_mode}>
				<WhitelistMode
					account={account}
					keyring={keyring}
					whitelistMode={whitelistMode}
					switchWhitelistMode={switchWhitelistMode}
					isSwitchModeResponseRunning={isSwitchModeResponseRunning}
				/>
			</div>
			<div className={classes.protocol_configuration_data}>
				<ProtocolConfigurationData
					minterestModelParams={minterestModelParams}
					controllerParams={controllerParams}
					poolsBorrowBalance={poolsBorrowBalance}
					currencies={currencies}
				/>
			</div>
			<div className={classes.protocol_configuration_updates}>
				<ProtocolConfigurationUpdates
					account={account}
					keyring={keyring}
					currenciesOptions={currenciesOptions}
					setProtocolInterestFactor={setProtocolInterestFactor}
					isSetProtocolInterestFactorResponseRunning={
						isSetProtocolInterestFactorResponseRunning
					}
					setProtocolInterestThreshold={setProtocolInterestThreshold}
					isSetProtocolInterestThresholdResponseRunning={
						isSetProtocolInterestThresholdResponseRunning
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
			<div className={classes.protocol_operations_data}>
				<PoolOperationsData
					pauseKeepers={pauseKeepers}
					currencies={currencies}
				/>
			</div>
			<div className={classes.protocol_operations_updates}>
				<PoolOperationsUpdates
					account={account}
					keyring={keyring}
					currenciesOptions={currenciesOptions}
					pauseOperation={pauseOperation}
					isPauseOperationResponseRunning={isPauseOperationResponseRunning}
					resumeOperation={resumeOperation}
					isResumeOperationResponseRunning={isResumeOperationResponseRunning}
				/>
			</div>
			<div className={classes.price_feed_data}>
				<PriceFeedData
					lockedPricesData={lockedPricesData}
					freshPricesData={freshPricesData}
					currencies={currencies}
				/>
			</div>
			<div className={classes.price_feed_updates}>
				<PriceFeedUpdate
					account={account}
					keyring={keyring}
					currenciesOptions={currenciesOptions}
					lockPrice={lockPrice}
					isLockPriceResponseRunning={isLockPriceResponseRunning}
					unlockPrice={unlockPrice}
					isUnlockPriceResponseRunning={isUnlockPriceResponseRunning}
					feedValues={feedValues}
					isFeedValuesResponseRunning={isFeedValuesResponseRunning}
				/>
			</div>
			<div className={classes.mnt_token_economy}>
				<MNTTokenEconomy
					account={account}
					keyring={keyring}
					currencies={currencies}
					MNTSpeeds={MNTSpeeds}
					MNTRate={MNTRate}
					enableMNTMinting={enableMNTMinting}
					disableMNTMinting={disableMNTMinting}
					isToggleMNTMintingRequestRunning={isToggleMNTMintingRequestRunning}
					setMNTRateForSide={setMNTRateForSide}
					isSetMNTRateRequestRunning={isSetMNTRateRequestRunning}
					mintToggleCurrencyId={mintToggleCurrencyId}
				/>
			</div>
		</div>
	);
}

const mapStateToProps = (state: State) => ({
	account: state.account.currentAccount,
	keyring: state.account.keyring,
	currenciesOptions: state.protocolData.currenciesOptions,
	currencies: state.protocolData.currencies,

	whitelistMode: state.protocolAdminData.whitelistMode,
	controllerParams: state.protocolAdminData.controllerParams,
	minterestModelParams: state.protocolAdminData.minterestModelParams,
	pauseKeepers: state.protocolAdminData.pauseKeepers,
	lockedPricesData: state.protocolAdminData.lockedPricesData,
	freshPricesData: state.protocolAdminData.freshPricesData,
	MNTSpeeds: state.protocolAdminData.MNTSpeeds,
	MNTRate: state.protocolAdminData.MNTRate,
	mintToggleCurrencyId: state.protocolAdminUpdates.mintToggleCurrencyId,

	isSwitchModeResponseRunning:
		state.protocolAdminUpdates.isSwitchModeResponseRunning,
	switchWhitelistModeResponse:
		state.protocolAdminUpdates.switchWhitelistModeResponse,

	setProtocolInterestFactorResponse:
		state.protocolAdminUpdates.setProtocolInterestFactorResponse,
	isSetProtocolInterestFactorResponseRunning:
		state.protocolAdminUpdates.isSetProtocolInterestFactorResponseRunning,

	setProtocolInterestThresholdResponse:
		state.protocolAdminUpdates.setProtocolInterestThresholdResponse,
	isSetProtocolInterestThresholdResponseRunning:
		state.protocolAdminUpdates.isSetProtocolInterestThresholdResponseRunning,

	setCollateralFactorResponse:
		state.protocolAdminUpdates.setCollateralFactorResponse,
	isSetCollateralFactorResponseRunning:
		state.protocolAdminUpdates.isSetCollateralFactorResponseRunning,

	isSetBaseRateYearResponseRunning:
		state.protocolAdminUpdates.isSetBaseRateYearResponseRunning,
	setBaseRateYearResponse: state.protocolAdminUpdates.setBaseRateYearResponse,

	isSetMultiplierPerYearResponseRunning:
		state.protocolAdminUpdates.isSetMultiplierPerYearResponseRunning,
	setMultiplierPerYearResponse:
		state.protocolAdminUpdates.setMultiplierPerYearResponse,

	isSetKinkResponseRunning: state.protocolAdminUpdates.isSetKinkResponseRunning,
	setKinkResponse: state.protocolAdminUpdates.setKinkResponse,

	isSetJumpMultiplierYearResponseRunning:
		state.protocolAdminUpdates.isSetJumpMultiplierYearResponseRunning,
	setJumpMultiplierYearResponse:
		state.protocolAdminUpdates.setJumpMultiplierYearResponse,

	isSetBorrowCapResponseRunning:
		state.protocolAdminUpdates.isSetBorrowCapResponseRunning,
	setBorrowCapResponse: state.protocolAdminUpdates.setBorrowCapResponse,

	isPauseOperationResponseRunning:
		state.protocolAdminUpdates.isPauseOperationResponseRunning,
	pauseOperationResponse: state.protocolAdminUpdates.pauseOperationResponse,

	isResumeOperationResponseRunning:
		state.protocolAdminUpdates.isResumeOperationResponseRunning,
	resumeOperationResponse: state.protocolAdminUpdates.resumeOperationResponse,

	isLockPriceResponseRunning:
		state.protocolAdminUpdates.isLockPriceResponseRunning,
	lockPriceResponse: state.protocolAdminUpdates.lockPriceResponse,

	isUnlockPriceResponseRunning:
		state.protocolAdminUpdates.isUnlockPriceResponseRunning,
	unlockPriceResponse: state.protocolAdminUpdates.unlockPriceResponse,

	isFeedValuesResponseRunning:
		state.protocolAdminUpdates.isFeedValuesResponseRunning,
	feedValuesResponse: state.protocolAdminUpdates.feedValuesResponse,

	isToggleMNTMintingRequestRunning:
		state.protocolAdminUpdates.isToggleMNTMintingRequestRunning,
	toggleMNTMintingResponse: state.protocolAdminUpdates.toggleMNTMintingResponse,

	isSetMNTRateRequestRunning:
		state.protocolAdminUpdates.isSetMNTRateRequestRunning,
	setMNTRateResponse: state.protocolAdminUpdates.setMNTRateResponse,

	poolsBorrowBalance: state.dashboardData.poolsBorrowBalance,
});

const mapDispatchToProps = {
	getWhitelistMode,
	getControllerParams,
	getMinterestModelParams,
	getPauseKeepers,
	getAdminLockedPrices,
	getAdminFreshPrices,
	getMNTSpeeds,
	getMNTRate,
	getPoolsBorrowBalance,

	resetProtocolAdminUpdateRequests,

	switchWhitelistMode,

	setProtocolInterestFactor,
	setProtocolInterestThreshold,
	setCollateralFactor,
	setBaseRatePerYear,
	setMultiplierPerYear,
	setKink,
	setJumpMultiplierPerYear,
	setBorrowCap,

	pauseOperation,
	resumeOperation,

	lockPrice,
	unlockPrice,
	feedValues,

	enableMNTMinting,
	disableMNTMinting,

	setMNTRateForSide,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtocolAdmin);
