import React from "react";

import classes from "./UserBalance.module.css"

const UserBalance = () => {
    return (
        <div className={classes.div}>
            <h3>User Balance</h3>
            <table className="table table-hover table-dark">
                <thead>
                    <tr>
                        <th scope="col">Asset</th>
                        <th scope="col">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>DOT</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>KSM</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>BTC</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>ETH</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>MDOT</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>MKSM</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>MBTC</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>METH</td>
                        <td>0</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default UserBalance;
