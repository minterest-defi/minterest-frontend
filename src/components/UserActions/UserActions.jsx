import React from 'react';
import Borrow from './Borrow/Borrow';
import Deposit from './Deposit/Deposit';
import Redeem from './Redeem/Redeem';
import Repay from './Repay/Repay';

function UserActions({ account, setStateStale, stateStale }) {
	return (
		<div>
			<Deposit
				account={account}
				setStateStale={setStateStale}
				stateStale={stateStale}
			/>
			<Redeem
				account={account}
				setStateStale={setStateStale}
				stateStale={stateStale}
			/>
			<Borrow
				account={account}
				setStateStale={setStateStale}
				stateStale={stateStale}
			/>
			<Repay
				account={account}
				setStateStale={setStateStale}
				stateStale={stateStale}
			/>
		</div>
	);
}

export default UserActions;
