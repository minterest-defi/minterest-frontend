import React from 'react';
import Collateral from './Collateral/Collateral';
import BalanceUser from './BalanceUser/BalanceUser';

function ContentUser({ account }) {
	return (
		<div>
			<BalanceUser account={account} />
			<Collateral account={account} />
		</div>
	);
}

export default ContentUser;
