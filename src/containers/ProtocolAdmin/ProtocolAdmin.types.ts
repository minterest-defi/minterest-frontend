import { Action } from '../../util/types';

export interface ProtocolAdminProps {
	account: string | null;
	keyring: any;

	getMinterestModelParams: () => Promise<void>;
	getControllerParams: () => Promise<void>;
	getLockedPrices: () => Promise<void>;
	getWhitelistMode: () => Promise<void>;
	getPauseKeepers: () => Promise<void>;
	getMNTSpeeds: () => Promise<void>;
	getMNTRate: () => Promise<void>;
	getPoolsBorrowBalance: () => Promise<void>;

	minterestModelParams: any;
	controllerParams: any;
	poolsBorrowBalance: any;
	lockedPricesData: any;
	whitelistMode: any;
	pauseKeepers: any;
	MNTSpeeds: any;
	MNTRate: any;

	resetProtocolAdminUpdateRequests: () => Action;

	switchMode: (account: string, keyring: any) => Promise<void>;
	isSwitchModeResponseRunning: boolean;
	switchModeResponse: any;

	setProtocolInterestFactor: (
		account: string,
		keyring: any,
		poolId: string,
		newAmount: string
	) => Promise<void>;
	setProtocolInterestFactorResponse: any;
	isSetProtocolInterestFactorResponseRunning: boolean;

	setProtocolInterestThreshold: (
		account: string,
		keyring: any,
		poolId: string,
		protocolInterestThreshold: string
	) => Promise<void>;
	setProtocolInterestThresholdResponse: any;
	isSetProtocolInterestThresholdResponseRunning: boolean;

	setCollateralFactor: (
		account: string,
		keyring: any,
		poolId: string,
		newAmount: string
	) => Promise<void>;
	isSetCollateralFactorResponseRunning: boolean;
	setCollateralFactorResponse: any;

	setBaseRatePerYear: (
		account: string,
		keyring: any,
		poolId: string,
		baseRatePerYear: string
	) => Promise<void>;
	setBaseRateYearResponse: any;
	isSetBaseRateYearResponseRunning: boolean;

	setMultiplierPerYear: (
		account: string,
		keyring: any,
		poolId: string,
		multiplierRatePerYear: string
	) => Promise<void>;
	setMultiplierPerYearResponse: any;
	isSetMultiplierPerYearResponseRunning: boolean;

	setKink: (
		account: string,
		keyring: any,
		poolId: string,
		kink: string
	) => Promise<void>;
	setKinkResponse: any;
	isSetKinkResponseRunning: boolean;

	setJumpMultiplierPerYear: (
		account: string,
		keyring: any,
		poolId: string,
		jumpMultiplierRatePerYear: string
	) => Promise<void>;
	setJumpMultiplierYearResponse: any;
	isSetJumpMultiplierYearResponseRunning: boolean;

	setBorrowCap: (
		account: string,
		keyring: any,
		poolId: string,
		borrowCap: string | undefined
	) => Promise<void>;
	isSetBorrowCapResponseRunning: boolean;
	setBorrowCapResponse: any;

	lockPrice: (
		account: string,
		keyring: any,
		currencyId: string
	) => Promise<void>;
	isLockPriceResponseRunning: boolean;
	lockPriceResponse: any;

	unlockPrice: (
		account: string,
		keyring: any,
		currencyId: string
	) => Promise<void>;
	isUnlockPriceResponseRunning: boolean;
	unlockPriceResponse: any;

	feedValues: (account: string, keyring: any, values: any) => Promise<void>;
	isFeedValuesResponseRunning: boolean;
	feedValuesResponse: any;

	pauseSpecificOperation: (
		account: string,
		keyring: any,
		poolId: string,
		operation: string
	) => Promise<void>;
	isPauseSpecificOperationResponseRunning: boolean;
	pauseSpecificOperationResponse: any;

	unpauseSpecificOperation: (
		account: string,
		keyring: any,
		poolId: string,
		operation: string
	) => Promise<void>;
	isUnpauseSpecificOperationResponseRunning: boolean;
	unpauseSpecificOperationResponse: any;

	enableMNTMinting: (
		account: string,
		keyring: any,
		currencyId: string
	) => Promise<void>;
	disableMNTMinting: (
		account: string,
		keyring: any,
		currencyId: string
	) => Promise<void>;
	isToggleMNTMintingRequestRunning: boolean;
	toggleMNTMintingResponse: any;
	mintToggleCurrencyId: string | null;

	setMNTRateForSide: (
		account: string,
		keyring: any,
		rateForSide: string
	) => Promise<void>;
	isSetMNTRateRequestRunning: boolean;
	setMNTRateResponse: any;
}

export interface WhitelistModeModeProps {
	account: string | null;
	keyring: any;
	whitelistMode: string;
	switchMode: (account: string, keyring: any) => Promise<void>;
	isSwitchModeResponseRunning: boolean;
}

export interface ProtocolConfigurationDataProps {
	minterestModelParams: any;
	controllerParams: any;
	poolsBorrowBalance: any;
}

export interface ProtocolConfigurationUpdatesProps {
	account: string | null;
	keyring: any;

	setProtocolInterestFactor: (
		account: string,
		keyring: any,
		poolId: string,
		newAmount: string
	) => Promise<void>;
	isSetProtocolInterestFactorResponseRunning: boolean;

	setProtocolInterestThreshold: (
		account: string,
		keyring: any,
		poolId: string,
		protocolInterestThreshold: string
	) => Promise<void>;
	isSetProtocolInterestThresholdResponseRunning: boolean;

	setCollateralFactor: (
		account: string,
		keyring: any,
		poolId: string,
		newAmount: string
	) => Promise<void>;
	isSetCollateralFactorResponseRunning: boolean;

	setBaseRatePerYear: (
		account: string,
		keyring: any,
		poolId: string,
		baseRatePerYear: string
	) => Promise<void>;
	isSetBaseRateYearResponseRunning: boolean;

	setMultiplierPerYear: (
		account: string,
		keyring: any,
		poolId: string,
		multiplierRatePerYear: string
	) => Promise<void>;
	isSetMultiplierPerYearResponseRunning: boolean;

	setKink: (
		account: string,
		keyring: any,
		poolId: string,
		kink: string
	) => Promise<void>;
	isSetKinkResponseRunning: boolean;

	setJumpMultiplierPerYear: (
		account: string,
		keyring: any,
		poolId: string,
		jumpMultiplierRatePerYear: string
	) => Promise<void>;
	isSetJumpMultiplierYearResponseRunning: boolean;

	setBorrowCap: (
		account: string,
		keyring: any,
		poolId: string,
		borrowCap: string | undefined
	) => Promise<void>;
	isSetBorrowCapResponseRunning: boolean;
}

export interface ProtocolInterestFactorFormValues {
	poolId: string;
	newAmount: string;
}

export interface ProtocolInterestTresholdFormValues {
	poolId: string;
	protocolInterestThreshold: string;
}

export interface CollateralFactorFormValues {
	poolId: string;
	newAmount: string;
}

export interface BaseRatePerYearFormValues {
	poolId: string;
	baseRatePerYear: string;
}

export interface MultiplierPerYearFormValues {
	poolId: string;
	multiplierRatePerYear: string;
}

export interface KinkFormValues {
	poolId: string;
	kink: string;
}

export interface JumpMultiplierPerYearFormValues {
	poolId: string;
	jumpMultiplierRatePerYear: string;
}

export interface BorrowCapFormValues {
	poolId: string;
	borrowCap: string;
}

export interface PoolOperationsDataProps {
	pauseKeepers: any;
}

export interface PoolOperationsUpdatesProps {
	keyring: any;
	account: string | null;
	pauseSpecificOperation: (
		account: string,
		keyring: any,
		poolId: string,
		operation: string
	) => Promise<void>;
	isPauseSpecificOperationResponseRunning: boolean;
	unpauseSpecificOperation: (
		account: string,
		keyring: any,
		poolId: string,
		operation: string
	) => Promise<void>;
	isUnpauseSpecificOperationResponseRunning: boolean;
}

export interface PauseSpecificOperationFormValues {
	poolId: string;
	operation: string;
}

export interface PriceFeedDataProps {
	lockedPricesData: any;
}

export interface PriceFeedUpdateProps {
	keyring: any;
	account: string | null;

	lockPrice: (
		account: string,
		keyring: any,
		currencyId: string
	) => Promise<void>;
	isLockPriceResponseRunning: boolean;

	unlockPrice: (
		account: string,
		keyring: any,
		currencyId: string
	) => Promise<void>;
	isUnlockPriceResponseRunning: boolean;

	feedValues: (account: string, keyring: any, values: any) => Promise<void>;
	isFeedValuesResponseRunning: boolean;
}

export interface LockPriceFormValues {
	currencyId: string;
}

export interface UnlockPriceFormValues {
	currencyId: string;
}

export interface FeedValuesFormValues {
	values: any;
}

export interface MNTRateProps {
	account: string | null;
	keyring: any;
	MNTSpeeds: any;
	MNTRate: any;

	enableMNTMinting: (
		account: string,
		keyring: any,
		currencyId: string
	) => Promise<void>;
	disableMNTMinting: (
		account: string,
		keyring: any,
		currencyId: string
	) => Promise<void>;
	isToggleMNTMintingRequestRunning: boolean;
	mintToggleCurrencyId: string | null;

	setMNTRateForSide: (
		account: string,
		keyring: any,
		rateForSide: string
	) => Promise<void>;
	isSetMNTRateRequestRunning: boolean;
}

export interface MNTRateForSideFormValues {
	rateForSide: string;
}
