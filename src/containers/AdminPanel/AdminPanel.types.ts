import { Action } from '../../util/types';

export interface AdminPanelProps {
	account: string | null;
	keyring: any;

	getMinterestModel: () => Promise<void>;
	getControllerData: () => Promise<void>;
	getRiskManagerData: () => Promise<void>;
	getLockedPrices: () => Promise<void>;
	getLiquidationPoolsBalance: () => Promise<void>;
	getLiquidationBalancingPeriod: () => Promise<void>;
	getWhitelistMode: () => Promise<void>;

	minterestModelData: any;
	controllerData: any;
	riskManagerData: any;
	lockedPricesData: any;
	liquidationPoolsBalance: any;
	liquidationPoolBalancingPeriod: any;
	whitelistMode: any;
	poolsBalance: any;

	resetEconomicUpdateRequests: () => Action;

	setKink: (
		account: string,
		keyring: any,
		poolId: string,
		kink: string
	) => Promise<void>;
	setKinkResponse: any;
	isSetKinkResponseRunning: boolean;

	setBaseRatePerYear: (
		account: string,
		keyring: any,
		poolId: string,
		baseRatePerYear: string
	) => Promise<void>;
	setBaseRateYearResponse: any;
	isSetBaseRateYearResponseRunning: boolean;

	setJumpMultiplierPerYear: (
		account: string,
		keyring: any,
		poolId: string,
		jumpMultiplierRatePerYear: string
	) => Promise<void>;
	setJumpMultiplierYearResponse: any;
	isSetJumpMultiplierYearResponseRunning: boolean;

	setMultiplierPerYear: (
		account: string,
		keyring: any,
		poolId: string,
		multiplierRatePerYear: string
	) => Promise<void>;
	setMultiplierPerYearResponse: any;
	isSetMultiplierPerYearResponseRunning: boolean;

	setInsuranceFactor: (
		account: string,
		keyring: any,
		poolId: string,
		newAmount: string
	) => Promise<void>;
	setInsuranceFactorResponse: any;
	isSetInsuranceFactorResponseRunning: boolean;

	setLiquidationMaxAttempts: (
		account: string,
		keyring: any,
		poolId: string,
		newMaxValue: string
	) => Promise<void>;
	setLiquidationsMaxAttemptsResponse: any;
	isSetLiquidationsMaxAttemptsResponseRunning: boolean;

	setCollateralFactor: (
		account: string,
		keyring: any,
		poolId: string,
		newAmount: string
	) => Promise<void>;
	setThreshold: (
		account: string,
		keyring: any,
		poolId: string,
		newAmount: string
	) => Promise<void>;
	setLoanSizeLiquidationThreshold: (
		account: string,
		keyring: any,
		poolId: string,
		newMaxValue: string
	) => Promise<void>;

	setLoanSizeLiquidationThresholdResponse: any;
	isSetLoanSizeLiquidationThresholdResponseRunning: boolean;

	isSetThresholdResponseRunning: boolean;
	setThresholdResponse: any;
	isSetCollateralFactorResponseRunning: boolean;
	setCollateralFactorResponse: any;

	isFeedValuesResponseRunning: boolean;
	feedValuesResponse: any;
	feedValues: (account: string, keyring: any, values: any) => Promise<void>;

	isLockPriceResponseRunning: boolean;
	lockPriceResponse: any;
	lockPrice: (
		account: string,
		keyring: any,
		currencyId: string
	) => Promise<void>;

	isUnlockPriceResponseRunning: boolean;
	unlockPriceResponse: any;
	unlockPrice: (
		account: string,
		keyring: any,
		currencyId: string
	) => Promise<void>;

	isSetDeviationThresholdResponseRunning: boolean;
	setDeviationThresholdResponse: any;
	setDeviationThreshold: (
		account: string,
		keyring: any,
		poolId: string,
		newThreshold: string
	) => Promise<void>;

	isSetBalanceRatioResponseRunning: boolean;
	setBalanceRatioResponse: any;
	setBalanceRatio: (
		account: string,
		keyring: any,
		poolId: string,
		newBalanceRatio: string
	) => Promise<void>;
	getPoolsBalance: () => Promise<void>;
	isSetBorrowCapResponseRunning: boolean;
	setBorrowCapResponse: any;
	setBorrowCap: (
		account: string,
		keyring: any,
		poolId: string,
		borrowCap: string | undefined
	) => Promise<void>;

	isSwitchModeResponseRunning: boolean;
	switchModeResponse: any;
	switchMode: (account: string, keyring: any) => Promise<void>;

	isPauseSpecificOperationResponseRunning: boolean;
	pauseSpecificOperationResponse: any;
	pauseSpecificOperation: (
		account: string,
		keyring: any,
		poolId: string,
		operation: string
	) => Promise<void>;

	isUnpauseSpecificOperationResponseRunning: boolean;
	unpauseSpecificOperationResponse: any;
	unpauseSpecificOperation: (
		account: string,
		keyring: any,
		poolId: string,
		operation: string
	) => Promise<void>;

	pauseKeepers: any;
	getPauseKeepers: () => Promise<void>;

	getLiquidationPoolParams: () => Promise<void>;
	setBalancingPeriod: (
		account: string,
		keyring: any,
		newPeriod: string
	) => Promise<void>;
	setBalancingPeriodResponse: any;
	isSetBalancingPeriodResponseRunning: boolean;

	liquidationPoolsParams: any;

	getMNTRate: () => Promise<void>;
	getMNTSpeeds: () => Promise<void>;

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
	setMNTRateForSide: (
		account: string,
		keyring: any,
		rateForSide: string
	) => Promise<void>;

	MNTRate: any;
	MNTSpeeds: any;

	isSetMNTRateRequestRunning: boolean;
	setMNTRateResponse: any;

	isToggleMNTMintingRequestRunning: boolean;
	toggleMNTMintingResponse: any;
}

export interface CollateralBlockProps {
	account: string | null;
	keyring: any;

	setCollateralFactor: (
		account: string,
		keyring: any,
		poolId: string,
		newAmount: string
	) => Promise<void>;
	setThreshold: (
		account: string,
		keyring: any,
		poolId: string,
		newAmount: string
	) => Promise<void>;

	isSetThresholdResponseRunning: boolean;
	isSetCollateralFactorResponseRunning: boolean;
}

export interface CollateralFactorFormValues {
	poolId: string;
	newAmount: string;
}

export interface ThresholdFormValues {
	poolId: string;
	newThreshold: string;
}

export interface EconomicParametersProps {
	minterestModelData: any;
	controllerData: any;
	riskManagerData: any;
	liquidationPoolsParams: any;
	lockedPricesData: any;
	liquidationPoolsBalance: any;
	liquidationPoolBalancingPeriod: any;
	poolsBalance: any;
}

export interface EconomicUpdateControlsProps {
	account: string | null;
	keyring: any;
	setKink: (
		account: string,
		keyring: any,
		poolId: string,
		kink: string
	) => Promise<void>;
	setBaseRatePerYear: (
		account: string,
		keyring: any,
		poolId: string,
		baseRatePerYear: string
	) => Promise<void>;
	setJumpMultiplierPerYear: (
		account: string,
		keyring: any,
		poolId: string,
		jumpMultiplierRatePerYear: string
	) => Promise<void>;
	setMultiplierPerYear: (
		account: string,
		keyring: any,
		poolId: string,
		multiplierRatePerYear: string
	) => Promise<void>;
	feedValues: (account: string, keyring: any, values: any) => Promise<void>;
	lockPrice: (
		account: string,
		keyring: any,
		currencyId: string
	) => Promise<void>;
	unlockPrice: (
		account: string,
		keyring: any,
		currencyId: string
	) => Promise<void>;
	setDeviationThreshold: (
		account: string,
		keyring: any,
		poolId: string,
		newThreshold: string
	) => Promise<void>;
	setBalanceRatio: (
		account: string,
		keyring: any,
		poolId: string,
		newBalanceRatio: string
	) => Promise<void>;
	setBorrowCap: (
		account: string,
		keyring: any,
		poolId: string,
		borrowCap: string | undefined
	) => Promise<void>;
	setBalancingPeriod: (
		account: string,
		keyring: any,
		newPeriod: string
	) => Promise<void>;
	isSetBalancingPeriodResponseRunning: boolean;
	isSetBorrowCapResponseRunning: boolean;
	isSetBaseRateYearResponseRunning: boolean;
	isSetJumpMultiplierYearResponseRunning: boolean;
	isSetKinkResponseRunning: boolean;
	isSetMultiplierPerYearResponseRunning: boolean;
	isFeedValuesResponseRunning: boolean;
	isLockPriceResponseRunning: boolean;
	isUnlockPriceResponseRunning: boolean;
	isSetDeviationThresholdResponseRunning: boolean;
	isSetBalanceRatioResponseRunning: boolean;
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
export interface DeviationTresholdFormValues {
	poolId: string;
	newThreshold: string;
}
export interface BalanceRatioFormValues {
	poolId: string;
	newBalanceRatio: string;
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

export interface MNTRateProps {
	account: string | null;
	keyring: any;
	MNTRate: any;
	MNTSpeeds: any;
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
	setMNTRateForSide: (
		account: string,
		keyring: any,
		rateForSide: string
	) => Promise<void>;
	isSetMNTRateRequestRunning: boolean;
	isToggleMNTMintingRequestRunning: boolean;
}

export interface MNTRateForSideFormValues {
	rateForSide: string;
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

export interface ProtocolOperationModeProps {
	account: string | null;
	keyring: any;
	whitelistMode: string;
	switchMode: (account: string, keyring: any) => Promise<void>;
	isSwitchModeResponseRunning: boolean;
}

export interface LiquidationsMaxAttemptsProps {
	account: string | null;
	keyring: any;
	setLiquidationMaxAttempts: (
		account: string,
		keyring: any,
		poolId: string,
		newMaxValue: string
	) => Promise<void>;
	isSetLiquidationsMaxAttemptsResponseRunning: boolean;
}

export interface LiquidationsMaxAttemptsFormValues {
	poolId: string;
	newMaxValue: string;
}

export interface LoanSizeLiquidationThresholdProps {
	account: string | null;
	keyring: any;
	setLoanSizeLiquidationThreshold: (
		account: string,
		keyring: any,
		poolId: string,
		newMaxValue: string
	) => Promise<void>;

	isSetLoanSizeLiquidationThresholdResponseRunning: boolean;
}

export interface LoanSizeLiquidationThresholdFormValues {
	poolId: string;
	newMinSum: string;
}

export interface BorrowCapFormValues {
	poolId: string;
	borrowCap: string;
}

export interface BalancingPeriod {
	newPeriod: string;
}
