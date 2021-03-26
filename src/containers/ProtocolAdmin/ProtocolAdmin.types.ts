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

	resetEconomicUpdateRequests: () => Action;

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

	feedValues: (account: string, keyring: any, values: any) => Promise<void>;
	isFeedValuesResponseRunning: boolean;
	feedValuesResponse: any;

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

export interface ProtocolConfigurationProps {
	minterestModelData: any;
	controllerData: any;
}

export interface ProtocolConfigurationActionsProps {
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

// export interface CollateralBlockProps {
// 	account: string | null;
// 	keyring: any;

// 	setCollateralFactor: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		newAmount: string
// 	) => Promise<void>;
// 	isSetCollateralFactorResponseRunning: boolean;
// }

// feedValues: (account: string, keyring: any, values: any) => Promise<void>;
// isFeedValuesResponseRunning: boolean;

// lockPrice: (
// 	account: string,
// 	keyring: any,
// 	currencyId: string
// ) => Promise<void>;
// isLockPriceResponseRunning: boolean;

// unlockPrice: (
// 	account: string,
// 	keyring: any,
// 	currencyId: string
// ) => Promise<void>;
// isUnlockPriceResponseRunning: boolean;

export interface CollateralFactorFormValues {
	poolId: string;
	newAmount: string;
}

export interface EconomicParametersProps {
	minterestModelData: any;
	controllerData: any;
	lockedPricesData: any;
	poolsBalance: any;
}

export interface BaseRatePerYearFormValues {
	poolId: string;
	baseRatePerYear: string;
}

export interface JumpMultiplierPerYearFormValues {
	poolId: string;
	jumpMultiplierRatePerYear: string;
}

export interface KinkFormValues {
	poolId: string;
	kink: string;
}
export interface MultiplierPerYearFormValues {
	poolId: string;
	multiplierRatePerYear: string;
}
export interface FeedValuesFormValues {
	values: any;
}
export interface LockPriceFormValues {
	currencyId: string;
}
export interface UnlockPriceFormValues {
	currencyId: string;
}

export interface InsuranceFactorProps {
	account: string | null;
	keyring: any;

	setInsuranceFactor: (
		account: string,
		keyring: any,
		poolId: string,
		newAmount: string
	) => Promise<void>;
	isSetInsuranceFactorResponseRunning: boolean;
}

export interface InsuranceFactorFormValues {
	poolId: string;
	newAmount: string;
}

export interface PoolOperationsStatusesProps {
	pauseKeepers: any;
}

export interface PauseSpecificOperationFormValues {
	poolId: string;
	operation: string;
}

export interface PoolOperationsSwitchProps {
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

export interface BorrowCapFormValues {
	poolId: string;
	borrowCap: string;
}
