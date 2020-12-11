import React, { useState } from "react";
import { useSubstrate } from "../substrate-lib";

import AccountSelector from "./AccountSelector/AccountSelectot";

const Navbar = () => {
    const [accountAddress, setAccountAddress] = useState(null);
    const { api, keyring } = useSubstrate();
    
    return (
      keyring.getPairs && api.query
      ? <AccountSelector setAccountAddress={setAccountAddress} />
      : null
    );
}

export default Navbar;
