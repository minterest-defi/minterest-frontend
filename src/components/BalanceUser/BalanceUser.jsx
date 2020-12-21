import React, { useState, useEffect } from 'react';
import { useSubstrate } from '../../substrate-lib';
import { Table, Grid } from 'semantic-ui-react';

function BalanceUser ({ account }) {
  const { api } = useSubstrate();
  const [currencyBalance, setCurrencyBalance] = useState({});
  const currencies = ['MINT', 'DOT', 'KSM', 'BTC', 'ETH', 'MDOT', 'MKSM', 'MBTC', 'METH'];

  useEffect(() => {
    let unsubscribeAll = null;
    const currencyBalanceTemp = {};
    const fetchData = async () => {
      for (const currency of currencies) {
        const data = await api.query.tokens.accounts(account, currency);
        !currencyBalanceTemp[account] && (currencyBalanceTemp[account] = []);
        currencyBalanceTemp[account].push({
          currency: currency,
          balance: account ? data.free.toHuman() : '0'
        });
      }
      setCurrencyBalance(currencyBalanceTemp);
      return () => unsubscribeAll();
    };
    fetchData()
      .then(unsub => {
        unsubscribeAll = unsub;
      })
      .catch(console.error);
  }, [api.query.tokens, currencies, account]);

  return (
    <Grid.Column>
      <h1>Balance User</h1>
      <Table celled striped size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell key="headerAsset">Asset</Table.HeaderCell>
            <Table.HeaderCell key="headerBalance">Balance</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {(currencyBalance[account] || []).map((balance) =>
            <Table.Row key={balance.currency}>
              <Table.Cell key={`currency-${balance.currency}`}>{balance.currency}</Table.Cell>
              <Table.Cell key={`balance-${balance.balance}`}>{balance.balance}</Table.Cell>
            </Table.Row>)}
        </Table.Body>
      </Table>
    </Grid.Column>
  );
}

export default BalanceUser;
