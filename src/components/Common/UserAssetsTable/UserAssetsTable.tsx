import React from 'react-router-dom';
import './UserAssetsTable.scss';
import { formatData, toLocale } from '../../../util';

interface UserAssetsTableProps {
	currencies: string[];
	wrappedCurrencies: string[];
	poolUserParams: any;
	usersBalance: any;
	onClick: (asset: string) => void;
}

export default function UserAssetsTable(props: UserAssetsTableProps) {
	const {
		currencies,
		wrappedCurrencies,
		poolUserParams,
		usersBalance,
		onClick,
	} = props;

	const handleClick = (asset: string) => {
		return () => {
			onClick(asset);
		};
	};

	const renderAssetRow = (currency: string, index: number) => {
		const wrapped = wrappedCurrencies[index];

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
						parseFloat(formatData(usersBalance[wrapped]['free']).toString())
					)}
				</div>
				<div className={'text active'}>
					{toLocale(
						parseFloat(
							formatData(poolUserParams[currency]['total_borrowed']).toString()
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
