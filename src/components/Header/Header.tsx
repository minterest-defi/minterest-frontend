import React from 'react';
// @ts-ignore
import classes from './Header.module.scss';
import AccountSelector from './AccountSelector/AccountSelector';
import BalanceTooltip from './BalanceTooltip/BalanceTooltip';
import Loading from '../../util/Loading';
import Logo from './Logo/Logo';
import { formatData } from '../../util';

interface Props {
	api: any;
	keyring: any;
	account: string | null;
	onChange: (account: any) => void;
	isCheckingAdmin: boolean;
	balanceAnnotation: any;
	userBalanceUSD: any;
}

function Header(props: Props) {
	const {
		account,
		onChange,
		isCheckingAdmin,
		//balanceAnnotation,
		userBalanceUSD,
		api,
		keyring,
	} = props;

	const getValue = (balance: string) => {
		return Number(formatData(balance));
	};

	return (
		<div className={classes.header}>
			<div className={classes.logo}>
				<Logo />
			</div>
			{userBalanceUSD && (
				<div className={classes.user_balance}>
					<BalanceTooltip
						title={'Supplied balance:'}
						balance={getValue(userBalanceUSD?.total_supply)}
					/>
					<BalanceTooltip
						title={'Borrow balance:'}
						balance={getValue(userBalanceUSD?.total_borrowed)}
					/>
				</div>
			)}
			{/* {balanceAnnotation && (
				<div className={classes.balance_annotation}>
					<Label>{balanceAnnotation}</Label>
				</div>
			)} */}
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
