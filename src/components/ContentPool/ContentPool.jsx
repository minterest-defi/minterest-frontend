import React from 'react';
import Rates from './Rates/Rates';
import BalancePool from './BalancePool/BalancePool';

function ContentPool() {
	return (
		<div>
			<BalancePool />
			<Rates />
		</div>
	);
}

export default ContentPool;
