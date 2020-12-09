import React from "react";

import classes from "./PoolBalance.module.css";

const PoolBalance = () => {
    return (
        <div className={classes.div}>
            <h3>Pool Balance</h3>
            <table className="table table-hover table-dark">
                <thead>
                    <tr>
                        <th scope="col">Asset</th>
                        <th scope="col">APY</th>
                        <th scope="col">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>DOT</td>
                        <td>100%</td>
                        <td>0 UNIT</td>
                    </tr>
                    <tr>
                        <td>KSM</td>
                        <td>100%</td>
                        <td>0 UNIT</td>
                    </tr>
                    <tr>
                        <td>BTC</td>
                        <td>100%</td>
                        <td>0 UNIT</td>
                    </tr>
                    <tr>
                        <td>ETH</td>
                        <td>100%</td>
                        <td>0 UNIT</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default PoolBalance;