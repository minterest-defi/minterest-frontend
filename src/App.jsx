import React from "react";
import { useSubstrate } from "./substrate-lib";

import Navbar from "./Navbar/Navbar";
import UserBalance from "./UserBalance/UserBalance";
import PoolBalance from "./PoolBalance/PoolBalance";
import Deposit from "./Deposit/Deposit";

import { Dimmer, Loader, Grid, Message } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import classes from "./App.module.css";

const App = () => {
    const { apiState, keyringState, apiError } = useSubstrate();

    const loader = text =>
        <Dimmer active>
            <Loader size='small'>{text}</Loader>
        </Dimmer>;
      
    const message = err =>
        <Grid centered columns={2} padded>
            <Grid.Column>
                <Message negative compact floating
                    header='Error Connecting to Substrate'
                    content={`${err}`}
                />
            </Grid.Column>
        </Grid>;
      
    if (apiState === 'ERROR') return message(apiError);
    else if (apiState !== 'READY') return loader('Connecting to Substrate');
      
    if (keyringState !== 'READY') {
        return loader('Loading accounts (please review any extension\'s authorization)');
    }

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