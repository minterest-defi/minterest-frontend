import React from 'react';
import FetchBalancePool from '../../../util/FetchBalancePool';

function BalanceBorrowPool({ asset }) {
	return (
		<FetchBalancePool
			transactionParams={[asset]}
			palletName='liquidityPools'
			transactionName='pools'
			dataName='total_borrowed'
		/>
	);
}

export default BalanceBorrowPool;
