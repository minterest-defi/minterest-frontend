import React from 'react';
import Collateral from './Collateral/Collateral';
import BalanceUser from './BalanceUser/BalanceUser';
import BalanceBorrowUser from './BalanceBorrowUser/BalanceBorrowUser';

function ContentUser({ account }) {
	return (
		<div>
			<BalanceUser account={account} />
			<Collateral account={account} />
			<BalanceBorrowUser account={account} />
		</div>
	);
}

export default ContentUser;
