import React from 'react';
import Deposit from './Deposit/Deposit';
import Redeem from './Redeem/Redeem';

function Buttons({ account }) {
	return (
		<div>
			<Deposit account={account} />
			<Redeem account={account} />
		</div>
	);
}

export default Buttons;
