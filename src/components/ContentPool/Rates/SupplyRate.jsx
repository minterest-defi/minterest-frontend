import React, { useState } from 'react';
import { useSubstrate } from '../../../substrate-lib';
import { BLOCKS_PER_YEAR } from '../../../util/constants';

function SupplyRate({ asset }) {
	const { api } = useSubstrate();
	const [rates, setRates] = useState('0');

	const currency = asset;

	const fetchData = async () => {
		const dataSupplyRates = await api.rpc.controller.liquidityPoolState(
			currency
		);
		const conversionRate = (rate) => {
			return rate.toHuman().split(',').join('') / 10 ** 18;
		};
		const supply =
			conversionRate(dataSupplyRates.supply_rate) * BLOCKS_PER_YEAR;
		setRates(supply);
	};
	fetchData();

	return <div>{rates}</div>;
}

export default SupplyRate;
