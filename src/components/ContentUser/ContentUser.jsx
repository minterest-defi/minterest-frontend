import React from 'react';
import { formatBalance } from '@polkadot/util';
import { Table, Grid } from 'semantic-ui-react';

import {
	UNDERLYING_ASSETS_TYPES,
	WRAP_TOKEN_TYPES,
} from '../../util/constants';

// import Collateral from './Collateral/Collateral';

function ContentUser(props) {
	const { usersBalance, usersBorrowBalance } = props;

	const decimals = 18;

	const formatData = (data) => {
		const updatedData = formatBalance(
			data,
			{ withSi: false, forceUnit: '-' },
			0
		)
			.split('.', 1)
			.join('')
			.split(',')
			.join('');
		if (updatedData.length > decimals) {
			return `${
				updatedData.slice(0, updatedData.length - decimals) || '0'
			}.${updatedData.slice(updatedData.length - decimals)}`;
		} else if (updatedData.length < decimals) {
			return updatedData / 10 ** decimals;
		} else {
			return updatedData;
		}
	};

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
									<Table.Cell>Hello!</Table.Cell>
									<Table.Cell>{wrapAsset}</Table.Cell>
									<Table.Cell>
										{usersBalance &&
											formatData(usersBalance[wrapAsset]['free'])}
									</Table.Cell>
									{/* 
								<Table.Cell key={index + 4}>
									<Collateral account={account} asset={asset} />
								</Table.Cell>
								<Table.Cell key={index + 5}>
									{WRAP_TOKEN_TYPES[index]}
								</Table.Cell>
								 */}
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
