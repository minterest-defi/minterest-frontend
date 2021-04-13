import React from 'react';
import { Label } from 'semantic-ui-react';
// @ts-ignore
import classes from './Header.module.scss';
import AccountSelector from './AccountSelector/AccountSelector';
import Loading from '../../util/Loading';
import Logo from './Logo/Logo';

interface Props {
	api: any;
	keyring: any;
	account: string | null;
	onChange: (account: any) => void;
	isCheckingAdmin: boolean;
	balanceAnnotation: any;
}

function Header(props: Props) {
	const {
		account,
		onChange,
		isCheckingAdmin,
		balanceAnnotation,
		api,
		keyring,
	} = props;
	return (
		<div className={classes.header}>
			<div className={classes.logo}>
				<Logo />
			</div>
			<div className={classes.balance_annotation}>
				<Label>{balanceAnnotation}</Label>
			</div>
			<div className={classes.account_selector}>
				<AccountSelector
					api={api}
					keyring={keyring}
					account={account}
					onChange={onChange}
				/>
				{isCheckingAdmin && <Loading />}
			</div>
		</div>
	);
}

export default Header;
