import React from 'react';

import { Input, Dropdown, Button } from 'semantic-ui-react';

function Balance (props) {
  const currencies = ['MINT', 'DOT', 'KSM', 'BTC', 'ETH', 'MDOT', 'MKSM', 'MBTC', 'METH'];
  const assets = currencies.map(currency => ({ key: currency, text: currency, value: currency }));

  return (
    <div>
      <Input placeholder='Enter the amount' />
      <Dropdown placeholder='Asset' search selection options={assets} />
      <Button color='green'>Deposit</Button>
    </div>
  );
}

export default Balance;
