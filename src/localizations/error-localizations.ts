import LocalizedStrings from 'react-localization';

export const ERRORS = new LocalizedStrings({
	en: {
		NotValidUnderlyingAssetId: 'The currency is not enabled in protocol.',
		NotValidWrappedTokenId: 'The currency is not enabled in wrapped protocol.',
		NotEnoughLiquidityAvailable:
			'There is not enough liquidity available in the pool.',
		NotEnoughWrappedTokens: 'Insufficient wrapped tokens in the user account.',
		NotEnoughUnderlyingsAssets:
			'Insufficient underlying assets in the user account.',
		InternalPoolError: 'PoolNotFound or NotEnoughBalance or BalanceOverflowed.',
		NumOverflow: 'Number overflow in calculation.',
		PoolNotFresh:
			'The block number in the pool is equal to the current block number.',
		AccrueInterestFailed:
			'An internal failure occurred in the execution of the Accrue Interest function.',
		DepositControllerRejection:
			'Deposit was blocked due to Controller rejection.',
		RedeemControllerRejection:
			'Redeem was blocked due to Controller rejection.',
		BorrowControllerRejection:
			'Borrow was blocked due to Controller rejection.',
		RepayBorrowControllerRejection:
			'Repay was blocked due to Controller rejection.',
	},
});
