import React from 'react';
import { connect } from 'react-redux';
import classes from './Admin.module.css';

import AdminPanel from '../../components/AdminPanel/AdminPanel';

// todo refactoring
function Admin(props) {
	const { currentAccount } = props;

	return (
		<div className={classes.admin}>
			<h2>Admin panel</h2>
			<AdminPanel
				account={currentAccount}
				setStateStale={() => {}}
				stateStale={null}
			/>
		</div>
	);
}

const mapStateToProps = (state) => ({
	currentAccount: state.account.currentAccount,
});

export default connect(mapStateToProps, null)(Admin);
