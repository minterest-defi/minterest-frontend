import { formatBalance } from '@polkadot/util';
import React, { useState } from 'react';
import { useSubstrate } from '../../../../substrate-lib';

function TotalInsuranceRow({ asset }) {
	const { api } = useSubstrate();
	const [totalInsurance, setTotalInsurance] = useState('0');

	const currency = asset;

	const fetchData = async () => {
		const decimals = api.registry.chainDecimals;
		const data = await api.query.liquidityPools.pools(currency);
		const balanceData = formatBalance(
			data.total_insurance,
			{ withSi: false, forceUnit: '-' },
			0
		)
			.split('.', 1)
			.join('')
			.split(',')
			.join('');
		const balance = `${
			balanceData.slice(0, balanceData.length - decimals) || '0'
		}.${balanceData.slice(balanceData.length - decimals)}`;
		setTotalInsurance(balance);
	};
	fetchData();

	return <div>{totalInsurance}</div>;
}

export default TotalInsuranceRow;
