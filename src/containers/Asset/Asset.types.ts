export interface AssetProps {
	currencies: string[];
	wrappedCurrencies: string[];
	currentAccount: string;

	pricesData: any;
	getUserPrices: () => Promise<void>;

	resetDashboardData: () => void;
	userBalanceUSD: any;
	hypotheticalLiquidityData: any;

	poolUserParams: any;
	usersBalance: any;
	getUserBalance: (account: string) => Promise<void>;
	getPoolUserParams: (account: string) => Promise<void>;
	getHypotheticalLiquidityData: (account: string) => Promise<void>;

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
}

export interface AssetParams {
	assetId: string;
}
