import React, { useState } from 'react';
import { useSubstrate } from '../../../substrate-lib';
import { BLOCKS_PER_YEAR } from '../../../util/constants';

function FatchRate({ asset, nameRate }) {
	const { api } = useSubstrate();
	const [rates, setRates] = useState({});

	const currency = asset;

	const fetchData = async () => {
		const dataRates = await api.rpc.controller.liquidityPoolState(currency);
		const conversionRate = (rate) => {
			return rate.toHuman().split(',').join('') / 10 ** 18;
		};
		const borrow = conversionRate(dataRates.borrow_rate) * BLOCKS_PER_YEAR;
		const supply = conversionRate(dataRates.supply_rate) * BLOCKS_PER_YEAR;
		const exchange = conversionRate(dataRates.exchange_rate);
		setRates({
			borrowRate: `${(borrow * 100).toFixed(2)} %`,
			supplyRate: `${(supply * 100).toFixed(2)} %`,
			exchangeRate: `${(exchange * 100).toFixed(2)} %`,
		});
	};
	fetchData();

	return <div>{rates[nameRate]}</div>;
}

export default FatchRate;
