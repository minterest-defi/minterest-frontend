import React from 'react';
import { formatBalance } from '@polkadot/util';
import { Table, Grid } from 'semantic-ui-react';

import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';

import Loading from '../../util/Loading';

function ContentPool(props) {
	const { poolsBalance } = props;

	if (!poolsBalance) return <Loading />;

	const formatData = (data) => {
		const decimals = 18;
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
								<Table.Cell key={index}>{asset}</Table.Cell>
								<Table.Cell key={index + 2}>
									{poolsBalance && formatData(poolsBalance[asset].free)}
								</Table.Cell>
								{/* <Table.Cell key={index + 3}>
									<BalanceBorrowPool asset={asset} />
								</Table.Cell>
								<Table.Cell key={index + 4}>
									<Rate rate={rates[asset]['borrowRate']} />
								</Table.Cell>
								<Table.Cell key={index + 5}>
									<Rate rate={rates[asset]['supplyRate']} />
								</Table.Cell>
								<Table.Cell key={index + 6}>
									<Rate rate={rates[asset]['exchangeRate']} />
								</Table.Cell> */}
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</Grid.Column>
		</div>
	);
}

export default ContentPool;
