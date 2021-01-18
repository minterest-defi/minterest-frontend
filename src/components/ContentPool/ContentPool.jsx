import React from 'react';
import { Table, Grid } from 'semantic-ui-react';
import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';

import Rates from './Rates/Rates';
import BP from './BalancePool/BP';
import BBP from './BalanceBorrowPool/BBP';

function ContentPool() {
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
							<Table.Row key={index + 123}>
								<Table.Cell key={index}>{asset}</Table.Cell>
								<Table.Cell key={index + 10}>
									<BP asset={asset} />
								</Table.Cell>
								<Table.Cell key={index + 100}>
									<BBP asset={asset} />
								</Table.Cell>
								<Table.Cell key={index + 1000}>Hi!</Table.Cell>
								<Table.Cell key={index + 10000}>Hi!</Table.Cell>
								<Table.Cell key={index + 100000}>Hi!</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</Grid.Column>

			<Rates />
		</div>
	);
}

export default ContentPool;
