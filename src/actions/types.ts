// api, accounts
export const CONNECT_INIT = 'CONNECT_INIT';
export const CONNECT = 'CONNECT';
export const CONNECT_SUCCESS = 'CONNECT_SUCCESS';
export const CONNECT_ERROR = 'CONNECT_ERROR';
export const LOAD_KEYRING = 'LOAD_KEYRING';
export const SET_KEYRING = 'SET_KEYRING';
export const KEYRING_ERROR = 'KEYRING_ERROR';
// economicUpdatesReducer
export const SET_BASE_RATE_PER_BLOCK_REQUEST_START =
	'SET_BASE_RATE_PER_BLOCK_REQUEST_START';
export const SET_BASE_RATE_PER_BLOCK_REQUEST_SUCCESS =
	'SET_BASE_RATE_PER_BLOCK_REQUEST_SUCCESS';
export const SET_BASE_RATE_PER_BLOCK_REQUEST_ERROR =
	'SET_BASE_RATE_PER_BLOCK_REQUEST_ERROR';

export const SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_START =
	'SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_START';
export const SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_SUCCESS =
	'SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_SUCCESS';
export const SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_ERROR =
	'SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_ERROR';

export const SET_KINK_REQUEST_START = 'SET_KINK_REQUEST_START';
export const SET_KINK_REQUEST_SUCCESS = 'SET_KINK_REQUEST_SUCCESS';
export const SET_KINK_REQUEST_ERROR = 'SET_KINK_REQUEST_ERROR';

export const SET_MULTIPLIER_PER_BLOCK_REQUEST_START =
	'SET_MULTIPLIER_PER_BLOCK_REQUEST_START';
export const SET_MULTIPLIER_PER_BLOCK_REQUEST_SUCCESS =
	'SET_MULTIPLIER_PER_BLOCK_REQUEST_SUCCESS';
export const SET_MULTIPLIER_PER_BLOCK_REQUEST_ERROR =
	'SET_MULTIPLIER_PER_BLOCK_REQUEST_ERROR';

// adminReducer

export const SET_INSURANCE_FACTOR_START = 'SET_INSURANCE_FACTOR_START';
export const SET_INSURANCE_FACTOR_SUCCESS = 'SET_INSURANCE_FACTOR_SUCCESS';
export const SET_INSURANCE_FACTOR_ERROR = 'SET_INSURANCE_FACTOR_ERROR';

export const SET_CURRENT_ACCOUNT = 'SET_CURRENT_ACCOUNT';

export const RESET_ADMIN_REQUESTS = 'RESET_ADMIN_REQUESTS';
export const RESET_ECONOMIC_UPDATE_REQUESTS = 'RESET_ECONOMIC_UPDATE_REQUESTS';

export const CHECK_IS_ADMIN_START = 'CHECK_IS_ADMIN_START';
export const CHECK_IS_ADMIN_SUCCESS = 'CHECK_IS_ADMIN_SUCCESS';
export const CHECK_IS_ADMIN_ERROR = 'CHECK_IS_ADMIN_ERROR';

export const SET_COLLATERAL_THRESHOLD_REQUEST_START =
	'SET_COLLATERAL_THRESHOLD_REQUEST_START';
export const SET_COLLATERAL_THRESHOLD_REQUEST_SUCCESS =
	'SET_COLLATERAL_THRESHOLD_REQUEST_SUCCESS';
export const SET_COLLATERAL_THRESHOLD_REQUEST_ERROR =
	'SET_COLLATERAL_THRESHOLD_REQUEST_ERROR';

export const SET_COLLATERAL_FACTOR_REQUEST_START =
	'SET_COLLATERAL_FACTOR_REQUEST_START';
export const SET_COLLATERAL_FACTOR_REQUEST_SUCCESS =
	'SET_COLLATERAL_FACTOR_REQUEST_SUCCESS';
export const SET_COLLATERAL_FACTOR_REQUEST_ERROR =
	'SET_COLLATERAL_FACTOR_REQUEST_ERROR';

export const SET_LIQUIDATIONS_MAX_ATTEMPTS_START =
	'SET_LIQUIDATIONS_MAX_ATTEMPTS_START';
export const SET_LIQUIDATIONS_MAX_ATTEMPTS_SUCCESS =
	'SET_LIQUIDATIONS_MAX_ATTEMPTS_SUCCESS';
export const SET_LIQUIDATIONS_MAX_ATTEMPTS_ERROR =
	'SET_LIQUIDATIONS_MAX_ATTEMPTS_ERROR';

export const SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_START =
	'SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_START';
export const SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_SUCCESS =
	'SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_SUCCESS';
export const SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_ERROR =
	'SET_LOAN_SIZE_LIQUIDATIONS_THRESHOLD_ERROR';

export const GET_ADMIN_CONTROLLER_DATA_START =
	'GET_ADMIN_CONTROLLER_DATA_START';
export const GET_ADMIN_CONTROLLER_DATA_SUCCESS =
	'GET_ADMIN_CONTROLLER_DATA_SUCCESS';
export const GET_ADMIN_CONTROLLER_DATA_ERROR =
	'GET_ADMIN_CONTROLLER_DATA_ERROR';

export const GET_MINTEREST_MODEL_DATA_START = 'GET_MINTEREST_MODEL_DATA_START';
export const GET_MINTEREST_MODEL_DATA_SUCCESS =
	'GET_MINTEREST_MODEL_DATA_SUCCESS';
export const GET_MINTEREST_MODEL_DATA_ERROR = 'GET_MINTEREST_MODEL_DATA_ERROR';

export const GET_RISK_MANAGER_DATA_START = 'GET_RISK_MANAGER_DATA_START';
export const GET_RISK_MANAGER_DATA_SUCCESS = 'GET_RISK_MANAGER_DATA_SUCCESS';
export const GET_RISK_MANAGER_DATA_ERROR = 'GET_RISK_MANAGER_DATA_ERROR';

export const GET_PAUSE_KEEPERS_START = 'GET_PAUSE_KEEPERS_START';
export const GET_PAUSE_KEEPERS_SUCCESS = 'GET_PAUSE_KEEPERS_SUCCESS';
export const GET_PAUSE_KEEPERS_ERROR = 'GET_PAUSE_KEEPERS_ERROR';

// userFinanceOperations

export const DEPOSIT_UNDERLYING_REQUEST_START =
	'DEPOSIT_UNDERLYING_REQUEST_START';
export const DEPOSIT_UNDERLYING_REQUEST_ERROR =
	'DEPOSIT_UNDERLYING_REQUEST_ERROR';
export const DEPOSIT_UNDERLYING_REQUEST_SUCCESS =
	'DEPOSIT_UNDERLYING_REQUEST_SUCCESS';

export const REDEEM_REQUEST_START = 'REDEEM_REQUEST_START';
export const REDEEM_REQUEST_ERROR = 'REDEEM_REQUEST_ERROR';
export const REDEEM_REQUEST_SUCCESS = 'REDEEM_REQUEST_SUCCESS';

export const REDEEM_UNDERLYING_REQUEST_START =
	'REDEEM_UNDERLYING_REQUEST_START';
export const REDEEM_UNDERLYING_REQUEST_ERROR =
	'REDEEM_UNDERLYING_REQUEST_ERROR';
export const REDEEM_UNDERLYING_REQUEST_SUCCESS =
	'REDEEM_UNDERLYING_REQUEST_SUCCESS';

export const REDEEM_WRAPPED_REQUEST_START = 'REDEEM_WRAPPED_REQUEST_START';
export const REDEEM_WRAPPED_REQUEST_ERROR = 'REDEEM_WRAPPED_REQUEST_ERROR';
export const REDEEM_WRAPPED_REQUEST_SUCCESS = 'REDEEM_WRAPPED_REQUEST_SUCCESS';

export const BORROW_REQUEST_START = 'BORROW_REQUEST_START';
export const BORROW_REQUEST_ERROR = 'BORROW_REQUEST_ERROR';
export const BORROW_REQUEST_SUCCESS = 'BORROW_REQUEST_SUCCESS';

export const REPAY_ALL_REQUEST_START = 'REPAY_ALL_REQUEST_START';
export const REPAY_ALL_REQUEST_ERROR = 'REPAY_ALL_REQUEST_ERROR';
export const REPAY_ALL_REQUEST_SUCCESS = 'REPAY_ALL_REQUEST_SUCCESS';

export const REPAY_REQUEST_START = 'REPAY_REQUEST_START';
export const REPAY_REQUEST_ERROR = 'REPAY_REQUEST_ERROR';
export const REPAY_REQUEST_SUCCESS = 'REPAY_REQUEST_SUCCESS';

export const REPAY_ON_BEHALF_REQUEST_START = 'REPAY_ON_BEHALF_REQUEST_START';
export const REPAY_ON_BEHALF_REQUEST_ERROR = 'REPAY_ON_BEHALF_REQUEST_ERROR';
export const REPAY_ON_BEHALF_REQUEST_SUCCESS =
	'REPAY_ON_BEHALF_REQUEST_SUCCESS';

export const TRANSFER_WRAPPED_START = 'TRANSFER_WRAPPED_START';
export const TRANSFER_WRAPPED_ERROR = 'TRANSFER_WRAPPED_ERROR';
export const TRANSFER_WRAPPED_SUCCESS = 'TRANSFER_WRAPPED_SUCCESS';

export const RESET_USER_REQUESTS = 'RESET_USER_REQUESTS';

// fetchDataReducer

export const GET_POOLS_BALANCE_START = 'GET_POOLS_BALANCE_START';
export const GET_POOLS_BALANCE_ERROR = 'GET_POOLS_BALANCE_ERROR';
export const GET_POOLS_BALANCE_SUCCESS = 'GET_POOLS_BALANCE_SUCCESS';

export const GET_POOLS_BORROW_BALANCE_START = 'GET_POOLS_BORROW_BALANCE_START';
export const GET_POOLS_BORROW_BALANCE_ERROR = 'GET_POOLS_BORROW_BALANCE_ERROR';
export const GET_POOLS_BORROW_BALANCE_SUCCESS =
	'GET_POOLS_BORROW_BALANCE_SUCCESS';

export const GET_RATES_DATA_START = 'GET_RATES_DATA_START';
export const GET_RATES_DATA_ERROR = 'GET_RATES_DATA_ERROR';
export const GET_RATES_DATA_SUCCESS = 'GET_RATES_DATA_SUCCESS';

export const GET_USER_BALANCE_START = 'GET_USER_BALANCE_START';
export const GET_USER_BALANCE_ERROR = 'GET_USER_BALANCE_ERROR';
export const GET_USER_BALANCE_SUCCESS = 'GET_USER_BALANCE_SUCCESS';

export const GET_USER_BORROW_BALANCE_START = 'GET_USER_BORROW_BALANCE_START';
export const GET_USER_BORROW_BALANCE_ERROR = 'GET_USER_BORROW_BALANCE_ERROR';
export const GET_USER_BORROW_BALANCE_SUCCESS =
	'GET_USER_BORROW_BALANCE_SUCCESS';

export const RESET_DASHBOARD_DATA = 'RESET_DASHBOARD_DATA';
export const RESET_USER_DATA = 'RESET_USER_DATA';

export const GET_BALANCE_ANNOTATION_START = 'GET_BALANCE_ANNOTATION_START';
export const GET_BALANCE_ANNOTATION_ERROR = 'GET_BALANCE_ANNOTATION_ERROR';
export const GET_BALANCE_ANNOTATION_SUCCESS = 'GET_BALANCE_ANNOTATION_SUCCESS';

// economicUpdates

export const FEED_VALUES_REQUEST_START = 'FEED_VALUES_REQUEST_START';
export const FEED_VALUES_REQUEST_ERROR = 'FEED_VALUES_REQUEST_ERROR';
export const FEED_VALUES_REQUEST_SUCCESS = 'FEED_VALUES_REQUEST_SUCCESS';

export const LOCK_PRICE_REQUEST_START = 'LOCK_PRICE_REQUEST_START';
export const LOCK_PRICE_REQUEST_ERROR = 'LOCK_PRICE_REQUEST_ERROR';
export const LOCK_PRICE_REQUEST_SUCCESS = 'LOCK_PRICE_REQUEST_SUCCESS';

export const UNLOCK_PRICE_REQUEST_START = 'UNLOCK_PRICE_REQUEST_START';
export const UNLOCK_PRICE_REQUEST_ERROR = 'UNLOCK_PRICE_REQUEST_ERROR';
export const UNLOCK_PRICE_REQUEST_SUCCESS = 'UNLOCK_PRICE_REQUEST_SUCCESS';

export const GET_LOCKED_PRICES_START = 'GET_LOCKED_PRICES_START';
export const GET_LOCKED_PRICES_ERROR = 'GET_LOCKED_PRICES_ERROR';
export const GET_LOCKED_PRICES_SUCCESS = 'GET_LOCKED_PRICES_SUCCESS';

export const GET_LIQUIDATION_POOLS_BALANCE_START =
	'GET_LIQUIDATION_POOLS_BALANCE_START';
export const GET_LIQUIDATION_POOLS_BALANCE_ERROR =
	'GET_LIQUIDATION_POOLS_BALANCE_ERROR';
export const GET_LIQUIDATION_POOLS_BALANCE_SUCCESS =
	'GET_LIQUIDATION_POOLS_BALANCE_SUCCESS';

export const GET_LIQUIDATION_POOLS_PARAMETERS_START =
	'GET_LIQUIDATION_POOLS_PARAMETERS_START';
export const GET_LIQUIDATION_POOLS_PARAMETERS_ERROR =
	'GET_LIQUIDATION_POOLS_PARAMETERS_ERROR';
export const GET_LIQUIDATION_POOLS_PARAMETERS_SUCCESS =
	'GET_LIQUIDATION_POOLS_PARAMETERS_SUCCESS';

export const SET_DEVIATION_THRESHOLD_START = 'SET_DEVIATION_THRESHOLD_START';
export const SET_DEVIATION_THRESHOLD_ERROR = 'SET_DEVIATION_THRESHOLD_ERROR';
export const SET_DEVIATION_THRESHOLD_SUCCESS =
	'SET_DEVIATION_THRESHOLD_SUCCESS';

export const SET_BALANCE_RATIO_START = 'SET_BALANCE_RATIO_START';
export const SET_BALANCE_RATIO_ERROR = 'SET_BALANCE_RATIO_ERROR';
export const SET_BALANCE_RATIO_SUCCESS = 'SET_BALANCE_RATIO_SUCCESS';

export const GET_WHITELIST_MODE_START = 'GET_WHITELIST_MODE_START';
export const GET_WHITELIST_MODE_ERROR = 'GET_WHITELIST_MODE_ERROR';
export const GET_WHITELIST_MODE_SUCCESS = 'GET_WHITELIST_MODE_SUCCESS';

export const SWITCH_MODE_START = 'SWITCH_MODE_START';
export const SWITCH_MODE_ERROR = 'SWITCH_MODE_ERROR';
export const SWITCH_MODE_SUCCESS = 'SWITCH_MODE_SUCCESS';

export const SET_BORROW_CAP_START = 'SET_BORROW_CAP_START';
export const SET_BORROW_CAP_ERROR = 'SET_BORROW_CAP_ERROR';
export const SET_BORROW_CAP_SUCCESS = 'SET_BORROW_CAP_SUCCESS';
