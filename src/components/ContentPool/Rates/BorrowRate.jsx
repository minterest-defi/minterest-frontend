import React, { useState } from 'react';
import { useSubstrate } from '../../../substrate-lib';
import { BLOCKS_PER_YEAR } from '../../../util/constants';

function BorrowRate({ asset }) {
	const { api } = useSubstrate();
	const [rates, setRates] = useState('0');

	const currency = asset;

	const fetchData = async () => {
		const dataBorrowRates = await api.query.controller.controllerDates(
			currency
		);
		const conversionRate = (rate) => {
			return rate.toHuman().split(',').join('') / 10 ** 18;
		};
		const borrow =
			conversionRate(dataBorrowRates.borrow_rate) * BLOCKS_PER_YEAR;
		setRates(borrow);
	};
	fetchData();

	return <div>{rates}</div>;
}

export default BorrowRate;
