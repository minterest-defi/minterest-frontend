import React from 'react';

import classes from './Header.module.css';

import AccountSelector from './AccountSelector/AccountSelector';
import BalanceAnnotation from './BalanceAnnotation/BalanceAnnotation';
import Loading from '../../util/Loading';
import Logo from './Logo/Logo';
import Menu from './Menu/Menu';

function Header({ account, onChange, isCheckingAdmin }) {
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
				{isCheckingAdmin && <Loading />}
			</div>
		</div>
	);
}

export default Header;
