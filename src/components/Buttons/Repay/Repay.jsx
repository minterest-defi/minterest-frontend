import React from 'react';
import RepayAll from './RepayAll/RepayAll';
import RepayUnderlyingAsset from './RepayUnderlying/RepayUnderlying';

function Repay({ account }) {
	return (
		<div>
			<RepayAll account={account} />
			<RepayUnderlyingAsset account={account} />
		</div>
	);
}

export default Repay;
