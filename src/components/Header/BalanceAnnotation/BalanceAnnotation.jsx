import React, { useState } from 'react';
import { useSubstrate } from '../../../substrate-lib';
import { Grid, Statistic } from 'semantic-ui-react';

function BalanceAnnotation({ account }) {
	const { api } = useSubstrate();

	const [accountBalance, setAccountBalance] = useState(0);

	const fetchData = async () => {
		if (account) {
			const data = await api.query.system.account(account);
			const balance = data.data.free.toHuman();
			setAccountBalance(balance);
		} else if (accountBalance !== 0) {
			setAccountBalance(0);
		}
	};
	fetchData();

	return (
		<Grid>
			<Statistic size='mini'>
				<Statistic.Value>{accountBalance}</Statistic.Value>
			</Statistic>
		</Grid>
	);
}

export default BalanceAnnotation;
