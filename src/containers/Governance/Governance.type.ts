export interface GovernanceProps {
	account: string | null;
	keyring: any;

	getProposals: () => Promise<void>;

	proposals: any;
}
