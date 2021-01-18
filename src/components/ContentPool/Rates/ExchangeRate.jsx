import React, { useState } from 'react';
import { useSubstrate } from '../../../substrate-lib';

function ExchangeRate({ asset }) {
	const { api } = useSubstrate();
	const [rates, setRates] = useState([]);

	const currency = asset;

	const fetchData = async () => {
		const dataExchangeRate = await api.query.liquidityPools.pools(currency);
		const conversionRate = (rate) => {
			return rate.toHuman().split(',').join('') / 10 ** 18;
		};
		const exchange = conversionRate(dataExchangeRate.current_exchange_rate);
		setRates(exchange);
	};
	fetchData();

	return <div>{rates}</div>;
}

export default ExchangeRate;
