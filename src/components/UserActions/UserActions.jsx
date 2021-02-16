import React from 'react';
import Borrow from './Borrow/Borrow';
import Deposit from './Deposit/Deposit';
import Redeem from './Redeem/Redeem';
import Repay from './Repay/Repay';

// TODO refactoring
function UserActions({ account, updateData }) {
	return (
		<div>
			<Deposit account={account} updateData={updateData} />
			<Redeem account={account} updateData={updateData} />
			<Borrow account={account} updateData={updateData} />
			<Repay account={account} updateData={updateData} />
		</div>
	);
}

export default UserActions;
