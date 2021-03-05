import React from 'react';
import { Table, Grid } from 'semantic-ui-react';

import {
	UNDERLYING_ASSETS_TYPES,
	WRAP_TOKEN_TYPES,
} from '../../util/constants';
import { formatData } from '../../util/index';

import Collateral from './Collateral/Collateral';

function ContentUser(props) {
	const { account, usersBalance, usersBorrowBalance } = props;

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
							<Table.HeaderCell key='headerWrappedAsset'>
								Wrapped Asset
							</Table.HeaderCell>
							<Table.HeaderCell key='headerBalanceWrappedAsset'>
								Balance Wrapped Asset
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{UNDERLYING_ASSETS_TYPES.map((asset, index) => {
							const wrapAsset = WRAP_TOKEN_TYPES[index];
							return (
								<Table.Row key={index}>
									<Table.Cell>{asset}</Table.Cell>
									<Table.Cell>
										{usersBalance && formatData(usersBalance[asset]['free'])}
									</Table.Cell>
									<Table.Cell>
										{usersBorrowBalance &&
											formatData(usersBorrowBalance[asset]['total_borrowed'])}
									</Table.Cell>
									<Table.Cell>
										<Collateral account={account} asset={asset} />
									</Table.Cell>
									<Table.Cell>{wrapAsset}</Table.Cell>
									<Table.Cell>
										{usersBalance &&
											formatData(usersBalance[wrapAsset]['free'])}
									</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table>
			</Grid.Column>
		</div>
	);
}

export default ContentUser;
