import React from 'react';

import classes from './Header.module.css';

import AccountSelector from './AccountSelector/AccountSelector';
import BalanceAnnotation from './BalanceAnnotation/BalanceAnnotation';
import Logo from './Logo/Logo';
import Menu from './Menu/Menu';

function Header({ account, onChange }) {
	return (
		<div className={classes.header}>
			<div className={classes.logo}>
				<Logo />
			</div>
			<div className={classes.menu}>
				<Menu />
			</div>
			<div className={classes.balance_annotation}>
				<BalanceAnnotation account={account} />
			</div>
			<div className={classes.account_selector}>
				<AccountSelector account={account} onChange={onChange} />
			</div>
		</div>
	);
}

export default Header;
