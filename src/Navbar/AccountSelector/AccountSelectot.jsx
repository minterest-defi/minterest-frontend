import React from "react";

const AccountSelector = () => {

    return (
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#/1" role="button"
                aria-haspopup="true"
                aria-expanded="true">
                    Select Account
            </a>
            <div className="dropdown-menu">
                <a className="dropdown-item" href="#/1">1</a>
                <a className="dropdown-item" href="#/2">2</a>
                <a className="dropdown-item" href="#/3">3</a>
            </div>
      </li>
    )
};

export default AccountSelector;