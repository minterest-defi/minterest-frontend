import { Action } from '../../util/types';

export interface LiquidationAdminProps {
	account: string | null;
	keyring: any;

	getLiquidationPoolsBalance: () => Promise<void>;
	getLiquidationPoolParams: () => Promise<void>;
	getRiskManagerParams: () => Promise<void>;
	getLiquidationBalancingPeriod: () => Promise<void>;
	getPoolsBalance: () => Promise<void>;

	liquidationPoolsBalance: any;
	liquidationPoolsParams: any;
	riskManagerParams: any;
	liquidationPoolBalancingPeriod: any;
	poolsBalance: any;

	resetLiquidationAdminUpdateRequests: () => Action;

	setBalanceRatio: (
		account: string,
		keyring: any,
		poolId: string,
		newBalanceRatio: string
	) => Promise<void>;
	isSetBalanceRatioResponseRunning: boolean;
	setBalanceRatioResponse: any;

	setDeviationThreshold: (
		account: string,
		keyring: any,
		poolId: string,
		newThreshold: string
	) => Promise<void>;
	isSetDeviationThresholdResponseRunning: boolean;
	setDeviationThresholdResponse: any;

	setLiquidationFee: (
		account: string,
		keyring: any,
		poolId: string,
		liquidationFee: string
	) => Promise<void>;
	setLiquidationFeeResponse: any;
	isSetLiquidationFeeResponseRunning: boolean;

	setThreshold: (
		account: string,
		keyring: any,
		poolId: string,
		newAmount: string
	) => Promise<void>;
	isSetThresholdResponseRunning: boolean;
	setThresholdResponse: any;

	setLiquidationMaxAttempts: (
		account: string,
		keyring: any,
		poolId: string,
		newMaxValue: string
	) => Promise<void>;
	setLiquidationsMaxAttemptsResponse: any;
	isSetLiquidationsMaxAttemptsResponseRunning: boolean;

	setLoanSizeLiquidationThreshold: (
		account: string,
		keyring: any,
		poolId: string,
		newMaxValue: string
	) => Promise<void>;
	setLoanSizeLiquidationThresholdResponse: any;
	isSetLoanSizeLiquidationThresholdResponseRunning: boolean;

	setBalancingPeriod: (
		account: string,
		keyring: any,
		newPeriod: string
	) => Promise<void>;
	setBalancingPeriodResponse: any;
	isSetBalancingPeriodResponseRunning: boolean;

	setLiquidationPoolTotalResponse: any;
	isSetLiquidationPoolTotalRequestRunning: boolean;
	setLiquidationPoolTotal: (
		account: string,
		keyring: any,
		currencyId: string,
		amount: string
	) => Promise<void>;
}

export interface LiquidationPoolsConfigurationDataProps {
	liquidationPoolsBalance: any;
	liquidationPoolsParams: any;
	riskManagerParams: any;
	liquidationPoolBalancingPeriod: any;
	poolsBalance: any;
}

export interface LiquidationPoolsConfigurationUpdatesProps {
	account: string | null;
	keyring: any;

	setBalanceRatio: (
		account: string,
		keyring: any,
		poolId: string,
		newBalanceRatio: string
	) => Promise<void>;
	isSetBalanceRatioResponseRunning: boolean;

	setDeviationThreshold: (
		account: string,
		keyring: any,
		poolId: string,
		newThreshold: string
	) => Promise<void>;
	isSetDeviationThresholdResponseRunning: boolean;

	setLiquidationFee: (
		account: string,
		keyring: any,
		poolId: string,
		liquidationFee: string
	) => Promise<void>;
	isSetLiquidationFeeResponseRunning: boolean;

	setThreshold: (
		account: string,
		keyring: any,
		poolId: string,
		newAmount: string
	) => Promise<void>;
	isSetThresholdResponseRunning: boolean;

	setLiquidationMaxAttempts: (
		account: string,
		keyring: any,
		poolId: string,
		newMaxValue: string
	) => Promise<void>;
	isSetLiquidationsMaxAttemptsResponseRunning: boolean;

	setLoanSizeLiquidationThreshold: (
		account: string,
		keyring: any,
		poolId: string,
		newMaxValue: string
	) => Promise<void>;
	isSetLoanSizeLiquidationThresholdResponseRunning: boolean;

	setBalancingPeriod: (
		account: string,
		keyring: any,
		newPeriod: string
	) => Promise<void>;
	isSetBalancingPeriodResponseRunning: boolean;

	setLiquidationPoolTotal: (
		account: string,
		keyring: any,
		currencyId: string,
		amount: string
	) => Promise<void>;
	isSetLiquidationPoolTotalRequestRunning: boolean;
}

export interface BalanceRatioFormValues {
	poolId: string;
	newBalanceRatio: string;
}

export interface DeviationTresholdFormValues {
	poolId: string;
	newThreshold: string;
}

export interface LiquidationIncentiveFormValues {
	poolId: string;
	liquidationFee: string;
}

export interface ThresholdFormValues {
	poolId: string;
	newThreshold: string;
}

export interface LiquidationsMaxAttemptsFormValues {
	poolId: string;
	newMaxValue: string;
}

export interface LoanSizeLiquidationThresholdFormValues {
	poolId: string;
	newMinSum: string;
}

export interface BalancingPeriod {
	newPeriod: string;
}

export interface SetLiquidationPoolTotalFormValues {
	currencyId: string;
	amount: string;
}
