import React from 'react';
import SwitchPauseOperation from './SwitchPauseOperation/SwitchPauseOperation';

function AdminPanel({ account }) {
	return (
		<div>
			<SwitchPauseOperation account={account} />
		</div>
	);
}

export default AdminPanel;
