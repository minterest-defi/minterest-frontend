import React from "react";
import Navbar from "./Navbar/Navbar";
import UserBalance from "./UserBalance/UserBalance";
import PoolBalance from "./PoolBalance/PoolBalance";

import classes from "./App.module.css";
import Deposit from "./Deposit/Deposit";

//import { SubstrateContextProvider } from "./substrate-lib";

const App = () => {

    return (
        <div>
            <Navbar />
            <div className={classes.content}>
                <div className={classes.user}><UserBalance /></div>
                <div className={classes.pool}><PoolBalance /></div>
                <div className={classes.deposit}><Deposit /></div>
            </div>
        </div>
    )
};

export default App;