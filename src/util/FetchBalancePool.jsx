import React, { useState } from 'react';
import { formatBalance } from '@polkadot/util';
import { useSubstrate } from '../substrate-lib';

function FetchBalancePool({
	transactionParams,
	palletName,
	transactionName,
	dataName,
}) {
	const { api } = useSubstrate();
	const [currencyBalance, setCurrencyBalance] = useState('0.0');

	const fetchData = async () => {
		const decimals = api.registry.chainDecimals;
		const data = await api.query[palletName][transactionName](
			...transactionParams
		);
		const balanceData = formatBalance(
			data[dataName],
			{ withSi: false, forceUnit: '-' },
			0
		)
			.split('.', 1)
			.join('')
			.split(',')
			.join('');
		let balance;
		if (balanceData.length > decimals) {
			balance = `${
				balanceData.slice(0, balanceData.length - decimals) || '0'
			}.${balanceData.slice(balanceData.length - decimals)}`;
		} else if (balanceData.length < decimals) {
			balance = balanceData / 10 ** decimals;
		} else {
			balance = balanceData;
		}
		setCurrencyBalance(balance);
	};
	fetchData();

	return <div>{currencyBalance}</div>;
}

export default FetchBalancePool;
