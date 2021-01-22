import React, { useState } from 'react';
import { useSubstrate } from '../../../../substrate-lib';

function TotalInsurance({ asset }) {
	const { api } = useSubstrate();
	const [totalInsurance, setTotalInsurance] = useState('0');

	const currency = asset;

	const fetchData = async () => {
		const data = await api.query.liquidityPools.pools(currency);
		const balance = data.toHuman().total_insurance;
		setTotalInsurance(balance);
	};
	fetchData();

	return <div>{totalInsurance}</div>;
}

export default TotalInsurance;
