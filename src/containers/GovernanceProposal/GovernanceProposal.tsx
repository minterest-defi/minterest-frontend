import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
	getProposal,
	resetProposal,
	getProposalVoting,
	resetProposalVoting,
} from '../../actions/governanceData';
import './GovernanceProposal.scss';
import {
	proposalVote,
	proposalDisapprove,
	proposalClose,
	proposalExecute,
	resetGovernanceRequests,
} from '../../actions/governanceUpdates';
import { State } from '../../util/types';
import Loading from '../../util/Loading';
import ProposedExtrinsicData from '../../components/Governance/ProposedExtrinsicData/ProposedExtrinsicData';
import ProposedExtrinsicVotes from '../../components/Governance/ProposedExtrinsicVotes/ProposedExtrinsicVotes';
import LoaderButton from '../../components/Common/LoaderButton/LoaderButton';
import { useAPIResponse } from '../../util';
import { MESSAGE_SUCCESS } from '../../util/constants';
import { Props, ProposalParams } from './types';

function GovernanceProposal(props: Props) {
	const {
		getProposal,
		resetProposal,
		proposal,
		proposalVoting,
		getProposalVoting,
		resetProposalVoting,
		currentAccount,
		proposalVote,
		proposalDisapprove,
		proposalExecute,
		proposalClose,
		resetGovernanceRequests,
		keyring,

		isVoteProposalRequestRunning,
		voteProposalResponse,

		isDisapproveProposalRequestRunning,
		disapproveProposalResponse,

		isCloseProposalRequestRunning,
		closeProposalResponse,

		isExecuteProposalRequestRunning,
		executeProposalResponse,
	} = props;

	const { proposalHash } = useParams<ProposalParams>();

	const history = useHistory();

	const accountReady = !!currentAccount;

	const handleVote = (vote: boolean) => () => {
		if (currentAccount)
			proposalVote(keyring, currentAccount, proposalHash, proposal.index, vote);
	};
	const handleClose = () => {
		if (currentAccount)
			proposalClose(
				keyring,
				currentAccount,
				proposalHash,
				proposalVoting.index
			);
	};
	const handleDisapprove = () => {
		if (currentAccount)
			proposalDisapprove(keyring, currentAccount, proposalHash);
	};
	const handleExecute = () => {
		const extrinsicConfig = {
			module: proposal.section,
			extrinsicName: proposal.method,
			extrinsicParams: proposal.args,
		};
		if (currentAccount)
			proposalExecute(keyring, currentAccount, extrinsicConfig);
	};

	const handleRedirect = () => {
		history.push('/admin_view');
	};
	const handleSuccess = () => alert(MESSAGE_SUCCESS);
	const handleError = (message: string) => alert(message);

	useEffect(() => {
		getProposal(proposalHash);
		getProposalVoting(proposalHash);

		return () => {
			resetProposal();
			resetProposalVoting();
			resetGovernanceRequests();
		};
	}, []);

	useAPIResponse(
		[isVoteProposalRequestRunning, voteProposalResponse],
		handleSuccess,
		handleError
	);

	useAPIResponse(
		[isDisapproveProposalRequestRunning, disapproveProposalResponse],
		handleRedirect,
		handleError
	);

	useAPIResponse(
		[isCloseProposalRequestRunning, closeProposalResponse],
		handleRedirect,
		handleError
	);

	useAPIResponse(
		[isExecuteProposalRequestRunning, executeProposalResponse],
		handleSuccess,
		handleError
	);

	if (!proposal || !proposalVoting) return <Loading />;

	console.log(proposal);
	console.log(proposalVoting);

	return (
		<div className='governance-proposal-page'>
			<div className='proposal-header'>
				<div className='proposal-hash'>HASH: {proposalHash}</div>
			</div>
			<div className='proposal-actions'>
				<LoaderButton
					isLoading={isVoteProposalRequestRunning}
					isAccountReady={accountReady}
					disabled={!accountReady}
					onClick={handleVote(true)}
				>
					Pro
				</LoaderButton>
				<LoaderButton
					isLoading={isVoteProposalRequestRunning}
					isAccountReady={accountReady}
					disabled={!accountReady}
					onClick={handleVote(false)}
				>
					Against
				</LoaderButton>
				<LoaderButton
					isLoading={isCloseProposalRequestRunning}
					isAccountReady={accountReady}
					disabled={!accountReady}
					onClick={handleClose}
				>
					Close
				</LoaderButton>
				<LoaderButton
					isLoading={isDisapproveProposalRequestRunning}
					isAccountReady={accountReady}
					disabled={!accountReady}
					onClick={handleDisapprove}
				>
					Disapprove
				</LoaderButton>
				<LoaderButton
					isLoading={isExecuteProposalRequestRunning}
					isAccountReady={accountReady}
					disabled={!accountReady}
					onClick={handleExecute}
				>
					Execute
				</LoaderButton>
			</div>
			<ProposedExtrinsicData proposal={proposal} />
			<ProposedExtrinsicVotes proposalVoting={proposalVoting} />
		</div>
	);
}

const mapStateToProps = (state: State) => ({
	currentAccount: state.account.currentAccount,
	keyring: state.account.keyring,
	proposal: state.governanceData.proposal,
	proposalVoting: state.governanceData.proposalVoting,
	isVoteProposalRequestRunning:
		state.governanceUpdates.isVoteProposalRequestRunning,
	voteProposalResponse: state.governanceUpdates.voteProposalResponse,
	isDisapproveProposalRequestRunning:
		state.governanceUpdates.isDisapproveProposalRequestRunning,
	disapproveProposalResponse:
		state.governanceUpdates.disapproveProposalResponse,
	isCloseProposalRequestRunning:
		state.governanceUpdates.isCloseProposalRequestRunning,
	closeProposalResponse: state.governanceUpdates.closeProposalResponse,
	isExecuteProposalRequestRunning:
		state.governanceUpdates.isExecuteProposalRequestRunning,
	executeProposalResponse: state.governanceUpdates.executeProposalResponse,
});

const mapDispatchToProps = {
	getProposal,
	getProposalVoting,
	resetProposal,
	resetProposalVoting,
	proposalVote,
	proposalDisapprove,
	proposalClose,
	proposalExecute,
	resetGovernanceRequests,
};

export default connect(mapStateToProps, mapDispatchToProps)(GovernanceProposal);
