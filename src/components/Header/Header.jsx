import React from 'react';
import AccountSelector from '../AccountSelector/AccountSelector';
import BalanceAnnotation from '../BalanceAnnotation/BalanceAnnotation';

function Header({ account, onChange }) {
	return (
		<div>
			<AccountSelector account={account} onChange={onChange} />
			<BalanceAnnotation account={account} />
		</div>
	);
}

export default Header;
