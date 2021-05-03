import { web3FromAddress } from '@polkadot/extension-dapp';
import { Dispatch, ExtrinsicConfig, GetState } from '../util/types';
import {
	CLOSE_PROPOSAL_ERROR,
	CLOSE_PROPOSAL_START,
	CLOSE_PROPOSAL_SUCCESS,
	DISAPPROVE_PROPOSAL_ERROR,
	DISAPPROVE_PROPOSAL_START,
	DISAPPROVE_PROPOSAL_SUCCESS,
	EXECUTE_PROPOSAL_ERROR,
	EXECUTE_PROPOSAL_START,
	EXECUTE_PROPOSAL_SUCCESS,
	PROPOSE_EXTRINSIC_ERROR,
	PROPOSE_EXTRINSIC_START,
	PROPOSE_EXTRINSIC_SUCCESS,
	RESET_GOVERNANCE_REQUESTS,
	VOTE_PROPOSAL_ERROR,
	VOTE_PROPOSAL_START,
	VOTE_PROPOSAL_SUCCESS,
} from './types';
import { txCallback, convertExtrinsicParams, convertApiStrings } from '../util';
import API from '../services';

export function proposeExtrinsic(
	keyring: any,
	account: string,
	threshold: number,
	extrinsicConfig: ExtrinsicConfig,
	lengthBound = 42949672 // TODO fix number 4294967295
) {
	return async (dispatch: Dispatch, getState: GetState) => {
		const callBack = txCallback(
			[PROPOSE_EXTRINSIC_SUCCESS, PROPOSE_EXTRINSIC_ERROR],
			dispatch
		);

		try {
			dispatch({ type: PROPOSE_EXTRINSIC_START });
			const {
				protocolData: { metadata },
			} = getState();

			const currentUser = keyring.getPair(account);
			const { module, extrinsicName, extrinsicParams } = extrinsicConfig;

			const convertedParams = convertExtrinsicParams(
				module,
				extrinsicName,
				extrinsicParams,
				metadata
			);

			const convertedApiStrings = convertApiStrings(module, extrinsicName);

			const extrinsic = API.tx[convertedApiStrings.module][
				convertedApiStrings.extrinsicName
			](...convertedParams);

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
			dispatch({ type: PROPOSE_EXTRINSIC_ERROR, payload: err.toString() });
		}
	};
}

export function proposalVote(
	keyring: any,
	account: string,
	proposalHash: string,
	index: string,
	approve: boolean
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[VOTE_PROPOSAL_SUCCESS, VOTE_PROPOSAL_ERROR],
			dispatch
		);

		try {
			dispatch({ type: VOTE_PROPOSAL_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestCouncil
					.vote(proposalHash, index, approve)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestCouncil
					.vote(proposalHash, index, approve)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			console.log(err);
			dispatch({ type: VOTE_PROPOSAL_ERROR, payload: err.toString() });
		}
	};
}

export function proposalExecute(
	keyring: any,
	account: string,
	extrinsicConfig: any,
	lengthBound: number = 42949672 // TODO fix number 4294967295
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[EXECUTE_PROPOSAL_SUCCESS, EXECUTE_PROPOSAL_ERROR],
			dispatch
		);

		try {
			dispatch({ type: EXECUTE_PROPOSAL_START });

			const currentUser = keyring.getPair(account);

			const { module, extrinsicName, extrinsicParams } = extrinsicConfig;

			const convertedApiStrings = convertApiStrings(module, extrinsicName);

			const extrinsic = API.tx[convertedApiStrings.module][
				convertedApiStrings.extrinsicName
			](...extrinsicParams);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);

				await API.tx.minterestCouncil
					.execute(extrinsic, lengthBound)
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestCouncil
					.execute(extrinsic, lengthBound)
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			console.log(err);
			dispatch({ type: EXECUTE_PROPOSAL_ERROR, payload: err.toString() });
		}
	};
}

export function proposalClose(
	keyring: any,
	account: string,
	proposalHash: string,
	index: number,
	proposalWeightBound: number = 42949672, // TODO fix number???
	lengthBound: number = 42949672 // TODO fix number 4294967295
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[CLOSE_PROPOSAL_SUCCESS, CLOSE_PROPOSAL_ERROR],
			dispatch
		);

		try {
			dispatch({ type: CLOSE_PROPOSAL_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestCouncil
					.close(proposalHash, index, proposalWeightBound, lengthBound)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestCouncil
					.close(proposalHash, index, proposalWeightBound, lengthBound)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			console.log(err);
			dispatch({ type: CLOSE_PROPOSAL_ERROR, payload: err.toString() });
		}
	};
}

export function proposalDisapprove(
	keyring: any,
	account: string,
	proposalHash: string
) {
	return async (dispatch: Dispatch) => {
		const callBack = txCallback(
			[DISAPPROVE_PROPOSAL_SUCCESS, DISAPPROVE_PROPOSAL_ERROR],
			dispatch
		);

		try {
			dispatch({ type: DISAPPROVE_PROPOSAL_START });
			const currentUser = keyring.getPair(account);

			if (currentUser.isLocked) {
				const injector = await web3FromAddress(account);
				await API.tx.minterestCouncil
					.disapproveProposal(proposalHash)
					// @ts-ignore
					.signAndSend(account, { signer: injector.signer }, callBack);
			} else {
				await API.tx.minterestCouncil
					.disapproveProposal(proposalHash)
					// @ts-ignore
					.signAndSend(currentUser, callBack);
			}
		} catch (err) {
			console.log(err);
			dispatch({ type: DISAPPROVE_PROPOSAL_ERROR, payload: err.toString() });
		}
	};
}

export function resetGovernanceRequests() {
	return {
		type: RESET_GOVERNANCE_REQUESTS,
	};
}
