import { web3FromAddress } from '@polkadot/extension-dapp';
import { Dispatch } from '../util/types';
import {
	DEPOSIT_UNDERLYING_REQUEST_START,
	DEPOSIT_UNDERLYING_REQUEST_ERROR,
	DEPOSIT_UNDERLYING_REQUEST_SUCCESS,
	BORROW_REQUEST_START,
	BORROW_REQUEST_ERROR,
	BORROW_REQUEST_SUCCESS,
	REDEEM_REQUEST_START,
	REDEEM_REQUEST_ERROR,
	REDEEM_REQUEST_SUCCESS,
	REDEEM_UNDERLYING_REQUEST_START,
	REDEEM_UNDERLYING_REQUEST_ERROR,
	REDEEM_UNDERLYING_REQUEST_SUCCESS,
	REDEEM_WRAPPED_REQUEST_START,
	REDEEM_WRAPPED_REQUEST_ERROR,
	REDEEM_WRAPPED_REQUEST_SUCCESS,
	REPAY_ALL_REQUEST_START,
	REPAY_ALL_REQUEST_ERROR,
	REPAY_ALL_REQUEST_SUCCESS,
	REPAY_REQUEST_START,
	REPAY_REQUEST_ERROR,
	REPAY_REQUEST_SUCCESS,
	REPAY_ON_BEHALF_REQUEST_START,
	REPAY_ON_BEHALF_REQUEST_ERROR,
	REPAY_ON_BEHALF_REQUEST_SUCCESS,
	RESET_USER_REQUESTS,
	TRANSFER_WRAPPED_START,
	TRANSFER_WRAPPED_ERROR,
	TRANSFER_WRAPPED_SUCCESS,
	DISABLE_IS_COLLATERAL_START,
	DISABLE_IS_COLLATERAL_ERROR,
	DISABLE_IS_COLLATERAL_SUCCESS,
	ENABLE_IS_COLLATERAL_START,
	ENABLE_IS_COLLATERAL_ERROR,
	ENABLE_IS_COLLATERAL_SUCCESS,
} from './types';
import API from '../services';
import { convertToTokenValue, txCallback } from '../util';
import {
	toWrappedCurrencyIdAPI,
	toUnderlyingCurrencyIdAPI,
} from '../util/cast';

export function depositUnderlying(
	keyring: any,
	account: string,
	underlyingAssetId: string,
	underlyingAmount: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[DEPOSIT_UNDERLYING_REQUEST_SUCCESS, DEPOSIT_UNDERLYING_REQUEST_ERROR],
			dispatch
		);

		try {
			dispatch({ type: DEPOSIT_UNDERLYING_REQUEST_START });
			const currentUser = keyring.getPair(account);
			const convertedAmount = convertToTokenValue(underlyingAmount);

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(underlyingAssetId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.depositUnderlying(castedCurrencyId, convertedAmount)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.depositUnderlying(castedCurrencyId, convertedAmount)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: DEPOSIT_UNDERLYING_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function borrow(
	keyring: any,
	account: string,
	underlyingAssetId: string,
	borrowAmount: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[BORROW_REQUEST_SUCCESS, BORROW_REQUEST_ERROR],
			dispatch
		);

		try {
			dispatch({ type: BORROW_REQUEST_START });
			const currentUser = keyring.getPair(account);
			const convertedAmount = convertToTokenValue(borrowAmount);

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(underlyingAssetId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.borrow(castedCurrencyId, convertedAmount)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.borrow(castedCurrencyId, convertedAmount)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: BORROW_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function redeem(
	keyring: any,
	account: string,
	underlyingAssetId: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[REDEEM_REQUEST_SUCCESS, REDEEM_REQUEST_ERROR],
			dispatch
		);

		try {
			dispatch({ type: REDEEM_REQUEST_START });
			const currentUser = keyring.getPair(account);

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(underlyingAssetId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.redeem(castedCurrencyId)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.redeem(castedCurrencyId)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: REDEEM_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function redeemUnderlying(
	keyring: any,
	account: string,
	underlyingAssetId: string,
	underlyingAmount: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[REDEEM_UNDERLYING_REQUEST_SUCCESS, REDEEM_UNDERLYING_REQUEST_ERROR],
			dispatch
		);

		try {
			dispatch({ type: REDEEM_UNDERLYING_REQUEST_START });
			const currentUser = keyring.getPair(account);
			const convertedAmount = convertToTokenValue(underlyingAmount);

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(underlyingAssetId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.redeemUnderlying(castedCurrencyId, convertedAmount)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.redeemUnderlying(castedCurrencyId, convertedAmount)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: REDEEM_UNDERLYING_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function redeemWrapped(
	keyring: any,
	account: string,
	wrappedId: string,
	wrappedAmount: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[REDEEM_WRAPPED_REQUEST_SUCCESS, REDEEM_WRAPPED_REQUEST_ERROR],
			dispatch
		);

		try {
			dispatch({ type: REDEEM_WRAPPED_REQUEST_START });
			const currentUser = keyring.getPair(account);
			const convertedAmount = convertToTokenValue(wrappedAmount);

			const castedWrappedId = toWrappedCurrencyIdAPI(wrappedId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.redeemWrapped(castedWrappedId, convertedAmount)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.redeemWrapped(castedWrappedId, convertedAmount)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: REDEEM_WRAPPED_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function repayAll(
	keyring: any,
	account: string,
	underlyingAssetId: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[REPAY_ALL_REQUEST_SUCCESS, REPAY_ALL_REQUEST_ERROR],
			dispatch
		);

		try {
			dispatch({ type: REPAY_ALL_REQUEST_START });
			const currentUser = keyring.getPair(account);

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(underlyingAssetId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.repayAll(castedCurrencyId)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.repayAll(castedCurrencyId)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: REPAY_ALL_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function repay(
	keyring: any,
	account: string,
	underlyingAssetId: string,
	repayAmount: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[REPAY_REQUEST_SUCCESS, REPAY_REQUEST_ERROR],
			dispatch
		);

		try {
			dispatch({ type: REPAY_REQUEST_START });
			const currentUser = keyring.getPair(account);
			const convertedAmount = convertToTokenValue(repayAmount);

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(underlyingAssetId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.repay(castedCurrencyId, convertedAmount)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.repay(castedCurrencyId, convertedAmount)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: REPAY_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function repayOnBehalf(
	keyring: any,
	account: string,
	underlyingAssetId: string,
	borrower: string,
	repayAmount: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[REPAY_ON_BEHALF_REQUEST_SUCCESS, REPAY_ON_BEHALF_REQUEST_ERROR],
			dispatch
		);

		try {
			dispatch({ type: REPAY_ON_BEHALF_REQUEST_START });
			const currentUser = keyring.getPair(account);
			const convertedAmount = convertToTokenValue(repayAmount);

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(underlyingAssetId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.repayOnBehalf(castedCurrencyId, borrower, convertedAmount)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.repayOnBehalf(castedCurrencyId, borrower, convertedAmount)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: REPAY_ON_BEHALF_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function transferWrapped(
	keyring: any,
	account: string,
	receiver: string,
	wrappedId: string,
	transferAmount: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[TRANSFER_WRAPPED_SUCCESS, TRANSFER_WRAPPED_ERROR],
			dispatch
		);

		try {
			dispatch({ type: TRANSFER_WRAPPED_START });
			const currentUser = keyring.getPair(account);
			const convertedAmount = convertToTokenValue(transferAmount);

			const castedWrappedId = toWrappedCurrencyIdAPI(wrappedId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.transferWrapped(receiver, castedWrappedId, convertedAmount)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.transferWrapped(receiver, castedWrappedId, convertedAmount)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: TRANSFER_WRAPPED_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function disableIsCollateral(
	account: string,
	keyring: any,
	underlyingAssetId: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[DISABLE_IS_COLLATERAL_SUCCESS, DISABLE_IS_COLLATERAL_ERROR],
			dispatch
		);

		try {
			dispatch({
				type: DISABLE_IS_COLLATERAL_START,
				payload: underlyingAssetId,
			});
			const currentUser = keyring.getPair(account);

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(underlyingAssetId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.disableIsCollateral(castedCurrencyId)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.disableIsCollateral(castedCurrencyId)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: DISABLE_IS_COLLATERAL_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function enableIsCollateral(
	account: string,
	keyring: any,
	underlyingAssetId: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[ENABLE_IS_COLLATERAL_SUCCESS, ENABLE_IS_COLLATERAL_ERROR],
			dispatch
		);

		try {
			dispatch({
				type: ENABLE_IS_COLLATERAL_START,
				payload: underlyingAssetId,
			});
			const currentUser = keyring.getPair(account);

			const castedCurrencyId = toUnderlyingCurrencyIdAPI(underlyingAssetId);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.enableIsCollateral(castedCurrencyId)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.enableIsCollateral(castedCurrencyId)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: ENABLE_IS_COLLATERAL_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export const resetUserRequests = () => {
	return {
		type: RESET_USER_REQUESTS,
	};
};
