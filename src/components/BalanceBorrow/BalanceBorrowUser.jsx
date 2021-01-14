import React, { useState } from 'react';
import { useSubstrate } from '../../substrate-lib';
import { Table, Grid } from 'semantic-ui-react';
import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';

function BalanceBorrowUser({ account }) {
	const { api } = useSubstrate();
	const [borrowBalances, setBorrowBalances] = useState([]);

	const borrowBalancesTemp = [];

	const fetchData = async () => {
		if (account) {
			for (const currency of UNDERLYING_ASSETS_TYPES) {
				const dataBorrowBalanceUser = await api.query.liquidityPools.poolUserDates(
					account,
					currency
				);
				borrowBalancesTemp.push({
					currency: currency,
					balance: dataBorrowBalanceUser.toHuman().total_borrowed,
				});
			}
			setBorrowBalances(borrowBalancesTemp);
		} else if (borrowBalances.some((bb) => bb.balance !== '0')) {
			setBorrowBalances([]);
		}
	};
	fetchData();

	return (
		<Grid.Column>
			<h1>Borrow Balance User</h1>
			<Table celled striped size='small'>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell key='headerAsset'>Asset</Table.HeaderCell>
						<Table.HeaderCell key='headerBorrow'>
							Borrow Balance User
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

export default BalanceBorrowUser;
