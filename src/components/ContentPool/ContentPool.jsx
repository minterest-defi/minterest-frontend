import React from 'react';
import Rates from './Rates/Rates';
import BalancePool from './BalancePool/BalancePool';
import BalanceBorrowPool from './BalanceBorrowPool/BalanceBorrowPool';

function ContentPool() {
	return (
		<div>
			<BalancePool />
			<Rates />
			<BalanceBorrowPool />
		</div>
	);
}

export default ContentPool;
