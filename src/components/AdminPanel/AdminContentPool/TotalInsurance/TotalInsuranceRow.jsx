import React from 'react';
import FetchBalancePool from '../../../../util/FetchBalancePool';

function TotalInsuranceRow({ asset }) {
	return (
		<FetchBalancePool
			transactionParams={[asset]}
			palletName='liquidityPools'
			transactionName='pools'
			dataName='total_insurance'
		/>
	);
}

export default TotalInsuranceRow;
