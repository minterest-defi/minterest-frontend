import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
	getProposal,
	resetProposal,
	getProposalVoting,
	resetProposalVoting,
} from '../../actions/governanceData';
import { State } from '../../util/types';
import Loading from '../../util/Loading';

interface Props {
	getProposal: (hash: string) => Promise<void>;
	getProposalVoting: (hash: string) => Promise<void>;
	resetProposal: () => void;
	resetProposalVoting: () => void;
	proposal: any;
	proposalVoting: any;
}
interface ProposalParams {
	proposalHash: string;
}

function GovernanceProposal(props: Props) {
	const {
		getProposal,
		resetProposal,
		proposal,
		proposalVoting,
		getProposalVoting,
		resetProposalVoting,
	} = props;

	const { proposalHash } = useParams<ProposalParams>();

	useEffect(() => {
		getProposal(proposalHash);
		getProposalVoting(proposalHash);

		return () => {
			resetProposal();
			resetProposalVoting();
		};
	}, []);

	if (!proposal || !proposalVoting) return <Loading />;

	console.log(proposal);
	console.log(proposalVoting);

	return <div className='governance-proposal-page'>HASH: {proposalHash}</div>;
}

const mapStateToProps = (state: State) => ({
	proposal: state.governanceData.proposal,
	proposalVoting: state.governanceData.proposalVoting,
});

const mapDispatchToProps = {
	getProposal,
	getProposalVoting,
	resetProposal,
	resetProposalVoting,
};

export default connect(mapStateToProps, mapDispatchToProps)(GovernanceProposal);
