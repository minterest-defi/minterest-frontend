import { web3FromAddress } from '@polkadot/extension-dapp';
import { Dispatch } from '../util/types';
import {
	RESET_ADMIN_REQUESTS,
	GET_ADMIN_CONTROLLER_DATA_START,
	GET_ADMIN_CONTROLLER_DATA_ERROR,
	GET_ADMIN_CONTROLLER_DATA_SUCCESS,
	GET_RISK_MANAGER_DATA_START,
	GET_RISK_MANAGER_DATA_SUCCESS,
	GET_RISK_MANAGER_DATA_ERROR,
	GET_WHITELIST_MODE_START,
	GET_WHITELIST_MODE_ERROR,
	GET_WHITELIST_MODE_SUCCESS,
	SWITCH_MODE_START,
	SWITCH_MODE_ERROR,
	SWITCH_MODE_SUCCESS,
	GET_PAUSE_KEEPERS_START,
	GET_PAUSE_KEEPERS_SUCCESS,
	GET_PAUSE_KEEPERS_ERROR,
	PAUSE_SPECIFIC_OPERATION_START,
	PAUSE_SPECIFIC_OPERATION_SUCCESS,
	PAUSE_SPECIFIC_OPERATION_ERROR,
	UNPAUSE_SPECIFIC_OPERATION_START,
	UNPAUSE_SPECIFIC_OPERATION_SUCCESS,
	UNPAUSE_SPECIFIC_OPERATION_ERROR,
} from './types';
import API from '../services';
import { UNDERLYING_ASSETS_TYPES } from '../util/constants';
import { txCallback } from '../util';

export const resetAdminRequests = () => {
	return {
		type: RESET_ADMIN_REQUESTS,
	};
};

export const getControllerData = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_ADMIN_CONTROLLER_DATA_START });

			const dataArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((asset) =>
					API.query.controller.controllerDates(asset)
				)
			);

			const initRates = UNDERLYING_ASSETS_TYPES.reduce(
				(old: any, item, index) => {
					old[item] = dataArray[index];
					return old;
				},
				{}
			);

			dispatch({
				type: GET_ADMIN_CONTROLLER_DATA_SUCCESS,
				payload: initRates,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_ADMIN_CONTROLLER_DATA_ERROR,
			});
		}
	};
};

export const getRiskManagerData = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_RISK_MANAGER_DATA_START });

			const dataArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((asset) =>
					API.query.riskManager.riskManagerDates(asset)
				)
			);

			const data = UNDERLYING_ASSETS_TYPES.reduce((old: any, item, index) => {
				old[item] = dataArray[index];
				return old;
			}, {});

			dispatch({
				type: GET_RISK_MANAGER_DATA_SUCCESS,
				payload: data,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_RISK_MANAGER_DATA_ERROR,
			});
		}
	};
};

export const getWhitelistMode = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_WHITELIST_MODE_START });

			const mode = await API.query.controller.whitelistMode();

			dispatch({
				type: GET_WHITELIST_MODE_SUCCESS,
				payload: mode.toString(),
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_WHITELIST_MODE_ERROR,
			});
		}
	};
};

export function switchMode(account: string, keyring: any) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SWITCH_MODE_SUCCESS, SWITCH_MODE_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SWITCH_MODE_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.controller.switchMode())
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.controller.switchMode())
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SWITCH_MODE_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export const getPauseKeepers = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_PAUSE_KEEPERS_START });

			const dataArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((asset) =>
					API.query.controller.pauseKeepers(asset)
				)
			);

			const initFlag = UNDERLYING_ASSETS_TYPES.reduce(
				(old: any, item, index) => {
					old[item] = dataArray[index];
					return old;
				},
				{}
			);

			dispatch({
				type: GET_PAUSE_KEEPERS_SUCCESS,
				payload: initFlag,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_PAUSE_KEEPERS_ERROR,
			});
		}
	};
};

export function pauseSpecificOperation(
	account: string,
	keyring: any,
	poolId: string,
	operation: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[PAUSE_SPECIFIC_OPERATION_SUCCESS, PAUSE_SPECIFIC_OPERATION_ERROR],
			dispatch
		);

		try {
			dispatch({ type: PAUSE_SPECIFIC_OPERATION_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.controller.pauseSpecificOperation(poolId, operation))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.controller.pauseSpecificOperation(poolId, operation))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: PAUSE_SPECIFIC_OPERATION_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function unpauseSpecificOperation(
	account: string,
	keyring: any,
	poolId: string,
	operation: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[UNPAUSE_SPECIFIC_OPERATION_SUCCESS, UNPAUSE_SPECIFIC_OPERATION_ERROR],
			dispatch
		);

		try {
			dispatch({ type: UNPAUSE_SPECIFIC_OPERATION_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.sudo
					.sudo(API.tx.controller.unpauseSpecificOperation(poolId, operation))
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.sudo
					.sudo(API.tx.controller.unpauseSpecificOperation(poolId, operation))
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: UNPAUSE_SPECIFIC_OPERATION_ERROR,
				payload: err.toString(),
			});
		}
	};
}