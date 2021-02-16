import { web3FromAddress } from '@polkadot/extension-dapp';
import API from '../services';
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
} from './types';

export function setBaseRatePerBlock(
	account,
	keyring,
	poolId,
	baseRatePerYearN,
	baseRatePerYearD
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
								type: SET_BASE_RATE_PER_BLOCK_REQUEST_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: SET_BASE_RATE_PER_BLOCK_REQUEST_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: SET_BASE_RATE_PER_BLOCK_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestModel
					.setBaseRatePerBlock(poolId, baseRatePerYearN, baseRatePerYearD)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestModel
					.setBaseRatePerBlock(poolId, baseRatePerYearN, baseRatePerYearD)
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
								type: SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: SET_JUMP_MULTIPLIER_PER_BLOCK_REQUEST_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

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
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestModel
					.setJumpMultiplierPerBlock(
						poolId,
						jumpMultiplierRatePerYearN,
						jumpMultiplierRatePerYearD
					)
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
								type: SET_KINK_REQUEST_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: SET_KINK_REQUEST_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: SET_KINK_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestModel
					.setKink(poolId, kinkNominator, kinkDivider)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestModel
					.setKink(poolId, kinkNominator, kinkDivider)
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
								type: SET_MULTIPLIER_PER_BLOCK_REQUEST_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: SET_MULTIPLIER_PER_BLOCK_REQUEST_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

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
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestModel
					.setMultiplierPerBlock(
						poolId,
						multiplierRatePerYearN,
						multiplierRatePerYearD
					)
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
