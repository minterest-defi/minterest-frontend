import React from 'react';
import { Table, Grid } from 'semantic-ui-react';
import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';

import BalancePool from './BalancePool/BalancePool';
import BalanceBorrowPool from './BalanceBorrowPool/BalanceBorrowPool';
import FetchRate from './Rates/FetchRate';

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
							<Table.Row key={index + 1}>
								<Table.Cell key={index}>{asset}</Table.Cell>
								<Table.Cell key={index + 2}>
									<BalancePool asset={asset} />
								</Table.Cell>
								<Table.Cell key={index + 3}>
									<BalanceBorrowPool asset={asset} />
								</Table.Cell>
								<Table.Cell key={index + 4}>
									<FetchRate asset={asset} nameRate='borrowRate' />
								</Table.Cell>
								<Table.Cell key={index + 5}>
									<FetchRate asset={asset} nameRate='supplyRate' />
								</Table.Cell>
								<Table.Cell key={index + 6}>
									<FetchRate asset={asset} nameRate='exchangeRate' />
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
