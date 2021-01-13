import React, { useState } from 'react';
import { useSubstrate } from '../../substrate-lib';
import { Table, Grid } from 'semantic-ui-react';
import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';

function Rates() {
	const { api } = useSubstrate();
	const [rates, setRates] = useState([]);

	const ratesTemp = [];

	const fetchData = async () => {
		for (const currency of UNDERLYING_ASSETS_TYPES) {
			const dataBorrowAndSupplyRates = await api.query.controller.controllerDates(
				currency
			);
			const dataExchangeRate = await api.query.liquidityPools.pools(currency);
			const conversionRate = (rate) => {
				return rate.toHuman().split(',').join('') / 10 ** 18;
			};
			ratesTemp.push({
				currency: currency,
				borrow: conversionRate(dataBorrowAndSupplyRates.borrow_rate) * 5256000,
				supply: conversionRate(dataBorrowAndSupplyRates.borrow_rate) * 5256000,
				exchange: conversionRate(dataExchangeRate.current_exchange_rate),
			});
		}
		setRates(ratesTemp);
	};
	fetchData();

	return (
		<Grid.Column>
			<h1>Rates</h1>
			<Table celled striped size='small'>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell key='headerAsset'>Asset</Table.HeaderCell>
						<Table.HeaderCell key='headerBorrow'>Borrow</Table.HeaderCell>
						<Table.HeaderCell key='headerSupply'>Supply</Table.HeaderCell>
						<Table.HeaderCell key='headerExchange'>Exchange</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{rates.map((rate, index) => (
						<Table.Row key={rate.currency}>
							<Table.Cell key={`currency-${rate.currency}`}>
								{rate.currency}
							</Table.Cell>
							<Table.Cell key={index}>{rate.borrow}</Table.Cell>
							<Table.Cell key={index + 100}>{rate.supply}</Table.Cell>
							<Table.Cell key={index + 1000}>{rate.exchange}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</Grid.Column>
	);
}

export default Rates;
