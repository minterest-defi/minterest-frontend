import React, { useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
  Menu,
  Button,
  Dropdown,
  Container
} from 'semantic-ui-react';

import { useSubstrate } from '../../substrate-lib';

function AccountSelector (props) {
  const { api, keyring } = useSubstrate();
  const { account, onChange } = props;

  const keyringOptions = keyring.getPairs().map(acc => ({
    key: acc.address,
    value: acc.address,
    text: acc.meta.name.toUpperCase(),
    icon: 'user'
  }));

  const initialAddress =
    keyringOptions.length > 0 ? keyringOptions[0].value : '';

  useEffect(() => {
    onChange(initialAddress);
  }, [onChange, initialAddress]);

  const handleChange = address => {
    onChange(address);
  };

  return (keyring.getPairs && api.query && (
    <Menu
      attached='top'
      tabular
      style={{
        backgroundColor: '#fff',
        borderColor: '#fff',
        paddingTop: '1em',
        paddingBottom: '1em'
      }}
    >
      <Container>
        <Menu.Menu position='right' style={{ alignItems: 'center' }}>
          <CopyToClipboard text={account}>
            <Button
              basic
              circular
              size='large'
              icon='user'
              color={account ? 'green' : 'red'}
            />
          </CopyToClipboard>
          <Dropdown
            search
            selection
            clearable
            placeholder='Select an account'
            options={keyringOptions}
            onChange={(_, dropdown) => {
              handleChange(dropdown.value);
            }}
            value={account}
          />
        </Menu.Menu>
      </Container>
    </Menu>)
  );
}

export default AccountSelector;
