import { web3FromAddress } from '@polkadot/extension-dapp';
import API from '../services';
import { Dispatch } from '../util/types';
import {
	RESET_PROTOCOL_ADMIN_REQUESTS,
	SWITCH_WHITELIST_MODE_START,
	SWITCH_WHITELIST_MODE_ERROR,
	SWITCH_WHITELIST_MODE_SUCCESS,
	SET_PROTOCOL_INTEREST_FACTOR_START,
	SET_PROTOCOL_INTEREST_FACTOR_SUCCESS,
	SET_PROTOCOL_INTEREST_FACTOR_ERROR,
	SET_PROTOCOL_INTEREST_THRESHOLD_START,
	SET_PROTOCOL_INTEREST_THRESHOLD_SUCCESS,
	SET_PROTOCOL_INTEREST_THRESHOLD_ERROR,
	SET_COLLATERAL_FACTOR_REQUEST_ERROR,
	SET_COLLATERAL_FACTOR_REQUEST_START,
	SET_COLLATERAL_FACTOR_REQUEST_SUCCESS,
	SET_BASE_RATE_PER_YEAR_REQUEST_START,
	SET_BASE_RATE_PER_YEAR_REQUEST_ERROR,
	SET_BASE_RATE_PER_YEAR_REQUEST_SUCCESS,
	SET_MULTIPLIER_PER_YEAR_REQUEST_START,
	SET_MULTIPLIER_PER_YEAR_REQUEST_ERROR,
	SET_MULTIPLIER_PER_YEAR_REQUEST_SUCCESS,
	SET_KINK_REQUEST_START,
	SET_KINK_REQUEST_ERROR,
	SET_KINK_REQUEST_SUCCESS,
	SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_START,
	SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_SUCCESS,
	SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_ERROR,
	SET_BORROW_CAP_START,
	SET_BORROW_CAP_ERROR,
	SET_BORROW_CAP_SUCCESS,
	PAUSE_OPERATION_START,
	PAUSE_OPERATION_SUCCESS,
	PAUSE_OPERATION_ERROR,
	RESUME_OPERATION_START,
	RESUME_OPERATION_SUCCESS,
	RESUME_OPERATION_ERROR,
	LOCK_PRICE_REQUEST_START,
	LOCK_PRICE_REQUEST_SUCCESS,
	LOCK_PRICE_REQUEST_ERROR,
	UNLOCK_PRICE_REQUEST_START,
	UNLOCK_PRICE_REQUEST_SUCCESS,
	UNLOCK_PRICE_REQUEST_ERROR,
	FEED_VALUES_REQUEST_START,
	FEED_VALUES_REQUEST_SUCCESS,
	FEED_VALUES_REQUEST_ERROR,
	ENABLE_MNT_MINTING_ERROR,
	ENABLE_MNT_MINTING_START,
	ENABLE_MNT_MINTING_SUCCESS,
	DISABLE_MNT_MINTING_START,
	DISABLE_MNT_MINTING_SUCCESS,
	DISABLE_MNT_MINTING_ERROR,
	SET_MNT_RATE_FOR_SIDE_START,
	SET_MNT_RATE_FOR_SIDE_SUCCESS,
	SET_MNT_RATE_FOR_SIDE_ERROR,
} from './types';
import {
	txCallback,
	convertToTokenValue,
	convertInputToPercent,
} from '../util';
import { toUnderlyingCurrencyIdAPI } from '../util/cast';

export const resetProtocolAdminUpdateRequests = () => {
	return {
		type: RESET_PROTOCOL_ADMIN_REQUESTS,
	};
};

export function switchWhitelistMode(account: string, keyring: any) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SWITCH_WHITELIST_MODE_SUCCESS, SWITCH_WHITELIST_MODE_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SWITCH_WHITELIST_MODE_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.controller.switchWhitelistMode())
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.controller.switchWhitelistMode())
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SWITCH_WHITELIST_MODE_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function setProtocolInterestFactor(
	account: string,
	keyring: any,
	currencyId: string,
	newAmount: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				SET_PROTOCOL_INTEREST_FACTOR_SUCCESS,
				SET_PROTOCOL_INTEREST_FACTOR_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: SET_PROTOCOL_INTEREST_FACTOR_START });
			const currentUser = keyring.getPair(account);
			const convertInsuranceFactor = convertInputToPercent(newAmount);

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(currencyId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.controller.setProtocolInterestFactor(
							castedCurrencyId,
							convertInsuranceFactor
						)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.controller.setProtocolInterestFactor(
							castedCurrencyId,
							convertInsuranceFactor
						)
					)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_PROTOCOL_INTEREST_FACTOR_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function setProtocolInterestThreshold(
	account: string,
	keyring: any,
	currencyId: string,
	protocolInterestThreshold: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				SET_PROTOCOL_INTEREST_THRESHOLD_SUCCESS,
				SET_PROTOCOL_INTEREST_THRESHOLD_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: SET_PROTOCOL_INTEREST_THRESHOLD_START });
			const currentUser = keyring.getPair(account);
			const convertProtocolInterestThreshold = convertToTokenValue(
				protocolInterestThreshold
			);
			const castedCurrencyId = toUnderlyingCurrencyIdAPI(currencyId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.controller.setProtocolInterestThreshold(
							castedCurrencyId,
							convertProtocolInterestThreshold
						)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.controller.setProtocolInterestThreshold(
							castedCurrencyId,
							convertProtocolInterestThreshold
						)
					)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_PROTOCOL_INTEREST_THRESHOLD_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export const setCollateralFactor = (
	account: string,
	keyring: any,
	currencyId: string,
	newAmount: string
) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				SET_COLLATERAL_FACTOR_REQUEST_SUCCESS,
				SET_COLLATERAL_FACTOR_REQUEST_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: SET_COLLATERAL_FACTOR_REQUEST_START });
			const currentUser = keyring.getPair(account);
			const convertCollateralFactor = convertInputToPercent(newAmount);
			const castedCurrencyId = toUnderlyingCurrencyIdAPI(currencyId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.controller.setCollateralFactor(
							castedCurrencyId,
							convertCollateralFactor
						)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.controller.setCollateralFactor(
							castedCurrencyId,
							convertCollateralFactor
						)
					)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_COLLATERAL_FACTOR_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
};

export function setBaseRatePerYear(
	account: string,
	keyring: any,
	currencyId: string,
	baseRatePerYear: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				SET_BASE_RATE_PER_YEAR_REQUEST_SUCCESS,
				SET_BASE_RATE_PER_YEAR_REQUEST_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: SET_BASE_RATE_PER_YEAR_REQUEST_START });
			const currentUser = keyring.getPair(account);
			const convertBaseRatePerYear = convertInputToPercent(baseRatePerYear);
			const castedCurrencyId = toUnderlyingCurrencyIdAPI(currencyId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.minterestModel.setBaseRate(
							castedCurrencyId,
							convertBaseRatePerYear
						)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.minterestModel.setBaseRate(
							castedCurrencyId,
							convertBaseRatePerYear
						)
					)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_BASE_RATE_PER_YEAR_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function setMultiplierPerYear(
	account: string,
	keyring: any,
	currencyId: string,
	multiplierRatePerYear: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				SET_MULTIPLIER_PER_YEAR_REQUEST_SUCCESS,
				SET_MULTIPLIER_PER_YEAR_REQUEST_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: SET_MULTIPLIER_PER_YEAR_REQUEST_START });
			const currentUser = keyring.getPair(account);
			const convertMultiplierPerYear = convertInputToPercent(
				multiplierRatePerYear
			);
			const castedCurrencyId = toUnderlyingCurrencyIdAPI(currencyId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.minterestModel.setMultiplier(
							castedCurrencyId,
							convertMultiplierPerYear
						)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.minterestModel.setMultiplier(
							castedCurrencyId,
							convertMultiplierPerYear
						)
					)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_MULTIPLIER_PER_YEAR_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function setKink(
	account: string,
	keyring: any,
	currencyId: string,
	kink: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SET_KINK_REQUEST_SUCCESS, SET_KINK_REQUEST_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SET_KINK_REQUEST_START });
			const currentUser = keyring.getPair(account);
			const convertKink = convertInputToPercent(kink);

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(currencyId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.minterestModel.setKink(castedCurrencyId, convertKink))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.minterestModel.setKink(castedCurrencyId, convertKink))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({ type: SET_KINK_REQUEST_ERROR, payload: err.toString() });
		}
	};
}

export function setJumpMultiplierPerYear(
	account: string,
	keyring: any,
	currencyId: string,
	jumpMultiplierRatePerYear: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_SUCCESS,
				SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_START });
			const currentUser = keyring.getPair(account);
			const convertJumpMultiplierRatePerYear = convertInputToPercent(
				jumpMultiplierRatePerYear
			);

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(currencyId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.minterestModel.setJumpMultiplier(
							castedCurrencyId,
							convertJumpMultiplierRatePerYear
						)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.minterestModel.setJumpMultiplier(
							castedCurrencyId,
							convertJumpMultiplierRatePerYear
						)
					)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_JUMP_MULTIPLIER_PER_YEAR_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function setBorrowCap(
	account: string,
	keyring: any,
	currencyId: string,
	borrowCap: string | undefined
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SET_BORROW_CAP_SUCCESS, SET_BORROW_CAP_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SET_BORROW_CAP_START });
			const currentUser = keyring.getPair(account);
			const convertBorrowCap = !borrowCap
				? borrowCap
				: convertToTokenValue(borrowCap);

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(currencyId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(
						API.tx.controller.setBorrowCap(castedCurrencyId, convertBorrowCap)
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(
						API.tx.controller.setBorrowCap(castedCurrencyId, convertBorrowCap)
					)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_BORROW_CAP_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function pauseOperation(
	account: string,
	keyring: any,
	currencyId: string,
	operation: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[PAUSE_OPERATION_SUCCESS, PAUSE_OPERATION_ERROR],
			dispatch
		);

		try {
			dispatch({ type: PAUSE_OPERATION_START });
			const currentUser = keyring.getPair(account);
			const castedCurrencyId = toUnderlyingCurrencyIdAPI(currencyId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.controller.pauseOperation(castedCurrencyId, operation))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.controller.pauseOperation(castedCurrencyId, operation))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: PAUSE_OPERATION_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function resumeOperation(
	account: string,
	keyring: any,
	currencyId: string,
	operation: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[RESUME_OPERATION_SUCCESS, RESUME_OPERATION_ERROR],
			dispatch
		);

		try {
			dispatch({ type: RESUME_OPERATION_START });
			const currentUser = keyring.getPair(account);
			const castedCurrencyId = toUnderlyingCurrencyIdAPI(currencyId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.controller.resumeOperation(castedCurrencyId, operation))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.controller.resumeOperation(castedCurrencyId, operation))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: RESUME_OPERATION_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export const lockPrice = (
	account: string,
	keyring: any,
	currencyId: string
) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[LOCK_PRICE_REQUEST_SUCCESS, LOCK_PRICE_REQUEST_ERROR],
			dispatch
		);

		const castedCurrencyId = toUnderlyingCurrencyIdAPI(currencyId);

		try {
			dispatch({ type: LOCK_PRICE_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.prices.lockPrice(castedCurrencyId))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.prices.lockPrice(castedCurrencyId))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			console.log(err);
			dispatch({
				type: LOCK_PRICE_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
};

export const unlockPrice = (
	account: string,
	keyring: any,
	currencyId: string
) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[UNLOCK_PRICE_REQUEST_SUCCESS, UNLOCK_PRICE_REQUEST_ERROR],
			dispatch
		);

		try {
			dispatch({ type: UNLOCK_PRICE_REQUEST_START });
			const currentUser = keyring.getPair(account);

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(currencyId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.prices.unlockPrice(castedCurrencyId))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.prices.unlockPrice(castedCurrencyId))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			console.log(err);
			dispatch({
				type: UNLOCK_PRICE_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
};

export const feedValues = (account: string, keyring: any, values: any) => {
	const newValues = values.map((item: any) => [
		toUnderlyingCurrencyIdAPI(item.currencyId),
		convertToTokenValue(item.price),
	]);
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[FEED_VALUES_REQUEST_SUCCESS, FEED_VALUES_REQUEST_ERROR],
			dispatch
		);

		try {
			dispatch({ type: FEED_VALUES_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestOracle
					.feedValues(newValues)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestOracle
					.feedValues(newValues)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			console.log(err);
			dispatch({
				type: FEED_VALUES_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
};

export const enableMNTMinting = (
	account: string,
	keyring: any,
	currencyId: string
) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[ENABLE_MNT_MINTING_SUCCESS, ENABLE_MNT_MINTING_ERROR],
			dispatch
		);

		try {
			dispatch({ type: ENABLE_MNT_MINTING_START, payload: currencyId });
			const currentUser = keyring.getPair(account);
			const castedCurrencyId = toUnderlyingCurrencyIdAPI(currencyId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.mntToken.enableMntMinting(castedCurrencyId))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.mntToken.enableMntMinting(castedCurrencyId))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			console.log(err);
			dispatch({
				type: ENABLE_MNT_MINTING_ERROR,
				payload: err.toString(),
			});
		}
	};
};
export const disableMNTMinting = (
	account: string,
	keyring: any,
	currencyId: string
) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[DISABLE_MNT_MINTING_SUCCESS, DISABLE_MNT_MINTING_ERROR],
			dispatch
		);

		try {
			dispatch({ type: DISABLE_MNT_MINTING_START, payload: currencyId });
			const currentUser = keyring.getPair(account);
			const castedCurrencyId = toUnderlyingCurrencyIdAPI(currencyId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.mntToken.disableMntMinting(castedCurrencyId))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.mntToken.disableMntMinting(castedCurrencyId))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			console.log(err);
			dispatch({
				type: DISABLE_MNT_MINTING_ERROR,
				payload: err.toString(),
			});
		}
	};
};

export const setMNTRateForSide = (
	account: string,
	keyring: any,
	rateForSide: string
) => {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SET_MNT_RATE_FOR_SIDE_SUCCESS, SET_MNT_RATE_FOR_SIDE_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SET_MNT_RATE_FOR_SIDE_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.mntToken.setMntRate(rateForSide))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.mntToken.setMntRate(rateForSide))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			console.log(err);
			dispatch({
				type: SET_MNT_RATE_FOR_SIDE_ERROR,
				payload: err.toString(),
			});
		}
	};
};
