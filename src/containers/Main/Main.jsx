import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { formatBalance } from '@polkadot/util';
import classes from './Main.module.css';

import ContentUser from '../../components/ContentUser/ContentUser';
import UserActions from '../../components/UserActions/UserActions';
import ContentPool from '../../components/ContentPool/ContentPool';
import { BLOCKS_PER_YEAR, UNDERLYING_ASSETS_TYPES } from '../../util/constants';

function Main(props) {
	const { api, currentAccount } = props;

	const [accountAddress, setAccountAddress] = useState(null);

	const [stateStale, setStateStale] = useState(null);

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
		fetchData();
	}, []);
	// TODO refactoring
	const updateData = () => {
		fetchData();
	};

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

	return (
		<div className={classes.wrapper}>
			<div className={classes.content_user}>
				<ContentUser account={currentAccount} />
			</div>
			<div className={classes.content_pool}>
				<ContentPool rates={rates} currencyBalance={currencyBalance} />
			</div>
			<div className={classes.button}>
				<h2>Actions</h2>
				<UserActions
					account={currentAccount}
					setStateStale={setStateStale}
					stateStale={stateStale}
					updateData={updateData}
				/>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	api: state.substrate.api,
	currentAccount: state.account.currentAccount,
});

export default connect(mapStateToProps, null)(Main);
