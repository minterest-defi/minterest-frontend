import React from 'react';
import { formatBalance } from '@polkadot/util';
import { Table, Grid } from 'semantic-ui-react';

import { UNDERLYING_ASSETS_TYPES, BLOCKS_PER_YEAR } from '../../util/constants';

function ContentPool(props) {
	const { poolsBalance, poolsBorrowBalance, ratesData } = props;

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

	const formatRates = (rate) => {
		return rate ? rate.toHuman().split(',').join('') / 10 ** decimals : 'ERROR';
	};

	const transformRate = (rate) => {
		return rate
			? `${(formatRates(rate) * BLOCKS_PER_YEAR * 100).toFixed(2)} %`
			: 'ERROR';
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
