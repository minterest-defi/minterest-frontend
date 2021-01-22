import React from 'react';
import AdminContent from './AdminContent/AdminContent';
import InsuranceDeposit from './InsuranceDeposit/InsuranceDeposit';
import InsuranceRedeem from './InsuranceRedeem/InsuranceRedeem';
import PoolOperationsStatuses from './PoolOperationsStatuses/PoolOperationsStatuses';
import PoolOperationsSwitch from './PoolOperationsSwitch/PoolOperationsSwitch';

import classes from './AdminPanel.module.css';

function AdminPanel({ account, setStateStale, stateStale }) {
	return (
		<div className={classes.admin_panel}>
			<div className={classes.switch}>
				<PoolOperationsSwitch account={account} />
				<PoolOperationsStatuses account={account} />
			</div>
			<fieldset className={classes.fieldset}>
				<legend>Insurance operations</legend>
				<InsuranceDeposit
					account={account}
					setStateStale={setStateStale}
					stateStale={stateStale}
				/>
				<InsuranceRedeem
					account={account}
					setStateStale={setStateStale}
					stateStale={stateStale}
				/>
			</fieldset>
			<div className={classes.content}>
				<AdminContent />
			</div>
		</div>
	);
}

export default AdminPanel;
