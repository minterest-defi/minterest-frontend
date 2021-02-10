import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table, Grid } from 'semantic-ui-react';
import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';
import BalancePool from './BalancePool/BalancePool';
import BalanceBorrowPool from './BalanceBorrowPool/BalanceBorrowPool';
import Rate from './Rates/Rate';
import { BLOCKS_PER_YEAR } from '../../util/constants';
import { formatBalance } from '@polkadot/util';

function ContentPool(props) {
	const { api } = props;

	const initRates = UNDERLYING_ASSETS_TYPES.reduce((old, item) => {
		old[item] = {};
		return old;
	}, {});

	const initCurrencyBalance = UNDERLYING_ASSETS_TYPES.reduce((old, item) => {
		old[item] = '0.0';
		return old;
	}, {});

	const [rates, setRates] = useState(initRates);
	const [currencyBalance, setCurrencyBalance] = useState(initCurrencyBalance);

	// TODO redux actions, refactoring
	useEffect(() => {
		const fetchData = async () => {
			const newRatesData = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((asset) => {
					return fetchRates(asset);
				})
			);

			const newCurrencyBalanceData = await Promise.all(
				UNDERLYING_ASSETS_TYPES.map((asset) => {
					return fetchBalancePool(asset);
				})
			);

			let newRates = {};
			let newCurrencyBalance = {};

			UNDERLYING_ASSETS_TYPES.forEach((assert, index) => {
				newRates[assert] = newRatesData[index];
				newCurrencyBalance[assert] = newCurrencyBalanceData[index];
			});

			setRates(newRates);
			setCurrencyBalance(newCurrencyBalance);
		};
		fetchData();
	}, []);

	const fetchRates = async (asset) => {
		const dataRates = await api.rpc.controller.liquidityPoolState(asset);
		const conversionRate = (rate) => {
			return rate.toHuman().split(',').join('') / 10 ** 18;
		};
		const borrow = conversionRate(dataRates.borrow_rate) * BLOCKS_PER_YEAR;
		const supply = conversionRate(dataRates.supply_rate) * BLOCKS_PER_YEAR;
		const exchange = conversionRate(dataRates.exchange_rate);
		return {
			borrowRate: `${(borrow * 100).toFixed(2)} %`,
			supplyRate: `${(supply * 100).toFixed(2)} %`,
			exchangeRate: exchange,
		};
	};

	const fetchBalancePool = async (asset) => {
		const poolKey = api.consts.liquidityPools.poolAccountId.toHuman();

		if (poolKey) {
			const palletName = 'tokens';
			const transactionName = 'accounts';
			const dataName = 'free';
			const transactionParams = [poolKey, asset];

			const decimals = api.registry.chainDecimals;
			const data = await api.query[palletName][transactionName](
				...transactionParams
			);
			const balanceData = formatBalance(
				data[dataName],
				{ withSi: false, forceUnit: '-' },
				0
			)
				.split('.', 1)
				.join('')
				.split(',')
				.join('');
			let balance;
			if (balanceData.length > decimals) {
				balance = `${
					balanceData.slice(0, balanceData.length - decimals) || '0'
				}.${balanceData.slice(balanceData.length - decimals)}`;
			} else if (balanceData.length < decimals) {
				balance = balanceData / 10 ** decimals;
			} else {
				balance = balanceData;
			}
			return balance;
		} else if (currencyBalance[asset] !== '0.0') {
			return '0.0';
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
									<BalancePool currencyBalance={currencyBalance[asset]} />
								</Table.Cell>
								<Table.Cell key={index + 3}>
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
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</Grid.Column>
		</div>
	);
}

const mapStateToProps = (state) => ({
	api: state.substrate.api,
});

export default connect(mapStateToProps, null)(ContentPool);
