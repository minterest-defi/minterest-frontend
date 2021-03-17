import { Action } from '../../util/types';
// TODO any types
export interface AdminPanelProps {
	account: string | null;
	api: any;
	keyring: any;

	getMinterestModel: () => Promise<void>;
	getControllerData: () => Promise<void>;
	getRiskManagerData: () => Promise<void>;
	getLockedPrices: () => Promise<void>;
	getLiquidationPoolsBalance: () => Promise<void>;
	getLiquidationPoolsParameters: () => Promise<void>;
	getWhitelistMode: () => Promise<void>;

	minterestModelData: any;
	controllerData: any;
	riskManagerData: any;
	lockedPricesData: any;
	liquidationPoolsBalance: any;
	liquidationPoolsParameters: any;
	whitelistMode: any;
	poolsBalance: any;

	resetEconomicUpdateRequests: () => Action;
	resetAdminRequests: () => Action;

	setKink: (
		account: string,
		keyring: any,
		poolId: string,
		kinkNominator: string,
		kinkDivider: string
	) => Promise<void>;
	setKinkResponse: any;
	isSetKinkResponseRunning: boolean;

	setBaseRatePerBlock: (
		account: string,
		keyring: any,
		poolId: string,
		baseRatePerYearN: string,
		baseRatePerYearD: string
	) => Promise<void>;
	setBaseRateBlockResponse: any;
	isSetBaseRateBlockResponseRunning: boolean;

	setJumpMultiplierPerBlock: (
		account: string,
		keyring: any,
		poolId: string,
		jumpMultiplierRatePerYearN: string,
		jumpMultiplierRatePerYearD: string
	) => Promise<void>;
	setJumpMultiplierBlockResponse: any;
	isSetJumpMultiplierBlockResponseRunning: boolean;

	setMultiplierPerBlock: (
		account: string,
		keyring: any,
		poolId: string,
		multiplierRatePerYearN: string,
		multiplierRatePerYearD: string
	) => Promise<void>;
	setMultiplierPerBlockResponse: any;
	isSetMultiplierPerBlockResponseRunning: boolean;

	setInsuranceFactor: (
		account: string,
		keyring: any,
		poolId: string,
		newAmountN: string,
		newAmountD: string
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
		newAmountN: string,
		newAmountD: string
	) => Promise<void>;
	setCollateralThreshold: (
		account: string,
		keyring: any,
		poolId: string,
		newAmountN: string,
		newAmountD: string
	) => Promise<void>;
	setLoanSizeLiquidationThreshold: (
		account: string,
		keyring: any,
		poolId: string,
		newMaxValue: string
	) => Promise<void>;

	setLoanSizeLiquidationThresholdResponse: any;
	isSetLoanSizeLiquidationThresholdResponseRunning: boolean;

	isSetCollateralThresholdResponseRunning: boolean;
	setCollateralThresholdResponse: any;
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
}

export interface CollateralBlockProps {
	account: string | null;
	keyring: any;

	setCollateralFactor: (
		account: string,
		keyring: any,
		poolId: string,
		newAmountN: string,
		newAmountD: string
	) => Promise<void>;
	setCollateralThreshold: (
		account: string,
		keyring: any,
		poolId: string,
		newAmountN: string,
		newAmountD: string
	) => Promise<void>;

	isSetCollateralThresholdResponseRunning: boolean;
	isSetCollateralFactorResponseRunning: boolean;
}

export interface CollateralFactorFormValues {
	poolId: string;
	newAmountN: string;
	newAmountD: string;
}

export interface CollateralThresholdFormValues {
	poolId: string;
	newThresholdN: string;
	newThresholdD: string;
}

export interface EconomicParametersProps {
	minterestModelData: any;
	controllerData: any;
	riskManagerData: any;
	lockedPricesData: any;
	liquidationPoolsBalance: any;
	liquidationPoolsParameters: any;
	poolsBalance: any;
}

export interface EconomicUpdateControlsProps {
	account: string | null;
	keyring: any;
	setKink: (
		account: string,
		keyring: any,
		poolId: string,
		kinkNominator: string,
		kinkDivider: string
	) => Promise<void>;
	setBaseRatePerBlock: (
		account: string,
		keyring: any,
		poolId: string,
		baseRatePerYearN: string,
		baseRatePerYearD: string
	) => Promise<void>;
	setJumpMultiplierPerBlock: (
		account: string,
		keyring: any,
		poolId: string,
		jumpMultiplierRatePerYearN: string,
		jumpMultiplierRatePerYearD: string
	) => Promise<void>;
	setMultiplierPerBlock: (
		account: string,
		keyring: any,
		poolId: string,
		multiplierRatePerYearN: string,
		multiplierRatePerYearD: string
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
	isSetBorrowCapResponseRunning: boolean;
	isSetBaseRateBlockResponseRunning: boolean;
	isSetJumpMultiplierBlockResponseRunning: boolean;
	isSetKinkResponseRunning: boolean;
	isSetMultiplierPerBlockResponseRunning: boolean;
	isFeedValuesResponseRunning: boolean;
	isLockPriceResponseRunning: boolean;
	isUnlockPriceResponseRunning: boolean;
	isSetDeviationThresholdResponseRunning: boolean;
	isSetBalanceRatioResponseRunning: boolean;
}

export interface BaseRatePerBlockFormValues {
	poolId: string;
	baseRatePerYearN: string;
	baseRatePerYearD: string;
}

export interface JumpMultiplierPerBlockFormValues {
	poolId: string;
	jumpMultiplierRatePerYearN: string;
	jumpMultiplierRatePerYearD: string;
}

export interface KinkFormValues {
	poolId: string;
	kinkNominator: string;
	kinkDivider: string;
}
export interface MultiplierPerFormValues {
	poolId: string;
	multiplierRatePerYearN: string;
	multiplierRatePerYearD: string;
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
		newAmountN: string,
		newAmountD: string
	) => Promise<void>;
	isSetInsuranceFactorResponseRunning: boolean;
}

export interface InsuranceFactorFormValues {
	poolId: string;
	newAmountN: string;
	newAmountD: string;
}

export interface Flag {
	currency: string;
	deposit: string;
	redeem: string;
	borrow: string;
	repay: string;
}

export interface PoolOperationsStatusesProps {
	poolOperationData: any;
}

export interface PoolOperationsSwitchProps {
	api: any;
	keyring: any;
	account: string | null;
	getPoolOperationStatuses: () => Promise<void>;
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
