export interface AssetProps {
	currencies: string[];
	wrappedCurrencies: string[];
	currentAccount: string;

	lockedPricesData: any;
	getLockedPrices: () => Promise<void>;

	resetDashboardData: () => void;

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
}

export interface AssetParams {
	assetId: string;
}
