import React from 'react';
import { Table, Grid } from 'semantic-ui-react';
import {
	formatData,
	convertRateToPercentPerYear,
	convertRateToFraction,
} from '../../util';

interface Props {
	poolsBalance: any;
	poolsBorrowBalance: any;
	ratesData: any;
	currencies: string[];
}

function ProtocolData(props: Props) {
	const { poolsBalance, poolsBorrowBalance, ratesData, currencies } = props;

	const renderRow = () => {
		return currencies.map((asset, index) => {
			return (
				<Table.Row key={index}>
					<Table.Cell>{asset}</Table.Cell>
					<Table.Cell>
						{poolsBalance && formatData(poolsBalance[asset]['free'])}
					</Table.Cell>
					<Table.Cell>
						{poolsBorrowBalance &&
							formatData(poolsBorrowBalance[asset]['total_borrowed'])}
					</Table.Cell>
					<Table.Cell>
						{ratesData &&
							convertRateToFraction(ratesData[asset]['exchange_rate'], 4)}
					</Table.Cell>
					<Table.Cell>
						{ratesData &&
							convertRateToPercentPerYear(
								ratesData[asset]['supply_rate'],
								2
							)}{' '}
						%
					</Table.Cell>
					<Table.Cell>
						{ratesData &&
							convertRateToPercentPerYear(
								ratesData[asset]['borrow_rate'],
								2
							)}{' '}
						%
					</Table.Cell>
				</Table.Row>
			);
		});
	};

	return (
		<div>
			<Grid.Column>
				<h2>Protocol Data</h2>
				<Table celled striped size='small'>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell key='headerAsset'>Asset</Table.HeaderCell>
							<Table.HeaderCell key='Supplied'>Supplied</Table.HeaderCell>
							<Table.HeaderCell key='Borrowed'>Borrowed</Table.HeaderCell>
							<Table.HeaderCell key='ExchangeRate'>
								Exchange Rate
							</Table.HeaderCell>
							<Table.HeaderCell key='SupplyRate'>Supply Rate</Table.HeaderCell>
							<Table.HeaderCell key='BorrowRate'>Borrow Rate</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{renderRow()}</Table.Body>
				</Table>
			</Grid.Column>
		</div>
	);
}

export default ProtocolData;
