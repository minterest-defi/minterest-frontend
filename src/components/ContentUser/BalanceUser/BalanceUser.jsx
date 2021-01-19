import React, { useState } from 'react';
import { useSubstrate } from '../../../substrate-lib';

function BalanceUser({ account, asset }) {
	const { api } = useSubstrate();
	const currency = asset;

	const [currencyBalance, setCurrencyBalance] = useState('0');

	const fetchData = async () => {
		if (account) {
			const data = await api.query.tokens.accounts(account, currency);
			const balance = data.free.toHuman();
			setCurrencyBalance(balance);
		} else if (currencyBalance !== '0') {
			setCurrencyBalance('0');
		}
	};
	fetchData();

	return <div>{currencyBalance}</div>;
}

export default BalanceUser;
