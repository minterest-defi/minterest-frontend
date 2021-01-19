import React from 'react';
import RedeemAll from './RedeemAll/RedeemAll';
import RedeemUnderlyingAsset from './RedeemUnderlyingAsset/RedeemUnderlyingAsset';
import RedeemWrappedToken from './RedeemWrappedToken/RedeemWrappedToken';

function Redeem({ account, onChange, userState }) {
	return (
		<div>
			<RedeemAll account={account} onChange={onChange} userState={userState} />
			<RedeemUnderlyingAsset
				account={account}
				onChange={onChange}
				userState={userState}
			/>
			<RedeemWrappedToken
				account={account}
				onChange={onChange}
				userState={userState}
			/>
		</div>
	);
}

export default Redeem;
