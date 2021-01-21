import React from 'react';
import RepayAll from './RepayAll/RepayAll';
import RepayUnderlyingAsset from './RepayUnderlying/RepayUnderlying';

function Repay({ account, setStateStale, stateStale }) {
	return (
		<div>
			<RepayAll
				account={account}
				setStateStale={setStateStale}
				stateStale={stateStale}
			/>
			<RepayUnderlyingAsset
				account={account}
				setStateStale={setStateStale}
				stateStale={stateStale}
			/>
		</div>
	);
}

export default Repay;
