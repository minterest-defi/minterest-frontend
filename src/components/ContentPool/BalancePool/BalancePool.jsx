import React from 'react';
import { useSubstrate } from '../../../substrate-lib';
import FetchBalance from '../../../util/FetchBalance';

function BalancePool({ asset }) {
	const { api } = useSubstrate();
	const poolKey = api.consts.liquidityPools.poolAccountId.toHuman();

	return (
		<FetchBalance
			account={poolKey}
			transactionParams={[poolKey, asset]}
			palletName='tokens'
			transactionName='accounts'
			dataName='free'
		/>
	);
}

export default BalancePool;
