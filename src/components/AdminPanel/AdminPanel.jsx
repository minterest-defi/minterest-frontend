import React from 'react';
import InsuranceDeposit from './InsuranceDeposit/InsuranceDeposit';
import InsuranceRedeem from './InsuranceRedeem/InsuranceRedeem';
import PoolOperationsStatuses from './PoolOperationsStatuses/PoolOperationsStatuses';
import PoolOperationsSwitch from './PoolOperationsSwitch/PoolOperationsSwitch';

function AdminPanel({ account, onChange, poolState }) {
	return (
		<div>
			<PoolOperationsSwitch account={account} />
			<PoolOperationsStatuses account={account} />
			<fieldset>
				<legend>Insurance operations</legend>
				<InsuranceDeposit
					account={account}
					onChange={onChange}
					poolState={poolState}
				/>
				<InsuranceRedeem
					account={account}
					onChange={onChange}
					poolState={poolState}
				/>
			</fieldset>
		</div>
	);
}

export default AdminPanel;
