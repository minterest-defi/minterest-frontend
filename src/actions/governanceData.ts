import API from '../services';
import { Dispatch } from '../util/types';
import {
	GET_PROPOSALS_START,
	GET_PROPOSALS_ERROR,
	GET_PROPOSALS_SUCCSESS,
	PROPOSE_EXTRINSIC_ERROR,
	PROPOSE_EXTRINSIC_START,
	PROPOSE_EXTRINSIC_SUCCESS,
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

export function proposeExtrinsic(
	threshold: number,
	extrinsic: any,
	lengthBound = 4294967295
) {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: PROPOSE_EXTRINSIC_START });
			dispatch({ type: PROPOSE_EXTRINSIC_SUCCESS });
		} catch (err) {
			console.log(err);
			dispatch({ type: PROPOSE_EXTRINSIC_ERROR });
		}
	};
}
