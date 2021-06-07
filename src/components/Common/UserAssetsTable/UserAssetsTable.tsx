import React from 'react-router-dom';
import './UserAssetsTable.scss';
import { formatData, toLocale } from '../../../util';

interface UserAssetsTableProps {
	currencies: string[];
	userBorrowPerAsset: any;
	userUnderlyingBalancePerAsset: any;
	usersBalance: any;
	onClick: (asset: string) => void;
}

export default function UserAssetsTable(props: UserAssetsTableProps) {
	const {
		currencies,
		userBorrowPerAsset,
		userUnderlyingBalancePerAsset,
		usersBalance,
		onClick,
	} = props;

	const handleClick = (asset: string) => {
		return () => {
			onClick(asset);
		};
	};

	const renderAssetRow = (currency: string, index: number) => {
		return (
			<div
				className={'assetRow'}
				key={currency}
				onClick={handleClick(currency)}
			>
				<div className={'text main'}>{currency}</div>
				<div className={'text active'}>
					{toLocale(
						parseFloat(formatData(usersBalance[currency]['free']).toString())
					)}
				</div>
				<div className={'text active'}>
					{toLocale(
						parseFloat(
							formatData(
								userUnderlyingBalancePerAsset[currency].value.amount
							).toString()
						)
					)}
				</div>
				<div className={'text active'}>
					{toLocale(
						parseFloat(
							formatData(userBorrowPerAsset[currency].value.amount).toString()
						)
					)}
				</div>
			</div>
		);
	};

	return (
		<div className={'userAssetsTableWrapper'}>
			<div className={'headerRow'}>
				<div className={'text main'}>
					<div>Assets</div>
				</div>
				<div className={'text'}>Wallet Balance</div>
				<div className={'text'}>Supplied</div>
				<div className={'text'}>Borrowed</div>
			</div>
			{currencies.map(renderAssetRow)}
		</div>
	);
}
