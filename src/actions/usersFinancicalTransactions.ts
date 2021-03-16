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
} from './types';
import API from '../services';
import { convertToTokenValue, txCallback } from '../util';

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

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.depositUnderlying(underlyingAssetId, convertedAmount)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.depositUnderlying(underlyingAssetId, convertedAmount)
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

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.borrow(underlyingAssetId, convertedAmount)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.borrow(underlyingAssetId, convertedAmount)
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

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.redeem(underlyingAssetId)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.redeem(underlyingAssetId)
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

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.redeemUnderlying(underlyingAssetId, convertedAmount)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.redeemUnderlying(underlyingAssetId, convertedAmount)
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

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.redeemWrapped(wrappedId, convertedAmount)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.redeemWrapped(wrappedId, convertedAmount)
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

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.repayAll(underlyingAssetId)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.repayAll(underlyingAssetId)
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

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.repay(underlyingAssetId, convertedAmount)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.repay(underlyingAssetId, convertedAmount)
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

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.repayOnBehalf(underlyingAssetId, borrower, convertedAmount)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.repayOnBehalf(underlyingAssetId, borrower, convertedAmount)
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

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.transferWrapped(receiver, wrappedId, convertedAmount)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.transferWrapped(receiver, wrappedId, convertedAmount)
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

export const resetUserRequests = () => {
	return {
		type: RESET_USER_REQUESTS,
	};
};
