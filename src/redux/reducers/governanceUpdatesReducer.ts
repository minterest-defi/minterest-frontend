import { Action, GovernanceUpdatesReducerType } from '../../util/types';
import {
	PROPOSE_EXTRINSIC_START,
	PROPOSE_EXTRINSIC_SUCCESS,
	PROPOSE_EXTRINSIC_ERROR,
	VOTE_PROPOSAL_START,
	VOTE_PROPOSAL_SUCCESS,
	VOTE_PROPOSAL_ERROR,
	DISAPPROVE_PROPOSAL_START,
	DISAPPROVE_PROPOSAL_SUCCESS,
	DISAPPROVE_PROPOSAL_ERROR,
	CLOSE_PROPOSAL_START,
	CLOSE_PROPOSAL_ERROR,
	CLOSE_PROPOSAL_SUCCESS,
	EXECUTE_PROPOSAL_START,
	EXECUTE_PROPOSAL_SUCCESS,
	EXECUTE_PROPOSAL_ERROR,
	RESET_GOVERNANCE_REQUESTS,
} from '../../actions/types';

const initialState: GovernanceUpdatesReducerType = {
	isProposeExtrinsicRequestRunning: false,
	proposeExtrinsicResponse: null,
	isVoteProposalRequestRunning: false,
	voteProposalResponse: null,
	isDisapproveProposalRequestRunning: false,
	disapproveProposalResponse: null,
	isCloseProposalRequestRunning: false,
	closeProposalResponse: null,
	isExecuteProposalRequestRunning: false,
	executeProposalResponse: null,
};

export default function governanceUpdatesReducer(
	state = initialState,
	action: Action
): GovernanceUpdatesReducerType {
	switch (action.type) {
		case RESET_GOVERNANCE_REQUESTS: {
			return {
				...initialState,
			};
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
		case VOTE_PROPOSAL_START: {
			return {
				...state,
				isVoteProposalRequestRunning: true,
				voteProposalResponse: null,
			};
		}
		case VOTE_PROPOSAL_SUCCESS: {
			return {
				...state,
				isVoteProposalRequestRunning: false,
				voteProposalResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case VOTE_PROPOSAL_ERROR: {
			return {
				...state,
				isVoteProposalRequestRunning: false,
				voteProposalResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case DISAPPROVE_PROPOSAL_START: {
			return {
				...state,
				isDisapproveProposalRequestRunning: true,
				disapproveProposalResponse: null,
			};
		}
		case DISAPPROVE_PROPOSAL_SUCCESS: {
			return {
				...state,
				isDisapproveProposalRequestRunning: false,
				disapproveProposalResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case DISAPPROVE_PROPOSAL_ERROR: {
			return {
				...state,
				isDisapproveProposalRequestRunning: false,
				disapproveProposalResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case CLOSE_PROPOSAL_START: {
			return {
				...state,
				isCloseProposalRequestRunning: true,
				closeProposalResponse: null,
			};
		}
		case CLOSE_PROPOSAL_SUCCESS: {
			return {
				...state,
				isCloseProposalRequestRunning: false,
				closeProposalResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case CLOSE_PROPOSAL_ERROR: {
			return {
				...state,
				isCloseProposalRequestRunning: false,
				closeProposalResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		case EXECUTE_PROPOSAL_START: {
			return {
				...state,
				isExecuteProposalRequestRunning: true,
				executeProposalResponse: null,
			};
		}
		case EXECUTE_PROPOSAL_SUCCESS: {
			return {
				...state,
				isExecuteProposalRequestRunning: false,
				executeProposalResponse: {
					isError: false,
					errorMessage: null,
				},
			};
		}
		case EXECUTE_PROPOSAL_ERROR: {
			return {
				...state,
				isExecuteProposalRequestRunning: false,
				executeProposalResponse: {
					isError: true,
					errorMessage: action.payload,
				},
			};
		}

		default:
			return state;
	}
}
