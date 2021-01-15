import React from 'react';
import Deposit from './Deposit/Deposit';

function Buttons({ account }) {
	return (
		<div>
			<Deposit account={account} />
		</div>
	);
}

export default Buttons;
