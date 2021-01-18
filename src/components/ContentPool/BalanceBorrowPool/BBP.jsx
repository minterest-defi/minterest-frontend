import React, { useState } from 'react';
import { useSubstrate } from '../../../substrate-lib';

function BBP({ asset }) {
	const { api } = useSubstrate();
	const currency = asset;
	const [borrowBalances, setBorrowBalances] = useState('0');

	const fetchData = async () => {
		const data = await api.query.liquidityPools.pools(currency);
		const balance = data.toHuman().total_borrowed;
		setBorrowBalances(balance);
	};
	fetchData();

	return <div>{borrowBalances}</div>;
}

export default BBP;
