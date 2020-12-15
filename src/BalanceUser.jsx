import React, { useState, useEffect } from 'react';
import { useSubstrate } from './substrate-lib';
import { Table, Grid } from 'semantic-ui-react';

function BalanceUser (props) {
  const { api, keyring } = useSubstrate();
  const accounts = keyring.getPairs();
  console.log(accounts);

  useEffect(() => {
    const addresses = accounts.map(account => account.address);
    console.log(addresses);
  });

  const balances = [
    { currency: 'DOT', balance: 100 },
    { currency: 'KSM', balance: 100 },
    { currency: 'BTC', balance: 100 },
    { currency: 'ETH', balance: 100 },
    { currency: 'MDOT', balance: 100 },
    { currency: 'MKSM', balance: 100 },
    { currency: 'MBTC', balance: 100 },
    { currency: 'METH', balance: 100 }
  ];

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
          {balances.map((balance) =>
            <Table.Row key={balances.currency}>
              <Table.Cell key={`currency-${balances.currency}`}>{balance.currency}</Table.Cell>
              <Table.Cell key={`balance-${balances.currency}`}>{balance.balance}</Table.Cell>
            </Table.Row>)}
        </Table.Body>
      </Table>
    </Grid.Column>
  );
}

export default BalanceUser;
