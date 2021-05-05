import React from 'react';
import './Header.scss';
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
		<div className='header'>
			<div className='logo'>
				<Logo />
			</div>
			{userBalanceUSD && (
				<div className='fields'>
					<div className='field'>
						<BalanceTooltip
							title={'Supply Balance:'}
							balance={getValue(userBalanceUSD?.total_supply)}
						/>
					</div>
					<div className='field field-borrow'>
						<BalanceTooltip
							title={'Borrow Balance:'}
							balance={getValue(userBalanceUSD?.total_borrowed)}
						/>
					</div>
				</div>
			)}
			{/* {balanceAnnotation && (
				<div className={classes.balance_annotation}>
					<Label>{balanceAnnotation}</Label>
				</div>
			)} */}
			<div className='account_selector'>
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
