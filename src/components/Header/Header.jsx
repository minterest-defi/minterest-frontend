import React from 'react';
import AccountSelector from './AccountSelector/AccountSelector';
import BalanceAnnotation from './BalanceAnnotation/BalanceAnnotation';
import Logo from './Logo/Logo';

function Header({ account, onChange }) {
	return (
		<div>
			<Logo />
			<AccountSelector account={account} onChange={onChange} />
			<BalanceAnnotation account={account} />
		</div>
	);
}

export default Header;
