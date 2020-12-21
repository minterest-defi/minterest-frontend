import React from 'react';
import { useSubstrate } from '../../substrate-lib';

import { Input, Dropdown, Button } from 'semantic-ui-react';

function Balance (props) {
  const { account } = props;
  const { api } = useSubstrate();

  const currencies = ['MINT', 'DOT', 'KSM', 'BTC', 'ETH', 'MDOT', 'MKSM', 'MBTC', 'METH'];
  const assets = currencies.map(currency => ({ key: currency, text: currency, value: currency }));

  const asset = 'MINT';
  const amount = 0;

  console.log(api.tx.minterestProtocol.depositUnderlying(asset, amount));

  return (
    <div>
      <Input placeholder='Enter the amount' />
      <Dropdown placeholder='Asset' search selection options={assets} />
      <Button color={account ? 'green' : 'red'}>Deposit</Button>
    </div>
  );
}

export default Balance;
