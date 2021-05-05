import { Action, GovernanceUpdatesReducerType } from '../../util/types';
import {
	PROPOSE_EXTRINSIC_START,
	PROPOSE_EXTRINSIC_SUCCESS,
	PROPOSE_EXTRINSIC_ERROR,
} from '../../actions/types';

const initialState: GovernanceUpdatesReducerType = {
	isProposeExtrinsicRequestRunning: false,
	proposeExtrinsicResponse: null,
};

export default function governanceUpdatesReducer(
	state = initialState,
	action: Action
): GovernanceUpdatesReducerType {
	switch (action.type) {
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
