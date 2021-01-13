import React, { useState } from 'react';
import { useSubstrate } from '../../substrate-lib';
import { Table, Grid } from 'semantic-ui-react';
import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';

function BalanceBorrowUser({ account }) {
	const { api } = useSubstrate();
	const [rates, setRates] = useState([]);

	const ratesTemp = [];

	const fetchData = async () => {
		if (account) {
			for (const currency of UNDERLYING_ASSETS_TYPES) {
				const dataExchangeRate = await api.query.liquidityPools.poolUserDates(
					account,
					currency
				);
				ratesTemp.push({
					currency: currency,
					exchange: dataExchangeRate.toHuman().total_borrowed,
				});
			}
			setRates(ratesTemp);
		} else if (rates.some((cb) => cb.balance !== '0')) {
			setRates([]);
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
					{rates.map((rate, index) => (
						<Table.Row key={rate.currency}>
							<Table.Cell key={`currency-${rate.currency}`}>
								{rate.currency}
							</Table.Cell>
							<Table.Cell key={index}>{rate.exchange}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</Grid.Column>
	);
}

export default BalanceBorrowUser;
