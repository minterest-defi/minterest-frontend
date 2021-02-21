import React from 'react';
import RepayAll from './RepayAll/RepayAll';
import RepayOnBehalf from './RepayOnBehalf/RepayOnBehalf';
import RepayUnderlyingAsset from './RepayUnderlying/RepayUnderlying';

function RepayOperations({ account, updateData }) {
	return (
		<div>
			<RepayAll account={account} updateData={updateData} />
			<RepayUnderlyingAsset account={account} updateData={updateData} />
			<RepayOnBehalf account={account} updateData={updateData} />
		</div>
	);
}

export default RepayOperations;
