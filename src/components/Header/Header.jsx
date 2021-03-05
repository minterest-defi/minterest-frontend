import React from 'react';
import { Label } from 'semantic-ui-react';

import classes from './Header.module.css';

import AccountSelector from './AccountSelector/AccountSelector';
import Loading from '../../util/Loading';
import Logo from './Logo/Logo';

function Header({ account, onChange, isCheckingAdmin, balanceAnnotation }) {
	return (
		<div className={classes.header}>
			<div className={classes.logo}>
				<Logo />
			</div>
			<div className={classes.balance_annotation}>
				<Label>{balanceAnnotation}</Label>
			</div>
			<div className={classes.account_selector}>
				<AccountSelector account={account} onChange={onChange} />
				{isCheckingAdmin && <Loading />}
			</div>
		</div>
	);
}

export default Header;
