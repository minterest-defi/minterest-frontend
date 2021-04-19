import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { AssetProps, AssetParams } from './Asset.types';
import './Asset.scss';
import { State } from '../../util/types';
import {
	disableIsCollateral,
	enableIsCollateral,
	depositUnderlying,
	redeemUnderlying,
	repay,
	borrow,
} from '../../actions/dashboardUpdates';
import {
	DepositUnderlyingFormValues,
	RedeemFormValues,
	RepayFormValues,
	SendBorrowFormValues,
} from '../../components/UserActions/UserActions.types';
import {
	resetDashboardData,
	getUserBalance,
	getPoolUserParams,
	getRatesData,
	getHypotheticalLiquidityData,
} from '../../actions/dashboardData';
import { formatData } from '../../util';
import LoaderWrap from '../../components/Common/LoaderWrap/LoaderWrap';

function Asset(props: AssetProps) {
	const {
		disableIsCollateral,
		enableIsCollateral,
		depositUnderlying,
		redeemUnderlying,
		repay,
		borrow,

		ratesData,
		currencies,
		wrappedCurrencies,
		currentAccount,

		getRatesData,
		resetDashboardData,

		//user
		poolUserParams,
		hypotheticalLiquidityData,
		usersBalance,
		getUserBalance,
		getPoolUserParams,
		getHypotheticalLiquidityData,
	} = props;

	let { assetId } = useParams<AssetParams>();

	useEffect(() => {
		getRatesData();
		if (currentAccount) {
			getUserBalance(currentAccount);
			getPoolUserParams(currentAccount);
			getHypotheticalLiquidityData(currentAccount);
		}
		return () => {
			resetDashboardData();
		};
	}, []);

	useEffect(() => {
		if (currentAccount) {
			getUserBalance(currentAccount);
			getPoolUserParams(currentAccount);
			getHypotheticalLiquidityData(currentAccount);
		}
	}, [currentAccount]);

	const isCollateralEnabled = false;

	const asCollateralActionText = isCollateralEnabled ? 'No' : 'Yes';

	const handleCollateralClick = () => {};
	const handleDepositClick = (form: DepositUnderlyingFormValues) => {};
	const handleWithdrawClick = (form: RedeemFormValues) => {};
	const handleRepayClick = (form: RepayFormValues) => {};
	const handleBorrowClick = (form: SendBorrowFormValues) => {};

	if (!currencies.includes(assetId)) return <div>No such currency</div>;

	const wrappedCurrencyId = wrappedCurrencies[currencies.indexOf(assetId)];

	if (!currentAccount) return <div>Choose User</div>;

	if (
		!usersBalance ||
		!poolUserParams ||
		!ratesData ||
		!hypotheticalLiquidityData
	)
		return <LoaderWrap text='Loading' />;

	const exchangeRate = ratesData[assetId]['exchange_rate'];
	console.log(exchangeRate, hypotheticalLiquidityData);

	return (
		<div className='asset-page'>
			<div className='main-title'>Asset: {assetId}</div>
			<div className='header-actions'>
				<div className='question'>Use as Collateral?</div>
				<Button onClick={handleCollateralClick}>
					{asCollateralActionText}
				</Button>
			</div>
			<div className='info-block'>
				<div className='title'>Your information</div>
				<div className='content-block'>
					<div className='block-header'>
						<div className='type'>Supply</div>
						<div className='actions'>
							<Button className='action'>Supply</Button>
							<Button className='action'>Withdraw</Button>
						</div>
					</div>
					<div className='block-body'>
						<div className='text-row'>
							<div className='label'>Wallet Balance</div>
							<div className='value'>
								<span className='bold'>
									{formatData(usersBalance[assetId]['free'])}
								</span>{' '}
								{assetId}
							</div>
						</div>
						<div className='text-row'>
							<div className='label'>Supplied</div>
							<div className='value'>
								<span className='bold'>
									{formatData(usersBalance[wrappedCurrencyId]['free'])}
								</span>{' '}
								{wrappedCurrencyId}
							</div>
						</div>
					</div>
				</div>
				<div className='divider' />
				<div className='content-block'>
					<div className='block-header'>
						<div className='type'>Borrows</div>
						<div className='actions'>
							<Button className='action'>Repay</Button>
							<Button className='action'>Borrow</Button>
						</div>
					</div>
					<div className='block-body'>
						<div className='text-row'>
							<div className='label'>Borrowed</div>
							<div className='value'>
								<span className='bold'>
									{formatData(poolUserParams[assetId]['total_borrowed'])}
								</span>{' '}
								{assetId}
							</div>
						</div>
						<div className='text-row'>
							<div className='label'>Available to Borrow</div>
							<div className='value'>
								<span className='bold'>50.00</span> DOT
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state: State) => ({
	currentAccount: state.account.currentAccount,
	currencies: state.protocolData.currencies,
	wrappedCurrencies: state.protocolData.wrappedCurrencies,
	usersBalance: state.dashboardData.usersBalance,
	poolUserParams: state.dashboardData.poolUserParams,
	ratesData: state.dashboardData.ratesData,
	hypotheticalLiquidityData: state.dashboardData.hypotheticalLiquidityData,
});

const mapDispatchToProps = {
	disableIsCollateral,
	enableIsCollateral,
	depositUnderlying,
	redeemUnderlying,
	repay,
	borrow,
	resetDashboardData,
	getUserBalance,
	getPoolUserParams,
	getRatesData,
	getHypotheticalLiquidityData,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Asset);
