import React from 'react';
import FetchBalance from '../../../util/FetchBalance';

function BalanceUser({ account, asset }) {
	return (
		<FetchBalance
			account={account}
			transactionParams={[account, asset]}
			palletName='tokens'
			transactionName='accounts'
			dataName='free'
		/>
	);
}

export default BalanceUser;
