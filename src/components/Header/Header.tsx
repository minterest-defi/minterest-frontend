import React from 'react';
// @ts-ignore
import classes from './Header.module.css';
import { Label } from 'semantic-ui-react';
import AccountSelector from './AccountSelector/AccountSelector';
import Loading from '../../util/Loading';
import Logo from './Logo/Logo';

// TODO refactoring any
interface Props {
	account: string;
	onChange: () => void;
	isCheckingAdmin: boolean;
	balanceAnnotation: any;
}

function Header(props: Props) {
	const { account, onChange, isCheckingAdmin, balanceAnnotation } = props;
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
