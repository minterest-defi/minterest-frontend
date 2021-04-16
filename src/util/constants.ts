export const BLOCKS_PER_YEAR = 5256000;

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

export const OPERATIONS = {
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
