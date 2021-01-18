import React, { useState } from 'react';
import { useSubstrate } from '../../../substrate-lib';

function BP({ asset }) {
	const { api } = useSubstrate();
	const currency = asset;

	const [poolBalance, setPoolBalance] = useState('0');

	const poolKey = api.consts.liquidityPools.poolAccountId.toHuman();

	const fetchData = async () => {
		const data = await api.query.tokens.accounts(poolKey, currency);
		const balance = data.free.toHuman();
		setPoolBalance(balance);
	};
	fetchData();

	return <div>{poolBalance}</div>;
}

export default BP;
