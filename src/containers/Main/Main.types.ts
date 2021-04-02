export interface MainProps {
	keyring: any;
	account: string | null;

	userBalanceUSD: any;
	getUserBalanceUSD: (account: string) => Promise<void>;

	depositUnderlying: (
		keyring: any,
		account: string,
		underlyingAssetId: string,
		underlyingAmount: string
	) => Promise<void>;
	depositUnderlyingResponse: any;
	isDepositUnderlyingResponseRunning: boolean;

	borrow: (
		keyring: any,
		account: string,
		underlyingAssetId: string,
		borrowAmount: string
	) => Promise<void>;
	borrowResponse: any;
	isBorrowResponseRunning: boolean;

	redeem: (
		keyring: any,
		account: string,
		underlyingAssetId: string
	) => Promise<void>;
	redeemResponse: any;
	isRedeemResponseRunning: boolean;

	redeemUnderlying: (
		keyring: any,
		account: string,
		underlyingAssetId: string,
		underlyingAmount: string
	) => Promise<void>;
	redeemUnderlyingResponse: any;
	isRedeemUnderlyingResponseRunning: boolean;

	redeemWrapped: (
		keyring: any,
		account: string,
		wrappedId: string,
		wrappedAmount: string
	) => Promise<void>;
	redeemWrappedResponse: any;
	isRedeemWrappedResponseRunning: boolean;

	repayAll: (
		keyring: any,
		account: string,
		underlyingAssetId: string
	) => Promise<void>;
	repayAllResponse: any;
	isRepayAllResponseRunning: boolean;

	repay: (
		keyring: any,
		account: string,
		underlyingAssetId: string,
		repayAmount: string
	) => Promise<void>;
	repayResponse: any;
	isRepayResponseRunning: boolean;

	repayOnBehalf: (
		keyring: any,
		account: string,
		underlyingAssetId: string,
		borrower: string,
		repayAmount: string
	) => Promise<void>;
	repayOnBehalfResponse: any;
	isRepayOnBehalfResponseRunning: boolean;

	transferWrapped: (
		keyring: any,
		account: string,
		receiver: string,
		wrappedId: string,
		transferAmount: string
	) => Promise<void>;
	transferWrappedResponse: any;
	isTransferWrappedResponseRunning: boolean;

	getUserBalance: (account: string) => Promise<void>;
	usersBalance: any;

	getUserBorrowBalance: (account: string) => Promise<void>;
	usersBorrowBalance: any;

	getPoolsBalance: () => Promise<void>;
	poolsBalance: any;

	getPoolsBorrowBalance: () => Promise<void>;
	poolsBorrowBalance: any;

	getRatesData: () => Promise<void>;
	ratesData: any;

	resetDashboardData: () => Promise<void>;
	resetUserData: () => Promise<void>;
	resetUserRequests: () => Promise<void>;

	disableCollateral: (
		account: string,
		keyring: any,
		poolId: string
	) => Promise<void>;
	disableCollateralResponse: any;
	isDisableCollateralResponseRunning: boolean;

	enableAsCollateral: (
		account: string,
		keyring: any,
		poolId: string
	) => Promise<void>;
	enableAsCollateralResponse: any;
	isEnableAsCollateralResponseRunning: boolean;

	getPoolUserDates: (account: string) => Promise<void>;
	poolUserDates: any;
}
