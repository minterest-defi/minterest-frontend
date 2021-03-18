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
	setBaseRateBlockResponse: BaseAPIResponseType | null;
	isSetBaseRateBlockResponseRunning: boolean;
	setJumpMultiplierBlockResponse: BaseAPIResponseType | null;
	isSetJumpMultiplierBlockResponseRunning: boolean;
	setKinkResponse: BaseAPIResponseType | null;
	isSetKinkResponseRunning: boolean;
	setMultiplierPerBlockResponse: BaseAPIResponseType | null;
	isSetMultiplierPerBlockResponseRunning: boolean;
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

	minterestModelData: any;
	lockedPricesData: any;
	liquidationPoolsBalance: any;
	liquidationPoolsParameters: any;
}

interface AdminReducerType {
	setInsuranceFactorResponse: BaseAPIResponseType | null;
	isSetInsuranceFactorResponseRunning: boolean;
	setLiquidationsMaxAttemptsResponse: BaseAPIResponseType | null;
	isSetLiquidationsMaxAttemptsResponseRunning: boolean;
	setCollateralFactorResponse: BaseAPIResponseType | null;
	isSetCollateralFactorResponseRunning: boolean;
	setCollateralThresholdResponse: BaseAPIResponseType | null;
	isSetCollateralThresholdResponseRunning: boolean;
	setLoanSizeLiquidationThresholdResponse: BaseAPIResponseType | null;
	isSetLoanSizeLiquidationThresholdResponseRunning: boolean;
	switchModeResponse: BaseAPIResponseType | null;
	isSwitchModeResponseRunning: boolean;

	controllerData: any;
	riskManagerData: any;
	whitelistMode: any;
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
}

interface dashboardDataReducerType {
	usersBalance: any;
	usersBorrowBalance: any;
	poolsBalance: any;
	poolsBorrowBalance: any;
	ratesData: any;
	balanceAnnotation: any;
}

interface State {
	form: any;
	account: AccountReducerType;
	substrate: SubstrateReducerType;
	economicUpdates: EconomicUpdatesReducerType;
	admin: AdminReducerType;
	usersFinancialTransactions: userFinancialTransactionsReducerType;
	dashboardData: dashboardDataReducerType;
}
// TODO refactoring types func return type
interface Store {
	form: any;
	account: any;
	substrate: any;
	economicUpdates: any;
	admin: any;
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
	AdminReducerType,
	dashboardDataReducerType,
	BaseAPIResponseType,
	Store,
};
