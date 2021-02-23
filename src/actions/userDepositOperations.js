import { web3FromAddress } from '@polkadot/extension-dapp';
import {
	DEPOSIT_UNDERLYING_REQUEST_START,
	DEPOSIT_UNDERLYING_REQUEST_ERROR,
	DEPOSIT_UNDERLYING_REQUEST_SUCCESS,
} from './types';
import API from '../services';

export function depositUnderlying(
	account,
	keyring,
	underlyingAssetId,
	underlyingAmount
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
								type: DEPOSIT_UNDERLYING_REQUEST_SUCCESS,
							});
						} else if (method === 'ExtrinsicFailed' && error.isModule) {
							const decoded = API.registry.findMetaError(error.asModule);
							const { documentation } = decoded;
							dispatch({
								type: DEPOSIT_UNDERLYING_REQUEST_ERROR,
								payload: documentation.join(' '),
							});
						}
					}
				);
			}
		};

		try {
			dispatch({ type: DEPOSIT_UNDERLYING_REQUEST_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestProtocol
					.depositUnderlying(underlyingAssetId, underlyingAmount)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestProtocol
					.depositUnderlying(underlyingAssetId, underlyingAmount)
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
