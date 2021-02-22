import { web3FromAddress } from '@polkadot/extension-dapp';
import {
	SET_INSURANCE_FACTOR_START,
	SET_INSURANCE_FACTOR_SUCCESS,
	SET_INSURANCE_FACTOR_ERROR,
	RESET_ADMIN_REQUESTS,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_ERROR,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_START,
	SET_LIQUIDATIONS_MAX_ATTEMPTS_SUCCESS,
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

export function setLiquidationMaxAttempts(
	account,
	keyring,
	poolId,
	newMaxValue
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
								type: SET_LIQUIDATIONS_MAX_ATTEMPTS_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: SET_LIQUIDATIONS_MAX_ATTEMPTS_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: SET_LIQUIDATIONS_MAX_ATTEMPTS_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.riskManager
					.setMaxAttempts(poolId, newMaxValue)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.riskManager
					.setMaxAttempts(poolId, newMaxValue)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_LIQUIDATIONS_MAX_ATTEMPTS_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export const resetAdminRequests = () => {
	return {
		type: RESET_ADMIN_REQUESTS,
	};
};
