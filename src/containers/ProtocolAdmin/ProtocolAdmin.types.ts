import { Action } from '../../util/types';

export interface ProtocolAdminProps {
	account: string | null;
	keyring: any;

	getMinterestModel: () => Promise<void>;
	getControllerData: () => Promise<void>;
	getLockedPrices: () => Promise<void>;
	getWhitelistMode: () => Promise<void>;
	getPauseKeepers: () => Promise<void>;

	minterestModelData: any;
	controllerData: any;
	lockedPricesData: any;
	whitelistMode: any;
	pauseKeepers: any;

	resetProtocolAdminUpdateRequests: () => Action;

	switchMode: (account: string, keyring: any) => Promise<void>;
	isSwitchModeResponseRunning: boolean;
	switchModeResponse: any;

	setInsuranceFactor: (
		account: string,
		keyring: any,
		poolId: string,
		newAmount: string
	) => Promise<void>;
	setInsuranceFactorResponse: any;
	isSetInsuranceFactorResponseRunning: boolean;

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
}

export interface WhitelistModeModeProps {
	account: string | null;
	keyring: any;
	whitelistMode: string;
	switchMode: (account: string, keyring: any) => Promise<void>;
	isSwitchModeResponseRunning: boolean;
}

export interface ProtocolConfigurationDataProps {
	minterestModelData: any;
	controllerData: any;
}

export interface ProtocolConfigurationUpdatesProps {
	account: string | null;
	keyring: any;

	setInsuranceFactor: (
		account: string,
		keyring: any,
		poolId: string,
		newAmount: string
	) => Promise<void>;
	isSetInsuranceFactorResponseRunning: boolean;

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

export interface InsuranceFactorFormValues {
	poolId: string;
	newAmount: string;
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
