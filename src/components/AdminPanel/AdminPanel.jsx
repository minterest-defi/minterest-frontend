import React from 'react';
import InsuranceDeposit from './InsuranceDeposit/InsuranceDeposit';
import InsuranceRedeem from './InsuranceRedeem/InsuranceRedeem';
import PoolOperationsStatuses from './PoolOperationsStatuses/PoolOperationsStatuses';
import PoolOperationsSwitch from './PoolOperationsSwitch/PoolOperationsSwitch';

function AdminPanel({ account, setStateStale, stateStale }) {
	return (
		<div>
			<PoolOperationsSwitch account={account} />
			<PoolOperationsStatuses account={account} />
			<fieldset>
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
		</div>
	);
}

export default AdminPanel;
