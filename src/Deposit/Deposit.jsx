import React from "react";

const Deposit = () => {
    return (
        <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button type="button" class="btn btn-primary">Primary</button>
            <div className="btn-group" role="group">
                <button id="btnGroupDrop1"
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"></button>
                <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                <a className="dropdown-item" href="#">Dropdown link</a>
                <a className="dropdown-item" href="#">Dropdown link</a>
                </div>
            </div>
        </div>
    )
};

export default Deposit;