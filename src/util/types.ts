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
	controllerParams: any;
	whitelistMode: any;
	pauseKeepers: any;
	minterestModelParams: any;
	lockedPricesData: any;
	MNTSpeeds: any;
	MNTRate: any;
}

interface ProtocolAdminUpdatesReducerType {
	switchWhitelistModeResponse: BaseAPIResponseType | null;
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
	isPauseOperationResponseRunning: boolean;
	pauseOperationResponse: BaseAPIResponseType | null;
	isResumeOperationResponseRunning: boolean;
	resumeOperationResponse: BaseAPIResponseType | null;
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
	setMinPartialLiquidationSumResponse: BaseAPIResponseType | null;
	isSetMinPartialLiquidationSumResponseRunning: boolean;
	setLiquidationPoolTotalResponse: BaseAPIResponseType | null;
	isSetLiquidationPoolTotalRequestRunning: boolean;
	setLiquidationFeeResponse: BaseAPIResponseType | null;
	isSetLiquidationFeeResponseRunning: boolean;
	setMaxIdealBalanceResponse: BaseAPIResponseType | null;
	isSetMaxIdealBalanceResponseRunning: boolean;
}

interface GovernanceDataReducerType {
	proposals: any;
	proposal: any;
	proposalVoting: any;
}

interface GovernanceUpdatesReducerType {
	isProposeExtrinsicRequestRunning: boolean;
	proposeExtrinsicResponse: BaseAPIResponseType | null;
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
	disableIsCollateralResponse: CollateralAPIResponseType | null;
	enableIsCollateralResponse: CollateralAPIResponseType | null;
	isEnableAsCollateralResponseRunning: boolean;
}

interface DashboardDataReducerType {
	usersBalance: any;
	usersBorrowBalance: any;
	poolsBalance: any;
	poolsBorrowBalance: any;
	ratesData: any;
	balanceAnnotation: any;
	poolUserParams: any;
	userBalanceUSD: any;
	hypotheticalLiquidityData: any;
	operationInfo: OperationInfo | null;
}

interface OperationInfo {
	partialFee: string;
	class: string;
	weight: string;
}

interface DropdownOption {
	key: string;
	text: string;
	value: string;
}

interface ProtocolDataReducerType {
	currencies: string[];
	currenciesOptions: DropdownOption[];
	wrappedCurrencies: string[];
	wrappedCurrenciesOptions: DropdownOption[];
	metadata: Metadata;
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
	dashboardData: DashboardDataReducerType;
	protocolData: ProtocolDataReducerType;
	governanceData: GovernanceDataReducerType;
	governanceUpdates: GovernanceUpdatesReducerType;
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
	protocolData: any;
	governanceData: any;
	governanceUpdates: any;
}

interface Action {
	type: string;
	payload?: any;
}
interface ThunkAction {}

type Dispatch = DispatchType<Action>;
type GetState = () => State;

type ExtrinsicConfig = {
	module: string;
	extrinsicName: string;
	extrinsicParams: any[];
};

interface BaseAPIResponseType {
	isError: boolean;
	errorMessage: string | null;
}

interface CollateralAPIResponseType extends BaseAPIResponseType {
	poolId: string | null;
}

interface Argument {
	name: string;
	type: string;
}

interface Extrinsic {
	name: string;
	args: Argument[];
}

interface MetadataModule {
	name: string;
	extrinsics: Extrinsic[];
}

interface Metadata {
	modules: MetadataModule[];
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
	GovernanceDataReducerType,
	DashboardDataReducerType,
	ProtocolDataReducerType,
	GovernanceUpdatesReducerType,
	DropdownOption,
	BaseAPIResponseType,
	OperationInfo,
	Metadata,
	ExtrinsicConfig,
	Argument,
	Store,
	GetState,
};
