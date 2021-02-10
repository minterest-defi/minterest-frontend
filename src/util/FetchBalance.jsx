import React, { useState } from 'react';
import { connect } from 'react-redux';
import { formatBalance } from '@polkadot/util';

function FetchBalance({
	account,
	transactionParams,
	palletName,
	transactionName,
	dataName,
	api,
}) {
	const [currencyBalance, setCurrencyBalance] = useState('0.0');

	const fetchData = async () => {
		if (account) {
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
			setCurrencyBalance(balance);
		} else if (currencyBalance !== '0.0') {
			setCurrencyBalance('0.0');
		}
	};
	fetchData();

	return <div>{currencyBalance}</div>;
}

const mapStateToProps = (state) => ({
	api: state.substrate.api,
});

export default connect(mapStateToProps, null)(FetchBalance);
