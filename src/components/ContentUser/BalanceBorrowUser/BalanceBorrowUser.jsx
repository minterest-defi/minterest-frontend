import React from 'react';
import FetchBalance from '../../../util/FetchBalance';

function BalanceBorrowUser({ account, asset }) {
	return (
		<FetchBalance
			account={account}
			transactionParams={[asset, account]}
			palletName='liquidityPools'
			transactionName='poolUserDates'
			dataName='total_borrowed'
		/>
	);
}

export default BalanceBorrowUser;
