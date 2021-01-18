import React from 'react';
import { Table, Grid } from 'semantic-ui-react';
import { SUPPORT_CURRENCIES } from '../../util/constants';

import BU from './BalanceUser/BU';
import BBU from './BalanceBorrowUser/BBU';
import Col from './Collateral/Col';

function ContentUser({ account }) {
	return (
		<div>
			<Grid.Column>
				<h2>User</h2>
				<Table celled striped size='small'>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell key='headerAsset'>Asset</Table.HeaderCell>
							<Table.HeaderCell key='headerBalance'>Balance</Table.HeaderCell>
							<Table.HeaderCell key='headerBorrow'>
								Borrow Balance
							</Table.HeaderCell>
							<Table.HeaderCell key='headerCollateral'>
								Collateral
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{SUPPORT_CURRENCIES.map((asset, index) => (
							<Table.Row key={index + 123}>
								<Table.Cell key={index}>{asset}</Table.Cell>
								<Table.Cell key={index + 100}>
									<BU key={account + index} account={account} asset={asset} />
								</Table.Cell>
								<Table.Cell key={index + 1000}>
									<BBU key={account + index} account={account} asset={asset} />
								</Table.Cell>
								<Table.Cell key={index + 10000}>
									<Col key={account + index} account={account} asset={asset} />
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</Grid.Column>
		</div>
	);
}

export default ContentUser;
