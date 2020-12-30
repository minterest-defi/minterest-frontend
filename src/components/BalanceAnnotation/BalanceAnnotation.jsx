import React, { useState, useEffect } from 'react';
import { useSubstrate } from '../../substrate-lib';
import { Grid, Statistic } from 'semantic-ui-react';

function BalanceAnnotation({ account }) {
	const { api } = useSubstrate();

	const [accountBalance, setAccountBalance] = useState(0);

	useEffect(() => {
		let unsubscribe;

		account &&
			api.query.system
				.account(account, (balance) => {
					setAccountBalance(balance.data.free.toHuman());
				})
				.then((unsub) => {
					unsubscribe = unsub;
				})
				.catch(console.error);

		return () => unsubscribe && unsubscribe();
	}, [api, account]);

	return (
		<Grid>
			<Statistic>
				<Statistic.Value>{accountBalance}</Statistic.Value>
			</Statistic>
		</Grid>
	);
}

export default BalanceAnnotation;
