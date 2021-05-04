export const BLOCKS_PER_YEAR = 5256000;

export const SAFE_OVERSUPPLY_LIMIT = 80;

export const EMPTY_VALUE = 'N/A';

export const POOL_OPERATIONS = [
	'Deposit',
	'Redeem',
	'Borrow',
	'Repay',
	'Transfer',
];

export const API_STATE_INIT = 'CONNECT_INIT';
export const API_STATE_CONNECTING = 'CONNECTING';
export const API_STATE_ERROR = 'ERROR';
export const API_STATE_READY = 'READY';
export const KEYRING_STATE_READY = 'READY';

export const MESSAGE_SUCCESS = 'Transaction completed successfully.';

export const MESSAGE_NEW_LOAN_VALUE_WARNING =
	'This operation will make you close to insolvency. Please, keep at least 20% of your collateral as a buffer.';

export const OPERATIONS = {
	DISABLE_IS_COLLATERAL: 'DISABLE_IS_COLLATERAL',
	ENABLE_IS_COLLATERAL: 'ENABLE_IS_COLLATERAL',
	DEPOSIT_UNDERLYING: 'DEPOSIT_UNDERLYING',
	BORROW: 'BORROW',
	REDEEM: 'REDEEM',
	REDEEM_UNDERLYING: 'REDEEM_UNDERLYING',
	REDEEM_WRAPPED: 'REDEEM_WRAPPED',
	REPAY_ALL: 'REPAY_ALL',
	REPAY: 'REPAY',
	REPAY_ON_BEHALF: 'REPAY_ON_BEHALF',
	TRANSFER_WRAPPED: 'TRANSFER_WRAPPED',
};
