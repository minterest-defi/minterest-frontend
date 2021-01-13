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
			ratesTemp.push({
				currency: currency,
				borrow: dataBorrowAndSupplyRates.borrow_rate.toHuman(),
				supply: dataBorrowAndSupplyRates.borrow_rate.toHuman(),
				exchange: dataExchangeRate.current_exchange_rate.toHuman(),
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
						<Table.HeaderCell key='headerBalance'>Borrow</Table.HeaderCell>
						<Table.HeaderCell key='headerBalance'>Supply</Table.HeaderCell>
						<Table.HeaderCell key='headerBalance'>Exchange</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{rates.map((rate) => (
						<Table.Row key={rate.currency}>
							<Table.Cell key={`currency-${rate.currency}`}>
								{rate.currency}
							</Table.Cell>
							<Table.Cell key={`balance-${rate.borrow}`}>
								{rate.borrow}
							</Table.Cell>
							<Table.Cell key={`balance-${rate.supply}`}>
								{rate.supply}
							</Table.Cell>
							<Table.Cell key={`balance-${rate.exchange}`}>
								{rate.exchange}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</Grid.Column>
	);
}

export default Rates;
