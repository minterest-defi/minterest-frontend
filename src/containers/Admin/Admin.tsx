import React from 'react';
import { connect } from 'react-redux';
// @ts-ignore
import classes from './Admin.module.css';
import { State } from '../../util/types';
import AdminPanel from '../../components/AdminPanel/AdminPanel';

interface Props {
	currentAccount?: string;
}
// todo refactoring useless component
function Admin(props: Props) {
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

const mapStateToProps = (state: State) => ({
	currentAccount: state.account.currentAccount,
});

export default connect(mapStateToProps, null)(Admin);
