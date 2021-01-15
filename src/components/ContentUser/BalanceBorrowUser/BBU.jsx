import React, { useState } from 'react';
import { useSubstrate } from '../../../substrate-lib';

function BBU({ account, asset }) {
	const { api } = useSubstrate();
	const currency = asset;

	const [borrowBalances, setBorrowBalances] = useState('0');

	const fetchData = async () => {
		if (account) {
			const data = await api.query.liquidityPools.poolUserDates(
				account,
				currency
			);
			const bb = data.toHuman().total_borrowed;
			setBorrowBalances(bb);
		} else if (borrowBalances !== '0') {
			setBorrowBalances('0');
		}
	};
	fetchData();

	return <div>{borrowBalances}</div>;
}

export default BBU;
