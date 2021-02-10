export const UNDERLYING_ASSETS_TYPES = ['DOT', 'KSM', 'BTC', 'ETH'];

export const WRAP_TOKEN_TYPES = ['MDOT', 'MKSM', 'MBTC', 'METH'];

export const SUPPORT_CURRENCIES = [
	...UNDERLYING_ASSETS_TYPES,
	...WRAP_TOKEN_TYPES,
];

export const BLOCKS_PER_YEAR = 5256000;

export const POOL_OPERATIONS = ['Deposit', 'Redeem', 'Borrow', 'Repay'];

export const API_STATE_READY = 'READY';
export const KEYRING_STATE_READY = 'READY';
