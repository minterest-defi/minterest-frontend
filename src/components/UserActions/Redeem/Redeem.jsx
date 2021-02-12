import React from 'react';
import RedeemAll from './RedeemAll/RedeemAll';
import RedeemUnderlyingAsset from './RedeemUnderlyingAsset/RedeemUnderlyingAsset';
import RedeemWrappedToken from './RedeemWrappedToken/RedeemWrappedToken';

function Redeem({ account, setStateStale, stateStale, updateData }) {
	return (
		<div>
			<RedeemAll
				account={account}
				setStateStale={setStateStale}
				stateStale={stateStale}
				updateData={updateData}
			/>
			<RedeemUnderlyingAsset
				account={account}
				setStateStale={setStateStale}
				stateStale={stateStale}
				updateData={updateData}
			/>
			<RedeemWrappedToken
				account={account}
				setStateStale={setStateStale}
				stateStale={stateStale}
				updateData={updateData}
			/>
		</div>
	);
}

export default Redeem;
