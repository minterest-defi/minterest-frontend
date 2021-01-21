import React from 'react';
import RedeemAll from './RedeemAll/RedeemAll';
import RedeemUnderlyingAsset from './RedeemUnderlyingAsset/RedeemUnderlyingAsset';
import RedeemWrappedToken from './RedeemWrappedToken/RedeemWrappedToken';

function Redeem({ account, setStateStale, stateStale }) {
	return (
		<div>
			<RedeemAll
				account={account}
				setStateStale={setStateStale}
				stateStale={stateStale}
			/>
			<RedeemUnderlyingAsset
				account={account}
				setStateStale={setStateStale}
				stateStale={stateStale}
			/>
			<RedeemWrappedToken
				account={account}
				setStateStale={setStateStale}
				stateStale={stateStale}
			/>
		</div>
	);
}

export default Redeem;
