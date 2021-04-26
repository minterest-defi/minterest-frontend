import { Action, GovernanceDataReducerType } from '../../util/types';
import {
	GET_PROPOSALS_START,
	GET_PROPOSALS_ERROR,
	GET_PROPOSALS_SUCCSESS,
	PROPOSE_EXTRINSIC_START,
	PROPOSE_EXTRINSIC_SUCCESS,
	PROPOSE_EXTRINSIC_ERROR,
} from '../../actions/types';

const initialState: GovernanceDataReducerType = {
	proposals: null,
	isProposeExtrinsicRequestRunning: false,
	proposeExtrinsicResponse: null,
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

		case PROPOSE_EXTRINSIC_START: {
			return {
				...state,
				isProposeExtrinsicRequestRunning: true,
				proposeExtrinsicResponse: null,
			};
		}
		case PROPOSE_EXTRINSIC_SUCCESS: {
			return {
				...state,
				isProposeExtrinsicRequestRunning: false,
				proposeExtrinsicResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case PROPOSE_EXTRINSIC_ERROR: {
			return {
				...state,
				isProposeExtrinsicRequestRunning: false,
				proposeExtrinsicResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		default:
			return state;
	}
}
