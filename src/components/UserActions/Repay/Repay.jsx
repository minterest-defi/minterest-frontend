import React from 'react';
import RepayAll from './RepayAll/RepayAll';
import RepayOnBehalf from './RepayOnBehalf/RepayOnBehalf';
import RepayUnderlyingAsset from './RepayUnderlying/RepayUnderlying';

function Repay({ account, setStateStale, stateStale, updateData }) {
	return (
		<div>
			<RepayAll
				account={account}
				setStateStale={setStateStale}
				stateStale={stateStale}
				updateData={updateData}
			/>
			<RepayUnderlyingAsset
				account={account}
				setStateStale={setStateStale}
				stateStale={stateStale}
				updateData={updateData}
			/>
			<RepayOnBehalf
				account={account}
				setStateStale={setStateStale}
				stateStale={stateStale}
				updateData={updateData}
			/>
		</div>
	);
}

export default Repay;
