import { Action, GovernanceDataReducerType } from '../../util/types';
import {
	GET_PROPOSALS_START,
	GET_PROPOSALS_ERROR,
	GET_PROPOSALS_SUCCSESS,
} from '../../actions/types';

const initialState: GovernanceDataReducerType = {
	proposals: null,
};

export default function governanceDataReducer(
	state = initialState,
	action: Action
): GovernanceDataReducerType {
	switch (action.type) {
		case GET_PROPOSALS_START: {
			return state;
		}

		case GET_PROPOSALS_SUCCSESS: {
			return {
				...state,
				proposals: action.payload,
			};
		}

		case GET_PROPOSALS_ERROR: {
			return state;
		}

		default:
			return state;
	}
}
