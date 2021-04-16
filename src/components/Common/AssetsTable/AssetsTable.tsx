import React from 'react-router-dom';
import { formatData, convertRateToPercentPerYear } from '../../../util';
import './AssetsTable.scss';

interface AssetsTableProps {
	currencies: string[];
	poolsBalance: any;
	poolsBorrowBalance: any;
	ratesData: any;
	onClick: (asset: string) => void;
}

export default function AssetsTable(props: AssetsTableProps) {
	const {
		currencies,
		poolsBalance,
		poolsBorrowBalance,
		ratesData,
		onClick,
	} = props;

	const handleClick = (asset: string) => {
		return () => {
			onClick(asset);
		};
	};

	const renderAssetRow = (currency: string) => {
		return (
			<div
				className={'assetRow'}
				key={currency}
				onClick={handleClick(currency)}
			>
				<div className={'text main'}>{currency}</div>
				<div className={'text active'}>
					{parseFloat(
						formatData(poolsBalance[currency]['free']).toString()
					).toFixed(2)}
				</div>
				<div className={'text active'}>
					{parseFloat(
						formatData(
							poolsBorrowBalance[currency]['total_borrowed']
						).toString()
					).toFixed(2)}
				</div>
				<div className={'text active'}>
					{convertRateToPercentPerYear(ratesData[currency]['supply_rate'], 2)}
					<span className={'percent'}>%</span>
				</div>
				<div className={'text active'}>
					{convertRateToPercentPerYear(ratesData[currency]['borrow_rate'], 2)}
					<span className={'percent'}>%</span>
				</div>
			</div>
		);
	};

	return (
		<div className={'assetsTableWrapper'}>
			<div className={'headerRow'}>
				<div className={'text main'}>
					<div>Assets</div>
				</div>
				<div className={'text'}>Total Supplied</div>
				<div className={'text'}>Total Borrowed</div>
				<div className={'text'}>Supply APY</div>
				<div className={'text'}>Borrow APY</div>
			</div>
			{currencies.map(renderAssetRow)}
		</div>
	);
}
