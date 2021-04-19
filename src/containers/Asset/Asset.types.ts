export interface AssetProps {
	disableIsCollateral: (
		account: string,
		keyring: any,
		underlyingAssetId: string
	) => Promise<void>;
	enableIsCollateral: (
		account: string,
		keyring: any,
		underlyingAssetId: string
	) => Promise<void>;
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
