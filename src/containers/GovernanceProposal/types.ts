export interface Props {
	getProposal: (hash: string) => Promise<void>;
	getProposalVoting: (hash: string) => Promise<void>;
	resetProposal: () => void;
	resetProposalVoting: () => void;
	keyring: any;
	proposal: any;
	proposalVoting: any;
	currentAccount: string | null;
	isVoteProposalRequestRunning: boolean;
	voteProposalResponse: any;
	isDisapproveProposalRequestRunning: boolean;
	disapproveProposalResponse: any;
	isCloseProposalRequestRunning: boolean;
	closeProposalResponse: any;
	isExecuteProposalRequestRunning: boolean;
	executeProposalResponse: any;

	proposalVote: (
		keyring: any,
		account: string,
		proposalHash: string,
		index: string,
		approve: boolean
	) => Promise<void>;

	proposalDisapprove: (
		keyring: any,
		account: string,
		proposalHash: string
	) => Promise<void>;

	proposalExecute: (
		keyring: any,
		account: string,
		extrinsicConfig: any,
		lengthBound?: number
	) => Promise<void>;

	proposalClose: (
		keyring: any,
		account: string,
		proposalHash: string,
		index: number,
		proposalWeightBound?: number,
		lengthBound?: number
	) => Promise<void>;

	resetGovernanceRequests: () => void;
}
export interface ProposalParams {
	proposalHash: string;
}
