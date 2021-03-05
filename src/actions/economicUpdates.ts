import { web3FromAddress } from '@polkadot/extension-dapp';
import API from '../services';
import { Dispatch } from '../util/types';
import {
	SET_BASE_RATE_PER_BLOCK_REQUEST_START,
	SET_BASE_RATE_PER_BLOCK_REQUEST_ERROR,
	SET_BASE_RATE_PER_BLOCK_REQUEST_SUCCESS,
	SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_START,
	SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_ERROR,
	SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_SUCCESS,
	SET_KINK_REQUEST_START,
	SET_KINK_REQUEST_ERROR,
	SET_KINK_REQUEST_SUCCESS,
	SET_MULTIPLIER_PER_BLOCK_REQUEST_START,
	SET_MULTIPLIER_PER_BLOCK_REQUEST_ERROR,
	SET_MULTIPLIER_PER_BLOCK_REQUEST_SUCCESS,
	RESET_ECONOMIC_UPDATE_REQUESTS,
	GET_MINTEREST_MODEL_DATA_START,
	GET_MINTEREST_MODEL_DATA_SUCCESS,
	GET_MINTEREST_MODEL_DATA_ERROR,
} from './types';
import { UNDERLYING_ASSETS_TYPES } from '../util/constants';
import { txCallback } from '../util';

export function setBaseRatePerBlock(
	account,
	keyring,
	poolId,
	baseRatePerYearN,
	baseRatePerYearD
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				SET_BASE_RATE_PER_BLOCK_REQUEST_SUCCESS,
				SET_BASE_RATE_PER_BLOCK_REQUEST_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: SET_BASE_RATE_PER_BLOCK_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestModel
					.setBaseRatePerBlock(poolId, baseRatePerYearN, baseRatePerYearD)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestModel
					.setBaseRatePerBlock(poolId, baseRatePerYearN, baseRatePerYearD)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_BASE_RATE_PER_BLOCK_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function setJumpMultiplierPerBlock(
	account,
	keyring,
	poolId,
	jumpMultiplierRatePerYearN,
	jumpMultiplierRatePerYearD
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_SUCCESS,
				SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestModel
					.setJumpMultiplierPerBlock(
						poolId,
						jumpMultiplierRatePerYearN,
						jumpMultiplierRatePerYearD
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestModel
					.setJumpMultiplierPerBlock(
						poolId,
						jumpMultiplierRatePerYearN,
						jumpMultiplierRatePerYearD
					)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export function setKink(account, keyring, poolId, kinkNominator, kinkDivider) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[SET_KINK_REQUEST_SUCCESS, SET_KINK_REQUEST_ERROR],
			dispatch
		);

		try {
			dispatch({ type: SET_KINK_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestModel
					.setKink(poolId, kinkNominator, kinkDivider)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestModel
					.setKink(poolId, kinkNominator, kinkDivider)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({ type: SET_KINK_REQUEST_ERROR, payload: err.toString() });
		}
	};
}

export function setMultiplierPerBlock(
	account,
	keyring,
	poolId,
	multiplierRatePerYearN,
	multiplierRatePerYearD
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[
				SET_MULTIPLIER_PER_BLOCK_REQUEST_SUCCESS,
				SET_MULTIPLIER_PER_BLOCK_REQUEST_ERROR,
			],
			dispatch
		);

		try {
			dispatch({ type: SET_MULTIPLIER_PER_BLOCK_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestModel
					.setMultiplierPerBlock(
						poolId,
						multiplierRatePerYearN,
						multiplierRatePerYearD
					)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestModel
					.setMultiplierPerBlock(
						poolId,
						multiplierRatePerYearN,
						multiplierRatePerYearD
					)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			dispatch({
				type: SET_MULTIPLIER_PER_BLOCK_REQUEST_ERROR,
				payload: err.toString(),
			});
		}
	};
}

export const resetEconomicUpdateRequests = () => {
	return {
		type: RESET_ECONOMIC_UPDATE_REQUESTS,
	};
};

export const getMinterestModel = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_MINTEREST_MODEL_DATA_START });

			const dataArray = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((asset) =>
					API.query.minterestModel.minterestModelDates(asset)
				)
			);

			const initRates = UNDERLYING_ASSETS_TYPES.reduce((old, item, index) => {
				old[item] = dataArray[index];
				return old;
			}, {});

			dispatch({
				type: GET_MINTEREST_MODEL_DATA_SUCCESS,
				payload: initRates,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: GET_MINTEREST_MODEL_DATA_ERROR,
			});
		}
	};
};
