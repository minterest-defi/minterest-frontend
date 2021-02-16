import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import classes from './Admin.module.css';

import AdminPanel from '../../components/AdminPanel/AdminPanel';

function Admin(props) {
	const { accountAddress, updateData } = props;

	return (
		<div className={classes.admin}>
			<h2>Admin panel</h2>
			<AdminPanel account={accountAddress} updateData={updateData} />
		</div>
	);
}

export default Admin;
