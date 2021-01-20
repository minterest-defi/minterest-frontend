import React from 'react';
import PoolOperationsStatuses from './PoolOperationsStatuses/PoolOperationsStatuses';
import PoolOperationsSwitch from './PoolOperationsSwitch/PoolOperationsSwitch';

function AdminPanel({ account }) {
	return (
		<div>
			<PoolOperationsSwitch account={account} />
			<PoolOperationsStatuses account={account} />
		</div>
	);
}

export default AdminPanel;
