import API from '../services';
import { Dispatch } from '../util/types';
import {
	GET_PROPOSALS_START,
	GET_PROPOSALS_ERROR,
	GET_PROPOSALS_SUCCSESS,
	GET_PROPOSAL_ERROR,
	GET_PROPOSAL_START,
	GET_PROPOSAL_SUCCESS,
	RESET_PROPOSAL,
	RESET_PROPOSAL_VOTING,
	GET_PROPOSAL_VOTING_START,
	GET_PROPOSAL_VOTING_SUCCESS,
	GET_PROPOSAL_VOTING_ERROR,
} from './types';

export function getProposals() {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_PROPOSALS_START });
			const data = await API.query.minterestCouncil.proposals();

			dispatch({ type: GET_PROPOSALS_SUCCSESS, payload: data });
		} catch (err) {
			console.log(err);
			dispatch({ type: GET_PROPOSALS_ERROR });
		}
	};
}

export function getProposal(hash: string) {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_PROPOSAL_START });
			const data = await API.query.minterestCouncil.proposalOf(hash);
			const values = {
				// @ts-ignore
				method: data.value.method,
				// @ts-ignore
				section: data.value.section,
				// @ts-ignore
				args: data.value.args
					? // @ts-ignore
					  data.value.args.map((arg: any) => arg.toHuman())
					: [],
			};
			dispatch({ type: GET_PROPOSAL_SUCCESS, payload: values });
		} catch (err) {
			console.log(err);
			dispatch({ type: GET_PROPOSAL_ERROR, payload: err.toString() });
		}
	};
}

export function getProposalVoting(hash: string) {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: GET_PROPOSAL_VOTING_START });
			const data = await API.query.minterestCouncil.voting(hash);
			dispatch({ type: GET_PROPOSAL_VOTING_SUCCESS, payload: data.toJSON() });
		} catch (err) {
			console.log(err);
			dispatch({ type: GET_PROPOSAL_VOTING_ERROR, payload: err.toString() });
		}
	};
}

export function resetProposal() {
	return {
		type: RESET_PROPOSAL,
	};
}

export function resetProposalVoting() {
	return {
		type: RESET_PROPOSAL_VOTING,
	};
}
