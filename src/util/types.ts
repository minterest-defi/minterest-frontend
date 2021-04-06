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

interface ProtocolAdminDataReducerType {
	controllerData: any;
	whitelistMode: any;
	pauseKeepers: any;
	minterestModelData: any;
	lockedPricesData: any;
	MNTSpeeds: any;
	MNTRate: any;
}

interface ProtocolAdminUpdatesReducerType {
	switchModeResponse: BaseAPIResponseType | null;
	isSwitchModeResponseRunning: boolean;
	setProtocolInterestFactorResponse: BaseAPIResponseType | null;
	isSetProtocolInterestFactorResponseRunning: boolean;
	setProtocolInterestThresholdResponse: BaseAPIResponseType | null;
	isSetProtocolInterestThresholdResponseRunning: boolean;
	setCollateralFactorResponse: BaseAPIResponseType | null;
	isSetCollateralFactorResponseRunning: boolean;
	setBaseRateYearResponse: BaseAPIResponseType | null;
	isSetBaseRateYearResponseRunning: boolean;
	setMultiplierPerYearResponse: BaseAPIResponseType | null;
	isSetMultiplierPerYearResponseRunning: boolean;
	setKinkResponse: BaseAPIResponseType | null;
	isSetKinkResponseRunning: boolean;
	setJumpMultiplierYearResponse: BaseAPIResponseType | null;
	isSetJumpMultiplierYearResponseRunning: boolean;
	setBorrowCapResponse: BaseAPIResponseType | null;
	isSetBorrowCapResponseRunning: boolean;
	isPauseSpecificOperationResponseRunning: boolean;
	pauseSpecificOperationResponse: BaseAPIResponseType | null;
	isUnpauseSpecificOperationResponseRunning: boolean;
	unpauseSpecificOperationResponse: BaseAPIResponseType | null;
	lockPriceResponse: BaseAPIResponseType | null;
	isLockPriceResponseRunning: boolean;
	unlockPriceResponse: BaseAPIResponseType | null;
	isUnlockPriceResponseRunning: boolean;
	feedValuesResponse: BaseAPIResponseType | null;
	isFeedValuesResponseRunning: boolean;
	toggleMNTMintingResponse: BaseAPIResponseType | null;
	isToggleMNTMintingRequestRunning: boolean;
	setMNTRateResponse: BaseAPIResponseType | null;
	isSetMNTRateRequestRunning: boolean;
	mintToggleCurrencyId: string | null;
}

interface LiquidationAdminDataReducerType {
	liquidationPoolsBalance: any;
	liquidationPoolsParams: any;
	riskManagerParams: any;
	liquidationPoolBalancingPeriod: any;
}

interface LiquidationAdminUpdatesReducerType {
	setDeviationThresholdResponse: BaseAPIResponseType | null;
	isSetDeviationThresholdResponseRunning: boolean;
	setBalanceRatioResponse: BaseAPIResponseType | null;
	isSetBalanceRatioResponseRunning: boolean;
	isSetBalancingPeriodResponseRunning: boolean;
	setBalancingPeriodResponse: BaseAPIResponseType | null;
	setThresholdResponse: BaseAPIResponseType | null;
	isSetThresholdResponseRunning: boolean;
	setLiquidationsMaxAttemptsResponse: BaseAPIResponseType | null;
	isSetLiquidationsMaxAttemptsResponseRunning: boolean;
	setLoanSizeLiquidationThresholdResponse: BaseAPIResponseType | null;
	isSetLoanSizeLiquidationThresholdResponseRunning: boolean;
	setLiquidationPoolTotalResponse: BaseAPIResponseType | null;
	isSetLiquidationPoolTotalRequestRunning: boolean;
	setLiquidationIncentiveResponse: BaseAPIResponseType | null;
	isSetLiquidationIncentiveResponseRunning: boolean;
}

interface DashboardUpdatesReducerType {
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
	userBalanceUSD: any;
}

interface State {
	form: any;
	account: AccountReducerType;
	substrate: SubstrateReducerType;
	protocolAdminData: ProtocolAdminDataReducerType;
	protocolAdminUpdates: ProtocolAdminUpdatesReducerType;
	liquidationAdminData: LiquidationAdminDataReducerType;
	liquidationAdminUpdates: LiquidationAdminUpdatesReducerType;
	dashboardUpdates: DashboardUpdatesReducerType;
	dashboardData: dashboardDataReducerType;
}
// TODO refactoring types func return type
interface Store {
	form: any;
	account: any;
	substrate: any;
	dashboardData: any;
	dashboardUpdates: any;
	protocolAdminData: any;
	protocolAdminUpdates: any;
	liquidationAdminData: any;
	liquidationAdminUpdates: any;
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
	DashboardUpdatesReducerType,
	ProtocolAdminDataReducerType,
	ProtocolAdminUpdatesReducerType,
	LiquidationAdminDataReducerType,
	LiquidationAdminUpdatesReducerType,
	dashboardDataReducerType,
	BaseAPIResponseType,
	Store,
};
