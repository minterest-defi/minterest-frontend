import React from 'react';
import Borrow from './Borrow/Borrow';
import Deposit from './Deposit/Deposit';
import Redeem from './Redeem/Redeem';
import Repay from './Repay/Repay';

function Buttons({ account, onChange, userState }) {
	debugger;
	return (
		<div>
			<Deposit account={account} onChange={onChange} userState={userState} />
			<Redeem account={account} onChange={onChange} userState={userState} />
			<Borrow account={account} onChange={onChange} userState={userState} />
			<Repay account={account} onChange={onChange} userState={userState} />
		</div>
	);
}

export default Buttons;
