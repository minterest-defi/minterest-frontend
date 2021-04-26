import API from '../services';
import { Dispatch } from '../util/types';
import {
	GET_PROPOSALS_START,
	GET_PROPOSALS_ERROR,
	GET_PROPOSALS_SUCCSESS,
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
