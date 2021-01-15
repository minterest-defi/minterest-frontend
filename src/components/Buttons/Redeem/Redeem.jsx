import React from 'react';
import RedeemAll from './RedeemAll/RedeemAll';
import RedeemUnderlyingAsset from './RedeemUnderlyingAsset/RedeemUnderlyingAsset';
import RedeemWrappedToken from './RedeemWrappedToken/RedeemWrappedToken';

function Redeem({ account }) {
	return (
		<div>
			<RedeemAll account={account} />
			<RedeemUnderlyingAsset account={account} />
			<RedeemWrappedToken account={account} />
		</div>
	);
}

export default Redeem;
