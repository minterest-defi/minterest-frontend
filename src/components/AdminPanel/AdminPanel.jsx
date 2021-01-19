import React from 'react';
import InsuranceDeposit from './Insurance/InsuranceDeposit/InsuranceDeposit';
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
		</div>
	);
}

export default AdminPanel;
