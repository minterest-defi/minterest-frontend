import React from 'react-router-dom';
import { useMemo } from 'react';
import './UserAssetsTable.scss';
import { formatData, toLocale } from '../../../util';

interface RenderAssetRowProps {
	currency: string;
	userBorrowPerAsset: any;
	userUnderlyingBalancePerAsset: any;
	usersBalance: any;
	onClick: (asset: string) => void;
}
interface UserAssetsTableProps {
	currencies: string[];
	userBorrowPerAsset: any;
	userUnderlyingBalancePerAsset: any;
	usersBalance: any;
	onClick: (asset: string) => void;
}

function RenderAssetRow(props: RenderAssetRowProps) {
	const {
		userBorrowPerAsset,
		userUnderlyingBalancePerAsset,
		usersBalance,
		onClick,
		currency,
	} = props;

	const handleClick = (asset: string) => {
		return () => {
			onClick(asset);
		};
	};

	const userSupplyBalancePerAsset = useMemo(
		() =>
			toLocale(
				parseFloat(
					formatData(
						userUnderlyingBalancePerAsset[currency].value.amount
					).toString()
				)
			),
		[userUnderlyingBalancePerAsset[currency]]
	);

	return (
		<div className={'assetRow'} key={currency} onClick={handleClick(currency)}>
			<div className={'text main'}>{currency}</div>
			<div className={'text active'}>
				{toLocale(
					parseFloat(formatData(usersBalance[currency]['free']).toString())
				)}
			</div>
			<div className={'text active'}>
				{userUnderlyingBalancePerAsset[currency] && userSupplyBalancePerAsset}
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
}

export default function UserAssetsTable(props: UserAssetsTableProps) {
	const {
		currencies,
		userBorrowPerAsset,
		userUnderlyingBalancePerAsset,
		usersBalance,
		onClick,
	} = props;

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
			{currencies.map((currency, index) => {
				return (
					<RenderAssetRow
						key={index}
						currency={currency}
						userBorrowPerAsset={userBorrowPerAsset}
						userUnderlyingBalancePerAsset={userUnderlyingBalancePerAsset}
						usersBalance={usersBalance}
						onClick={onClick}
					/>
				);
			})}
		</div>
	);
}
