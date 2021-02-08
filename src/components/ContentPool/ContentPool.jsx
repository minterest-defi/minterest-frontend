import React, { useEffect, useState } from 'react';
import { Table, Grid } from 'semantic-ui-react';
import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';
import BalancePool from './BalancePool/BalancePool';
import BalanceBorrowPool from './BalanceBorrowPool/BalanceBorrowPool';
import FetchRate from './Rates/FetchRate';
import { useSubstrate } from '../../substrate-lib';
import { BLOCKS_PER_YEAR } from '../../util/constants';

function ContentPool() {
	const { api } = useSubstrate();

	const initRates = UNDERLYING_ASSETS_TYPES.reduce((old, item) => {
		old[item] = {};
		return old;
	}, {});

	const [rates, setRates] = useState(initRates);

	useEffect(() => {
		UNDERLYING_ASSETS_TYPES.forEach((asset) => {
			fetchData(asset).catch(console.log);
		});
	}, []);

	const fetchData = async (currency) => {
		const dataRates = await api.rpc.controller.liquidityPoolState(currency);
		const conversionRate = (rate) => {
			return rate.toHuman().split(',').join('') / 10 ** 18;
		};
		const borrow = conversionRate(dataRates.borrow_rate) * BLOCKS_PER_YEAR;
		const supply = conversionRate(dataRates.supply_rate) * BLOCKS_PER_YEAR;
		const exchange = conversionRate(dataRates.exchange_rate);
		const newRates = {
			...rates,
			[currency]: {
				borrowRate: `${(borrow * 100).toFixed(2)} %`,
				supplyRate: `${(supply * 100).toFixed(2)} %`,
				exchangeRate: exchange,
			},
		};
		setRates(newRates);
	};

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
									<FetchRate rate={rates[asset]['borrowRate']} />
								</Table.Cell>
								<Table.Cell key={index + 5}>
									<FetchRate rate={rates[asset]['supplyRate']} />
								</Table.Cell>
								<Table.Cell key={index + 6}>
									<FetchRate rate={rates[asset]['exchangeRate']} />
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
