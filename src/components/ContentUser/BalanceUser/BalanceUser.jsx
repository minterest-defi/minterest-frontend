import React from 'react';
import FetchBalance from '../../../util/FetchBalance';

function BalanceUser({ account, asset }) {
	return (
		<FetchBalance
			account={account}
			currency={asset}
			palletName='tokens'
			transactionName='accounts'
		/>
	);
}

export default BalanceUser;
