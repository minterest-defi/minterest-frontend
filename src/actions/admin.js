import { web3FromAddress } from '@polkadot/extension-dapp';
import {
	SET_INSURANCE_FACTOR_START,
	SET_INSURANCE_FACTOR_SUCCESS,
	SET_INSURANCE_FACTOR_ERROR,
	DEPOSIT_INSURANCE_REQUEST_START,
	DEPOSIT_INSURANCE_REQUEST_ERROR,
	DEPOSIT_INSURANCE_REQUEST_SUCCESS,
	REDEEM_INSURANCE_REQUEST_START,
	REDEEM_INSURANCE_REQUEST_ERROR,
	REDEEM_INSURANCE_REQUEST_SUCCESS,
} from './types';
import API from '../services';

export function setInsuranceFactor(
	account,
	keyring,
	poolId,
	newAmountN,
	newAmountD
) {
	return async (dispatch) => {
		const callBack = ({ events = [], status }) => {
			if (status.isFinalized) {
				events.forEach(
					({
						event: {
							method,
							section,
							data: [error],
						},
					}) => {
						if (section === 'system' && method === 'ExtrinsicSuccess') {
							dispatch({
								type: SET_INSURANCE_FACTOR_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: SET_INSURANCE_FACTOR_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: SET_INSURANCE_FACTOR_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.controller
					.setInsuranceFactor(poolId, newAmountN, newAmountD)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.controller
					.setInsuranceFactor(poolId, newAmountN, newAmountD)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_INSURANCE_FACTOR_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function depositInsurance(account, keyring, asset, amount) {
	return async (dispatch) => {
		const callBack = ({ event = [], status }) => {
			dispatch({
				type: DEPOSIT_INSURANCE_REQUEST_SUCCESS,
				payload: { event, status },
			});
		};

		try {
			dispatch({ type: DEPOSIT_INSURANCE_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.controller
					.depositInsurance(asset, amount)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.controller
					.depositInsurance(asset, amount)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({ type: DEPOSIT_INSURANCE_REQUEST_ERROR });
		}
	};
}

export function redeemInsurance(account, keyring, asset, amount) {
	return async (dispatch) => {
		const callBack = ({ event = [], status }) => {
			dispatch({
				type: REDEEM_INSURANCE_REQUEST_SUCCESS,
				payload: { event, status },
			});
		};

		try {
			dispatch({ type: REDEEM_INSURANCE_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.controller
					.redeemInsurance(asset, amount)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.controller
					.redeemInsurance(asset, amount)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({ type: REDEEM_INSURANCE_REQUEST_ERROR });
		}
	};
}
