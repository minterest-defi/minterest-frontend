import React from 'react';
import RepayAll from './RepayAll/RepayAll';
import RepayUnderlyingAsset from './RepayUnderlying/RepayUnderlying';

function Repay({ account, onChange, userState }) {
	return (
		<div>
			<RepayAll account={account} onChange={onChange} userState={userState} />
			<RepayUnderlyingAsset
				account={account}
				onChange={onChange}
				userState={userState}
			/>
		</div>
	);
}

export default Repay;
