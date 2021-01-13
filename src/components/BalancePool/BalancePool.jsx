import React, { useState } from 'react';
import { useSubstrate } from '../../substrate-lib';
import { Table, Grid } from 'semantic-ui-react';
import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';

function BalancePool() {
	const { api } = useSubstrate();
	const [poolBalance, setPoolBalance] = useState([]);

	const poolKey = api.consts.liquidityPools.poolAccountId.toHuman();
	const poolBalanceTemp = [];

	const fetchData = async () => {
		for (const currency of UNDERLYING_ASSETS_TYPES) {
			const data = await api.query.tokens.accounts(poolKey, currency);
			poolBalanceTemp.push({
				currency: currency,
				balance: data.free.toHuman(),
			});
		}
		setPoolBalance(poolBalanceTemp);
	};
	fetchData();

	return (
		<Grid.Column>
			<h1>Balance Pool</h1>
			<Table celled striped size='small'>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell key='headerAsset'>Asset</Table.HeaderCell>
						<Table.HeaderCell key='headerBalance'>Balance</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{poolBalance.map((balance, index) => (
						<Table.Row key={balance.currency}>
							<Table.Cell key={`currency-${balance.currency}`}>
								{balance.currency}
							</Table.Cell>
							<Table.Cell key={index}>{balance.balance}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</Grid.Column>
	);
}

export default BalancePool;
