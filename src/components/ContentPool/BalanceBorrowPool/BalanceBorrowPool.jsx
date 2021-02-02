import { formatBalance } from '@polkadot/util';
import React, { useState } from 'react';
import { useSubstrate } from '../../../substrate-lib';

function BalanceBorrowPool({ asset }) {
	const { api } = useSubstrate();
	const currency = asset;
	const [borrowBalances, setBorrowBalances] = useState('0');

	const fetchData = async () => {
		const decimals = api.registry.chainDecimals;
		const data = await api.query.liquidityPools.pools(currency);
		const balanceData = formatBalance(
			data.total_borrowed,
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
		setBorrowBalances(balance);
	};
	fetchData();

	return <div>{borrowBalances}</div>;
}

export default BalanceBorrowPool;
