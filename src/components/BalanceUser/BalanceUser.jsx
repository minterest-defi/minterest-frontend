import React, { useState, useEffect } from 'react';
import { useSubstrate } from '../../substrate-lib';
import { Table, Grid } from 'semantic-ui-react';

function BalanceUser (props) {
  const { account } = props;
  const { api } = useSubstrate();
  const [currencyBalance, setCurrencyBalance] = useState({});
  const currencies = ['MINT', 'DOT', 'KSM', 'BTC', 'ETH', 'MDOT', 'MKSM', 'MBTC', 'METH'];

  useEffect(() => {
    let unsubscribeAll = null;
    const address = account;
    const currencyBalanceTemp = {};
    const fetchData = async () => {
      for (const currency of currencies) {
        const data = await api.query.tokens.accounts(address, currency);
        !currencyBalanceTemp[address] && (currencyBalanceTemp[address] = []);
        currencyBalanceTemp[address].push({
          currency: currency,
          balance: data.free.toHuman()
        });
      }
      setCurrencyBalance(currencyBalanceTemp);
      return () => unsubscribeAll();
    };
    account && fetchData()
      .then(unsub => {
        unsubscribeAll = unsub;
      })
      .catch(console.error);
  }, [account]);

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
