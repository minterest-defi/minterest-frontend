import React from 'react';
import RedeemAll from './RedeemAll';
import RedeemUnderlyingAsset from './RedeemUnderlyingAsset';
import RedeemWrappedToken from './RedeemWrappedToken';

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
