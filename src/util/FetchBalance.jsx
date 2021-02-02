import React, { useState } from 'react';
import { formatBalance } from '@polkadot/util';
import { useSubstrate } from '../substrate-lib';

function FetchBalance({ account, currency, palletName, transactionName }) {
	const { api } = useSubstrate();
	const [currencyBalance, setCurrencyBalance] = useState('0.0');

	const fetchData = async () => {
		if (account) {
			const decimals = api.registry.chainDecimals;
			const data = await api.query[palletName][transactionName](
				account,
				currency
			);
			const balanceData = formatBalance(
				data.free,
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
			setCurrencyBalance(balance);
		} else if (currencyBalance !== '0.0') {
			setCurrencyBalance('0.0');
		}
	};
	fetchData();

	return <div>{currencyBalance}</div>;
}

export default FetchBalance;
