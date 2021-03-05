import React from 'react';
import { Table, Grid } from 'semantic-ui-react';

import { UNDERLYING_ASSETS_TYPES, BLOCKS_PER_YEAR } from '../../util/constants';
import { formatData } from '../../util/index';

function ContentPool(props) {
	const { poolsBalance, poolsBorrowBalance, ratesData } = props;

	const formatRates = (rate) => {
		if (!rate) return 'ERROR';
		return rate.toHuman().split(',').join('') / 10 ** 18;
	};

	const transformRate = (rate) => {
		if (!rate) return 'ERROR';
		return `${(formatRates(rate) * BLOCKS_PER_YEAR * 100).toFixed(2)} %`;
	};

	// TODO BalanceBorrowPool
	return (
		<div>
			<Grid.Column>
				<h2>Pool</h2>
				<Table celled striped size='small'>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell key='headerAsset'>Asset</Table.HeaderCell>
							<Table.HeaderCell key='headerBalance'>Balance</Table.HeaderCell>
							<Table.HeaderCell key='headerBorrow'>
								Borrow Balance
							</Table.HeaderCell>
							<Table.HeaderCell key='headerBorrowRates'>
								Borrow Rates
							</Table.HeaderCell>
							<Table.HeaderCell key='headerSupplyRates'>
								Supply Rates
							</Table.HeaderCell>
							<Table.HeaderCell key='headerExchangeRates'>
								Exchange Rates
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{UNDERLYING_ASSETS_TYPES.map((asset, index) => (
							<Table.Row key={index + 1}>
								<Table.Cell>{asset}</Table.Cell>
								<Table.Cell>
									{poolsBalance && formatData(poolsBalance[asset]['free'])}
								</Table.Cell>
								<Table.Cell>
									{poolsBorrowBalance &&
										formatData(poolsBorrowBalance[asset]['total_borrowed'])}
								</Table.Cell>
								<Table.Cell>
									{ratesData && transformRate(ratesData[asset]['borrow_rate'])}
								</Table.Cell>
								<Table.Cell>
									{ratesData && transformRate(ratesData[asset]['supply_rate'])}
								</Table.Cell>
								<Table.Cell>
									{ratesData && formatRates(ratesData[asset]['exchange_rate'])}
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</Grid.Column>
		</div>
	);
}

export default ContentPool;
