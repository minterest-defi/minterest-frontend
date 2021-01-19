import React from 'react';
import SwitchAnnotation from './SwitchAnnotation/SwitchAnnotation';
import SwitchPauseOperation from './SwitchPauseOperation/SwitchPauseOperation';

function AdminPanel({ account }) {
	return (
		<div>
			<SwitchPauseOperation account={account} />
			<SwitchAnnotation account={account} />
		</div>
	);
}

export default AdminPanel;
