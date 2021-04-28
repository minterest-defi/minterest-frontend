import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProposals } from '../../actions/governanceData';
import { getMetadata } from '../../actions/protocolData';
import { State } from '../../util/types';
import { GovernanceProps } from './Governance.type';

import './Governance.scss';
import ProposalsData from '../../components/ProposalsData/ProposalsData';
import ProposeExtrinsicBlock from '../../components/ProposalsData/ProposeExtrinsicBlock/ProposeExtrinsicBlock';

function Governance(props: GovernanceProps) {
	const { getProposals, proposals, getMetadata, metadata } = props;

	useEffect(() => {
		getGovernanceData();
		getMetadata();
		return () => {};
	}, []);

	const getGovernanceData = () => {
		getProposals();
	};

	return (
		<div className='governance-page'>
			<ProposeExtrinsicBlock metadata={metadata} />
			<ProposalsData proposals={proposals} />
		</div>
	);
}

const mapStateToProps = (state: State) => ({
	proposals: state.governanceData.proposals,
	metadata: state.protocolData.metadata,
});

const mapDispatchToProps = {
	getProposals,
	getMetadata,
};

export default connect(mapStateToProps, mapDispatchToProps)(Governance);
