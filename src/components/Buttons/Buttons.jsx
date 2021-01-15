import React from 'react';
import Borrow from './Borrow/Borrow';
import Deposit from './Deposit/Deposit';
import Redeem from './Redeem/Redeem';
import Repay from './Repay/Repay';

function Buttons({ account }) {
	return (
		<div>
			<Deposit account={account} />
			<Redeem account={account} />
			<Borrow account={account} />
			<Repay account={account} />
		</div>
	);
}

export default Buttons;
