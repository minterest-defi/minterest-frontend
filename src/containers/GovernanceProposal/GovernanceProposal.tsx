import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import {
	getProposal,
	resetProposal,
	getProposalVoting,
	resetProposalVoting,
} from '../../actions/governanceData';
import { State } from '../../util/types';
import Loading from '../../util/Loading';
import ProposedExtrinsicData from '../../components/Governance/ProposedExtrinsicData/ProposedExtrinsicData';

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
	// TODO already voted ?

	return (
		<div className='governance-proposal-page'>
			<div className='proposal-header'>
				<div className='proposal-hash'>HASH: {proposalHash}</div>
			</div>
			<div className='extrinsic'>
				<ProposedExtrinsicData proposal={proposal} />
			</div>
			<div className='proposal-info'>
				<div className='info-wrapper'>
					<div className='label'>Threshold:</div>
					<div className='value'>{proposalVoting.threshold}</div>
				</div>
				<div className='info-wrapper'>
					<div className='label'>Ayes:</div>
					<div className='value'>{proposalVoting.ayes.length}</div>
				</div>
				<div className='info-wrapper'>
					<div className='label'>Nays:</div>
					<div className='value'>{proposalVoting.ayes.length}</div>
				</div>
				<div className='info-wrapper'>
					<div className='label'>End (block number):</div>
					<div className='value'>{proposalVoting.end}</div>
				</div>
			</div>
			<div className='proposal-actions'>
				<Button>Vote +</Button>
				<Button>Vote -</Button>
			</div>
		</div>
	);
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
