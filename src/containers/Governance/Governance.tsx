import React from 'react';
import { connect } from 'react-redux';
import { getProposals } from '../../actions/governanceData';
import { State } from '../../util/types';
import { GovernanceProps } from './Governance.type';

import './Governance.scss';

function Governance(props: GovernanceProps) {
	const {
		account,
		keyring,

		getProposals,
		proposals,
	} = props;
	return <div>Governance</div>;
}

const mapStateToProps = (state: State) => ({
	account: state.account.currentAccount,
	keyring: state.account.keyring,

	proposals: state.governanceData.proposals,
});

const mapDispatchToProps = {
	getProposals,
};

export default connect(mapStateToProps, mapDispatchToProps)(Governance);
