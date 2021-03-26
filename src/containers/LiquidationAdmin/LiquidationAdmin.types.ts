//import { Action } from '../../util/types';

export interface LiquidationAdminProps {
	account: string | null;
	keyring: any;

	getLiquidationPoolsBalance: () => Promise<void>;
	getLiquidationPoolParams: () => Promise<void>;
	getRiskManagerData: () => Promise<void>;
	getLiquidationBalancingPeriod: () => Promise<void>;
	getPoolsBalance: () => Promise<void>;

	liquidationPoolsBalance: any;
	liquidationPoolsParams: any;
	riskManagerData: any;
	liquidationPoolBalancingPeriod: any;
	poolsBalance: any;

	// resetEconomicUpdateRequests: () => Action;

	// setLiquidationMaxAttempts: (
	// 	account: string,
	// 	keyring: any,
	// 	poolId: string,
	// 	newMaxValue: string
	// ) => Promise<void>;
	// setLiquidationsMaxAttemptsResponse: any;
	// isSetLiquidationsMaxAttemptsResponseRunning: boolean;

	// setThreshold: (
	// 	account: string,
	// 	keyring: any,
	// 	poolId: string,
	// 	newAmount: string
	// ) => Promise<void>;
	// setLoanSizeLiquidationThreshold: (
	// 	account: string,
	// 	keyring: any,
	// 	poolId: string,
	// 	newMaxValue: string
	// ) => Promise<void>;

	// setLoanSizeLiquidationThresholdResponse: any;
	// isSetLoanSizeLiquidationThresholdResponseRunning: boolean;

	// isSetThresholdResponseRunning: boolean;
	// setThresholdResponse: any;

	// isSetDeviationThresholdResponseRunning: boolean;
	// setDeviationThresholdResponse: any;
	// setDeviationThreshold: (
	// 	account: string,
	// 	keyring: any,
	// 	poolId: string,
	// 	newThreshold: string
	// ) => Promise<void>;

	// isSetBalanceRatioResponseRunning: boolean;
	// setBalanceRatioResponse: any;
	// setBalanceRatio: (
	// 	account: string,
	// 	keyring: any,
	// 	poolId: string,
	// 	newBalanceRatio: string
	// ) => Promise<void>;

	// setBalancingPeriod: (
	// 	account: string,
	// 	keyring: any,
	// 	newPeriod: string
	// ) => Promise<void>;
	// setBalancingPeriodResponse: any;
	// isSetBalancingPeriodResponseRunning: boolean;
}

export interface LiquidationPoolsConfigurationDataProps {
	riskManagerData: any;
	liquidationPoolsParams: any;
	lockedPricesData: any;
	liquidationPoolsBalance: any;
	liquidationPoolBalancingPeriod: any;
	poolsBalance: any;
}

// export interface AdminPanelProps {
// 	account: string | null;
// 	keyring: any;

// 	getMinterestModel: () => Promise<void>;
// 	getControllerData: () => Promise<void>;
// 	getRiskManagerData: () => Promise<void>;
// 	getLockedPrices: () => Promise<void>;
// 	getLiquidationPoolsBalance: () => Promise<void>;
// 	getLiquidationBalancingPeriod: () => Promise<void>;
// 	getWhitelistMode: () => Promise<void>;

// 	minterestModelData: any;
// 	controllerData: any;
// 	riskManagerData: any;
// 	lockedPricesData: any;
// 	liquidationPoolsBalance: any;
// 	liquidationPoolBalancingPeriod: any;
// 	whitelistMode: any;
// 	poolsBalance: any;

// 	resetEconomicUpdateRequests: () => Action;

// 	setKink: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		kink: string
// 	) => Promise<void>;
// 	setKinkResponse: any;
// 	isSetKinkResponseRunning: boolean;

// 	setBaseRatePerYear: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		baseRatePerYear: string
// 	) => Promise<void>;
// 	setBaseRateYearResponse: any;
// 	isSetBaseRateYearResponseRunning: boolean;

// 	setJumpMultiplierPerYear: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		jumpMultiplierRatePerYear: string
// 	) => Promise<void>;
// 	setJumpMultiplierYearResponse: any;
// 	isSetJumpMultiplierYearResponseRunning: boolean;

// 	setMultiplierPerYear: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		multiplierRatePerYear: string
// 	) => Promise<void>;
// 	setMultiplierPerYearResponse: any;
// 	isSetMultiplierPerYearResponseRunning: boolean;

// 	setInsuranceFactor: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		newAmount: string
// 	) => Promise<void>;
// 	setInsuranceFactorResponse: any;
// 	isSetInsuranceFactorResponseRunning: boolean;

// 	setLiquidationMaxAttempts: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		newMaxValue: string
// 	) => Promise<void>;
// 	setLiquidationsMaxAttemptsResponse: any;
// 	isSetLiquidationsMaxAttemptsResponseRunning: boolean;

// 	setCollateralFactor: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		newAmount: string
// 	) => Promise<void>;
// 	setThreshold: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		newAmount: string
// 	) => Promise<void>;
// 	setLoanSizeLiquidationThreshold: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		newMaxValue: string
// 	) => Promise<void>;

// 	setLoanSizeLiquidationThresholdResponse: any;
// 	isSetLoanSizeLiquidationThresholdResponseRunning: boolean;

// 	isSetThresholdResponseRunning: boolean;
// 	setThresholdResponse: any;
// 	isSetCollateralFactorResponseRunning: boolean;
// 	setCollateralFactorResponse: any;

// 	isFeedValuesResponseRunning: boolean;
// 	feedValuesResponse: any;
// 	feedValues: (account: string, keyring: any, values: any) => Promise<void>;

// 	isLockPriceResponseRunning: boolean;
// 	lockPriceResponse: any;
// 	lockPrice: (
// 		account: string,
// 		keyring: any,
// 		currencyId: string
// 	) => Promise<void>;

// 	isUnlockPriceResponseRunning: boolean;
// 	unlockPriceResponse: any;
// 	unlockPrice: (
// 		account: string,
// 		keyring: any,
// 		currencyId: string
// 	) => Promise<void>;

// 	isSetDeviationThresholdResponseRunning: boolean;
// 	setDeviationThresholdResponse: any;
// 	setDeviationThreshold: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		newThreshold: string
// 	) => Promise<void>;

// 	isSetBalanceRatioResponseRunning: boolean;
// 	setBalanceRatioResponse: any;
// 	setBalanceRatio: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		newBalanceRatio: string
// 	) => Promise<void>;
// 	getPoolsBalance: () => Promise<void>;
// 	isSetBorrowCapResponseRunning: boolean;
// 	setBorrowCapResponse: any;
// 	setBorrowCap: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		borrowCap: string | undefined
// 	) => Promise<void>;

// 	isSwitchModeResponseRunning: boolean;
// 	switchModeResponse: any;
// 	switchMode: (account: string, keyring: any) => Promise<void>;

// 	isPauseSpecificOperationResponseRunning: boolean;
// 	pauseSpecificOperationResponse: any;
// 	pauseSpecificOperation: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		operation: string
// 	) => Promise<void>;

// 	isUnpauseSpecificOperationResponseRunning: boolean;
// 	unpauseSpecificOperationResponse: any;
// 	unpauseSpecificOperation: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		operation: string
// 	) => Promise<void>;

// 	pauseKeepers: any;
// 	getPauseKeepers: () => Promise<void>;

// 	getLiquidationPoolParams: () => Promise<void>;
// 	setBalancingPeriod: (
// 		account: string,
// 		keyring: any,
// 		newPeriod: string
// 	) => Promise<void>;
// 	setBalancingPeriodResponse: any;
// 	isSetBalancingPeriodResponseRunning: boolean;

// 	liquidationPoolsParams: any;
// }

// export interface CollateralBlockProps {
// 	account: string | null;
// 	keyring: any;

// 	setCollateralFactor: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		newAmount: string
// 	) => Promise<void>;
// 	setThreshold: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		newAmount: string
// 	) => Promise<void>;

// 	isSetThresholdResponseRunning: boolean;
// 	isSetCollateralFactorResponseRunning: boolean;
// }

// export interface ThresholdFormValues {
// 	poolId: string;
// 	newThreshold: string;
// }

// export interface EconomicUpdateControlsProps {
// 	account: string | null;
// 	keyring: any;
// 	setKink: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		kink: string
// 	) => Promise<void>;
// 	setBaseRatePerYear: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		baseRatePerYear: string
// 	) => Promise<void>;
// 	setJumpMultiplierPerYear: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		jumpMultiplierRatePerYear: string
// 	) => Promise<void>;
// 	setMultiplierPerYear: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		multiplierRatePerYear: string
// 	) => Promise<void>;
// 	feedValues: (account: string, keyring: any, values: any) => Promise<void>;
// 	lockPrice: (
// 		account: string,
// 		keyring: any,
// 		currencyId: string
// 	) => Promise<void>;
// 	unlockPrice: (
// 		account: string,
// 		keyring: any,
// 		currencyId: string
// 	) => Promise<void>;
// 	setDeviationThreshold: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		newThreshold: string
// 	) => Promise<void>;
// 	setBalanceRatio: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		newBalanceRatio: string
// 	) => Promise<void>;
// 	setBorrowCap: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		borrowCap: string | undefined
// 	) => Promise<void>;
// 	setBalancingPeriod: (
// 		account: string,
// 		keyring: any,
// 		newPeriod: string
// 	) => Promise<void>;
// 	isSetBalancingPeriodResponseRunning: boolean;
// 	isSetBorrowCapResponseRunning: boolean;
// 	isSetBaseRateYearResponseRunning: boolean;
// 	isSetJumpMultiplierYearResponseRunning: boolean;
// 	isSetKinkResponseRunning: boolean;
// 	isSetMultiplierPerYearResponseRunning: boolean;
// 	isFeedValuesResponseRunning: boolean;
// 	isLockPriceResponseRunning: boolean;
// 	isUnlockPriceResponseRunning: boolean;
// 	isSetDeviationThresholdResponseRunning: boolean;
// 	isSetBalanceRatioResponseRunning: boolean;
// }

// export interface DeviationTresholdFormValues {
// 	poolId: string;
// 	newThreshold: string;
// }
// export interface BalanceRatioFormValues {
// 	poolId: string;
// 	newBalanceRatio: string;
// }

// export interface LiquidationsMaxAttemptsProps {
// 	account: string | null;
// 	keyring: any;
// 	setLiquidationMaxAttempts: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		newMaxValue: string
// 	) => Promise<void>;
// 	isSetLiquidationsMaxAttemptsResponseRunning: boolean;
// }

// export interface LiquidationsMaxAttemptsFormValues {
// 	poolId: string;
// 	newMaxValue: string;
// }

// export interface LoanSizeLiquidationThresholdProps {
// 	account: string | null;
// 	keyring: any;
// 	setLoanSizeLiquidationThreshold: (
// 		account: string,
// 		keyring: any,
// 		poolId: string,
// 		newMaxValue: string
// 	) => Promise<void>;

// 	isSetLoanSizeLiquidationThresholdResponseRunning: boolean;
// }

// export interface LoanSizeLiquidationThresholdFormValues {
// 	poolId: string;
// 	newMinSum: string;
// }

// export interface BalancingPeriod {
// 	newPeriod: string;
// }
