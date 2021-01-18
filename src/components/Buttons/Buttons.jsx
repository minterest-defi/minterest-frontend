import React from 'react';
import Borrow from './Borrow/Borrow';
import Deposit from './Deposit/Deposit';
import Redeem from './Redeem/Redeem';
import Repay from './Repay/Repay';

import classes from './Buttons.module.css';

function Buttons({ account, onChange, userState }) {
	return (
		<div>
			<div className={classes.item}>
				<Deposit account={account} onChange={onChange} userState={userState} />
			</div>
			<div className={classes.item}>
				<Redeem account={account} onChange={onChange} userState={userState} />
			</div>
			<div className={classes.item}>
				<Borrow account={account} onChange={onChange} userState={userState} />
			</div>
			<div className={classes.item}>
				<Repay account={account} onChange={onChange} userState={userState} />
			</div>
		</div>
	);
}

export default Buttons;
