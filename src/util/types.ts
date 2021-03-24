import { Dispatch as DispatchType } from 'redux';

// REDUX
interface AccountReducerType {
	currentAccount: string | null;
	isAdmin: boolean;
	isAdminRequestRunning: boolean;
	keyringState?: string | null;
	keyring?: any | null;
}

interface SubstrateReducerType {
	apiState: string | null;
	api: null;
	apiError: string | null;
}

interface EconomicUpdatesReducerType {
	setBaseRateYearResponse: BaseAPIResponseType | null;
	isSetBaseRateYearResponseRunning: boolean;
	setJumpMultiplierYearResponse: BaseAPIResponseType | null;
	isSetJumpMultiplierYearResponseRunning: boolean;
	setKinkResponse: BaseAPIResponseType | null;
	isSetKinkResponseRunning: boolean;
	setMultiplierPerYearResponse: BaseAPIResponseType | null;
	isSetMultiplierPerYearResponseRunning: boolean;
	feedValuesResponse: BaseAPIResponseType | null;
	isFeedValuesResponseRunning: boolean;
	lockPriceResponse: BaseAPIResponseType | null;
	isLockPriceResponseRunning: boolean;
	unlockPriceResponse: BaseAPIResponseType | null;
	isUnlockPriceResponseRunning: boolean;
	setDeviationThresholdResponse: BaseAPIResponseType | null;
	isSetDeviationThresholdResponseRunning: boolean;
	setBalanceRatioResponse: BaseAPIResponseType | null;
	isSetBalanceRatioResponseRunning: boolean;
	setBorrowCapResponse: BaseAPIResponseType | null;
	isSetBorrowCapResponseRunning: boolean;
	isSetBalancingPeriodResponseRunning: boolean;
	setBalancingPeriodResponse: BaseAPIResponseType | null;
	setInsuranceFactorResponse: BaseAPIResponseType | null;
	isSetInsuranceFactorResponseRunning: boolean;
	setCollateralFactorResponse: BaseAPIResponseType | null;
	isSetCollateralFactorResponseRunning: boolean;
	setThresholdResponse: BaseAPIResponseType | null;
	isSetThresholdResponseRunning: boolean;
	setLiquidationsMaxAttemptsResponse: BaseAPIResponseType | null;
	isSetLiquidationsMaxAttemptsResponseRunning: boolean;
	setLoanSizeLiquidationThresholdResponse: BaseAPIResponseType | null;
	isSetLoanSizeLiquidationThresholdResponseRunning: boolean;

	minterestModelData: any;
	lockedPricesData: any;
	liquidationPoolsBalance: any;
	liquidationPoolBalancingPeriod: any;
	liquidationPoolsParams: any;
}

interface EconomicDataReducerType {
	switchModeResponse: BaseAPIResponseType | null;
	isSwitchModeResponseRunning: boolean;

	isPauseSpecificOperationResponseRunning: boolean;
	pauseSpecificOperationResponse: BaseAPIResponseType | null;

	isUnpauseSpecificOperationResponseRunning: boolean;
	unpauseSpecificOperationResponse: BaseAPIResponseType | null;

	controllerData: any;
	riskManagerData: any;
	whitelistMode: any;
	pauseKeepers: any;
}

interface userFinancialTransactionsReducerType {
	isDepositUnderlyingResponseRunning: boolean;
	depositUnderlyingResponse: BaseAPIResponseType | null;
	isBorrowResponseRunning: boolean;
	borrowResponse: BaseAPIResponseType | null;
	isRedeemResponseRunning: boolean;
	redeemResponse: BaseAPIResponseType | null;
	isRedeemUnderlyingResponseRunning: boolean;
	redeemUnderlyingResponse: BaseAPIResponseType | null;
	isRedeemWrappedResponseRunning: boolean;
	redeemWrappedResponse: BaseAPIResponseType | null;
	isRepayAllResponseRunning: boolean;
	repayAllResponse: BaseAPIResponseType | null;
	isRepayResponseRunning: boolean;
	repayResponse: BaseAPIResponseType | null;
	isRepayOnBehalfResponseRunning: boolean;
	repayOnBehalfResponse: BaseAPIResponseType | null;
	isTransferWrappedResponseRunning: boolean;
	transferWrappedResponse: BaseAPIResponseType | null;
	isDisableCollateralResponseRunning: boolean;
	disableCollateralResponse: CollateralAPIResponseType | null;
	enableAsCollateralResponse: CollateralAPIResponseType | null;
	isEnableAsCollateralResponseRunning: boolean;
}

interface dashboardDataReducerType {
	usersBalance: any;
	usersBorrowBalance: any;
	poolsBalance: any;
	poolsBorrowBalance: any;
	ratesData: any;
	balanceAnnotation: any;
	poolUserDates: any;
}

interface State {
	form: any;
	account: AccountReducerType;
	substrate: SubstrateReducerType;
	economicUpdates: EconomicUpdatesReducerType;
	economicData: EconomicDataReducerType;
	usersFinancialTransactions: userFinancialTransactionsReducerType;
	dashboardData: dashboardDataReducerType;
}
// TODO refactoring types func return type
interface Store {
	form: any;
	account: any;
	substrate: any;
	economicUpdates: any;
	economicData: any;
	usersFinancialTransactions: any;
	dashboardData: any;
}

interface Action {
	type: string;
	payload?: any;
}
interface ThunkAction {}

type Dispatch = DispatchType<Action>;

interface BaseAPIResponseType {
	isError: boolean;
	errorMessage: string | null;
}

interface CollateralAPIResponseType extends BaseAPIResponseType {
	poolId: string | null;
}

// OTHER

export {
	State,
	Action,
	ThunkAction,
	Dispatch,
	AccountReducerType,
	SubstrateReducerType,
	EconomicUpdatesReducerType,
	userFinancialTransactionsReducerType,
	EconomicDataReducerType,
	dashboardDataReducerType,
	BaseAPIResponseType,
	Store,
};
