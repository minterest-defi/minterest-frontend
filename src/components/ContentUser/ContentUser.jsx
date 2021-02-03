import React from 'react';
import { Table, Grid } from 'semantic-ui-react';
import {
	UNDERLYING_ASSETS_TYPES,
	WRAP_TOKEN_TYPES,
} from '../../util/constants';

import BalanceUser from './BalanceUser/BalanceUser';
import BalanceBorrowUser from './BalanceBorrowUser/BalanceBorrowUser';
import Collateral from './Collateral/Collateral';
import BalanceWrappedUser from './BalanceWrappedUser/BalanceWrappedUser';

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
							<Table.HeaderCell key='headerWrappedAsset'>
								Wrapped Asset
							</Table.HeaderCell>
							<Table.HeaderCell key='headerBalanceWrappedAsset'>
								Balance Wrapped Asset
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{UNDERLYING_ASSETS_TYPES.map((asset, index) => (
							<Table.Row key={index + 1}>
								<Table.Cell key={index}>{asset}</Table.Cell>
								<Table.Cell key={index + 2}>
									<BalanceUser account={account} asset={asset} />
								</Table.Cell>
								<Table.Cell key={index + 3}>
									<BalanceBorrowUser account={account} asset={asset} />
								</Table.Cell>
								<Table.Cell key={index + 4}>
									<Collateral account={account} asset={asset} />
								</Table.Cell>
								<Table.Cell key={index + 5}>
									{WRAP_TOKEN_TYPES[index]}
								</Table.Cell>
								<Table.Cell key={index + 6}>
									<BalanceWrappedUser
										account={account}
										asset={WRAP_TOKEN_TYPES[index]}
									/>
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
