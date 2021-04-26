import { Metadata } from '../../util/types';

export interface GovernanceProps {
	account: string | null;
	keyring: any;

	getProposals: () => Promise<void>;
	getMetadata: () => void;
	metadata: Metadata;
	proposals: any;
}
