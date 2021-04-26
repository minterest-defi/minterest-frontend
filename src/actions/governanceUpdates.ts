import { Dispatch } from '../util/types';
import {
	PROPOSE_EXTRINSIC_ERROR,
	PROPOSE_EXTRINSIC_START,
	PROPOSE_EXTRINSIC_SUCCESS,
} from './types';
import { txCallback } from '../util';
import { web3FromAddress } from '@polkadot/extension-dapp';
import API from '../services';

export function proposeExtrinsic(
	keyring: any,
	account: string,
	threshold: number,
	extrinsic: any,
	lengthBound = 4294967295
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[PROPOSE_EXTRINSIC_SUCCESS, PROPOSE_EXTRINSIC_ERROR],
			dispatch
		);

		try {
			dispatch({ type: PROPOSE_EXTRINSIC_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);

				await API.tx.minterestCouncil
					.propose(threshold, extrinsic, lengthBound)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestCouncil
					.propose(threshold, extrinsic, lengthBound)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			console.log(err);
			dispatch({ type: PROPOSE_EXTRINSIC_ERROR });
		}
	};
}
