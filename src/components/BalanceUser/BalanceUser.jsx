import React, { useState, useEffect } from 'react';
import { useSubstrate } from '../../substrate-lib';
import { Table, Grid } from 'semantic-ui-react';
import { SUPPORT_CURRENCIES } from '../../util/constants';

function BalanceUser({ account }) {
	const { api } = useSubstrate();

	const setCurrentState = () => {
		return SUPPORT_CURRENCIES.map((currency) => {
			return { currency: currency, balance: '0' };
		});
	};

	const [currencyBalance, setCurrencyBalance] = useState(setCurrentState());

	useEffect(() => {
		let unsubscribeAll = null;
		const currencyBalanceTemp = [];

		const fetchData = async () => {
			for (const currency of SUPPORT_CURRENCIES) {
				const data = await api.query.tokens.accounts(account, currency);
				currencyBalanceTemp.push({
					currency: currency,
					balance: account ? data.free.toHuman() : '0',
				});
			}
			setCurrencyBalance(currencyBalanceTemp);
			return () => unsubscribeAll();
		};
		fetchData()
			.then((unsub) => {
				unsubscribeAll = unsub;
			})
			.catch(console.error);
	}, [api.query.tokens, account]);

	return (
		<Grid.Column>
			<h2>Balance User</h2>
			<Table celled striped size='small'>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell key='headerAsset'>Asset</Table.HeaderCell>
						<Table.HeaderCell key='headerBalance'>Balance</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{currencyBalance.map((balance) => (
						<Table.Row key={balance.currency}>
							<Table.Cell key={`currency-${balance.currency}`}>
								{balance.currency}
							</Table.Cell>
							<Table.Cell key={`balance-${balance.balance}`}>
								{balance.balance}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</Grid.Column>
	);
}

export default BalanceUser;
