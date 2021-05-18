export interface AssetsProps {
	currencies: string[];
	wrappedCurrencies: string[];
	currentAccount: string | null;
	userBalanceUSD: any;
	poolUserParams: any;
	usersBalance: any;

	resetUserData: () => void;

	getPoolsBalance: () => Promise<void>;
	getPoolsBorrowBalance: () => Promise<void>;
	getRatesData: () => Promise<void>;

	getUserBalance: (account: string) => Promise<void>;
	getPoolUserParams: (account: string) => Promise<void>;
	getUserBalanceUSD: (account: string) => Promise<void>;
	getUserBorrowPerAsset: (account: string) => Promise<void>;

	poolsBalance: any;
	poolsBorrowBalance: any;
	ratesData: any;
	userBorrowPerAsset: any;
}
