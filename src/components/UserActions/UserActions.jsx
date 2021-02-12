import React from 'react';
import Borrow from './Borrow/Borrow';
import Deposit from './Deposit/Deposit';
import Redeem from './Redeem/Redeem';
import Repay from './Repay/Repay';

// TODO refactoring
function UserActions({ account, setStateStale, stateStale, updateData }) {
	return (
		<div>
			<Deposit
				account={account}
				setStateStale={setStateStale}
				stateStale={stateStale}
				updateData={updateData}
			/>
			<Redeem
				account={account}
				setStateStale={setStateStale}
				stateStale={stateStale}
				updateData={updateData}
			/>
			<Borrow
				account={account}
				setStateStale={setStateStale}
				stateStale={stateStale}
				updateData={updateData}
			/>
			<Repay
				account={account}
				setStateStale={setStateStale}
				stateStale={stateStale}
				updateData={updateData}
			/>
		</div>
	);
}

export default UserActions;
