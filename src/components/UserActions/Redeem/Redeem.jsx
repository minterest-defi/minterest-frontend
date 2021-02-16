import React from 'react';
import RedeemAll from './RedeemAll/RedeemAll';
import RedeemUnderlyingAsset from './RedeemUnderlyingAsset/RedeemUnderlyingAsset';
import RedeemWrappedToken from './RedeemWrappedToken/RedeemWrappedToken';

function Redeem({ account, updateData }) {
	return (
		<div>
			<RedeemAll account={account} updateData={updateData} />
			<RedeemUnderlyingAsset account={account} updateData={updateData} />
			<RedeemWrappedToken account={account} updateData={updateData} />
		</div>
	);
}

export default Redeem;
