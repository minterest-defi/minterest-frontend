export const toUnderlyingCurrencyIdAPI = (currencyId: string) => ({
	UnderlyingAsset: currencyId,
});

export const toWrappedCurrencyIdAPI = (currencyId: string) => ({
	WrappedToken: currencyId,
});
