import React from 'react';
import InsuranceDeposit from './InsuranceDeposit/InsuranceDeposit';
import InsuranceRedeem from './InsuranceRedeem/InsuranceRedeem';
import SwitchAnnotation from './SwitchAnnotation/SwitchAnnotation';
import SwitchPauseOperation from './SwitchPauseOperation/SwitchPauseOperation';

function AdminPanel({ account, onChange, poolState }) {
	return (
		<div>
			<SwitchPauseOperation account={account} />
			<SwitchAnnotation account={account} />
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
		</div>
	);
}

export default AdminPanel;
