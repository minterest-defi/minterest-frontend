export interface AssetProps {
	currencies: string[];
	wrappedCurrencies: string[];
	currentAccount: string;

	pricesData: any;
	getUserPrices: () => Promise<void>;

	resetDashboardData: () => void;
	userBalanceUSD: any;
	hypotheticalLiquidityData: any;
	accountCollateral: any;
	userBorrowPerAsset: any;

	poolUserParams: any;
	usersBalance: any;
	getUserBalance: (account: string) => Promise<void>;
	getPoolUserParams: (account: string) => Promise<void>;
	getHypotheticalLiquidityData: (account: string) => Promise<void>;
	getAccountCollateral: (account: string) => Promise<void>;
	getUserBorrowPerAsset: (account: string) => Promise<void>;
	getControllerParams: () => Promise<void>;
	controllerParams: any;

	depositUnderlying: (
		keyring: any,
		account: string,
		underlyingAssetId: string,
		underlyingAmount: string
	) => Promise<void>;
	redeemUnderlying: (
		keyring: any,
		account: string,
		underlyingAssetId: string,
		underlyingAmount: string
	) => Promise<void>;
	repay: (
		keyring: any,
		account: string,
		underlyingAssetId: string,
		repayAmount: string
	) => Promise<void>;
	borrow: (
		keyring: any,
		account: string,
		underlyingAssetId: string,
		borrowAmount: string
	) => Promise<void>;

	resetUserRequests: () => void;

	//api
	isEnableAsCollateralResponseRunning: boolean;
	enableIsCollateralResponse: any;
	isDisableCollateralResponseRunning: boolean;
	disableIsCollateralResponse: any;
	isDepositUnderlyingResponseRunning: boolean;
	depositUnderlyingResponse: any;
	isRedeemResponseRunning: boolean;
	redeemResponse: any;
	isRepayResponseRunning: boolean;
	repayResponse: any;
	isBorrowResponseRunning: boolean;
	borrowResponse: any;
	isRepayAllResponseRunning: boolean;
	repayAllResponse: any;
	isRedeemUnderlyingResponseRunning: boolean;
	redeemUnderlyingResponse: any;
}

export interface AssetParams {
	assetId: string;
}
