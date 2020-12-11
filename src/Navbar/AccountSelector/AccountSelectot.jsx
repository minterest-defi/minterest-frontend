import React, { useState, useEffect } from "react";
import { useSubstrate } from "../../substrate-lib";

import { Menu, Dropdown, Container } from "semantic-ui-react";

const AccountSelector = (props) => {

    const { keyring } = useSubstrate();
    const { setAccountAddress } = props;
    const [accountSelected, setAccountSelected] = useState('');
  
    const keyringOptions = keyring.getPairs().map(account => ({
      key: account.address,
      value: account.address,
      text: account.meta.name.toUpperCase()
    }));
  
    const initialAddress =
      keyringOptions.length > 0 ? keyringOptions[0].value : '';
  
    useEffect(() => {
      setAccountAddress(initialAddress);
      setAccountSelected(initialAddress);
    }, [setAccountAddress, initialAddress]);
  
    const onChange = address => {
      setAccountAddress(address);
      setAccountSelected(address);
    };
  
    return (
      <Menu attached='top' tabular>
        <Container>
          <Menu.Menu position='right'>
            <Dropdown
              search
              selection
              clearable
              placeholder='Select an account'
              options={keyringOptions}
              onChange={(_, dropdown) => {
                onChange(dropdown.value);
              }}
              value={accountSelected}
            />
          </Menu.Menu>
        </Container>
      </Menu>
    );
};

export default AccountSelector;