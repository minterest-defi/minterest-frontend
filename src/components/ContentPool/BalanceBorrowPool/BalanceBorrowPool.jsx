import React, { useState } from 'react';
import { useSubstrate } from '../../../substrate-lib';
import { Table, Grid } from 'semantic-ui-react';
import { UNDERLYING_ASSETS_TYPES } from '../../../util/constants';

function BalanceBorrowPool() {
	const { api } = useSubstrate();
	const [borrowBalances, setBorrowBalances] = useState([]);

	const borrowBalancesTemp = [];

	const fetchData = async () => {
		for (const currency of UNDERLYING_ASSETS_TYPES) {
			const data = await api.query.liquidityPools.pools(currency);
			borrowBalancesTemp.push({
				currency: currency,
				balance: data.toHuman().total_borrowed,
			});
		}
		setBorrowBalances(borrowBalancesTemp);
	};
	fetchData();

	return (
		<Grid.Column>
			<h1>Borrow Balance Pool</h1>
			<Table celled striped size='small'>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell key='headerAsset'>Asset</Table.HeaderCell>
						<Table.HeaderCell key='headerBalance'>
							Borrow Balance Pool
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{borrowBalances.map((balance, index) => (
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

export default BalanceBorrowPool;
