import React from 'react';
import { connect } from 'react-redux';
import { getProposals } from '../../actions/governanceData';
import { State } from '../../util/types';
import { GovernanceProps } from './Governance.type';

import './Governance.scss';
import ProposalsData from '../../components/ProposalsData/ProposalsData';

function Governance(props: GovernanceProps) {
	const { getProposals, proposals } = props;

	//getProposals();
	return (
		<div>
			<ProposalsData proposals={proposals} />
		</div>
	);
}

const mapStateToProps = (state: State) => ({
	proposals: state.governanceData.proposals,
});

const mapDispatchToProps = {
	getProposals,
};

export default connect(mapStateToProps, mapDispatchToProps)(Governance);
