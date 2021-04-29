import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AssetProps, AssetParams } from './Asset.types';
import './Asset.scss';
import { State } from '../../util/types';
import {
	depositUnderlying,
	redeemUnderlying,
	repay,
	borrow,
} from '../../actions/dashboardUpdates';
import {
	resetDashboardData,
	getUserBalance,
	getPoolUserParams,
	getHypotheticalLiquidityData,
	getAccountCollateral,
} from '../../actions/dashboardData';
import { getLockedPrices } from '../../actions/protocolAdminData';
import { formatData, toLocale, useAPIResponse } from '../../util';
import LoaderWrap from '../../components/Common/LoaderWrap/LoaderWrap';
import IsCollateral from '../../components/UserActions/IsCollateral/IsCollateral';
import DepositOperations from '../../components/UserActions/DepositOperations/DepositOperations';
import RedeemUnderlying from '../../components/UserActions/RedeemUnderlying/RedeemUnderlying';
import Repay from '../../components/UserActions/Repay/Repay';
import BorrowOperations from '../../components/UserActions/BorrowOperations/BorrowOperations';

function Asset(props: AssetProps) {
	const {
		currencies,
		wrappedCurrencies,
		currentAccount,

		getLockedPrices,
		lockedPricesData,
		resetDashboardData,

		//user
		poolUserParams,
		hypotheticalLiquidityData,
		usersBalance,
		getUserBalance,
		getPoolUserParams,
		getHypotheticalLiquidityData,
		userBalanceUSD,

		getAccountCollateral,
		accountCollateral,
		//api
		isEnableAsCollateralResponseRunning,
		enableIsCollateralResponse,
		isDisableCollateralResponseRunning,
		disableIsCollateralResponse,
		isDepositUnderlyingResponseRunning,
		depositUnderlyingResponse,
		isRedeemResponseRunning,
		redeemResponse,
		isRepayResponseRunning,
		repayResponse,
		isBorrowResponseRunning,
		borrowResponse,
	} = props;

	let { assetId } = useParams<AssetParams>();

	const getUserData = () => {
		getLockedPrices();
		if (currentAccount) {
			getUserBalance(currentAccount);
			getPoolUserParams(currentAccount);
			getHypotheticalLiquidityData(currentAccount);
			getAccountCollateral(currentAccount);
		}
	};

	useEffect(() => {
		getUserData();
		return () => {
			resetDashboardData();
		};
	}, []);

	useEffect(() => {
		getUserData();
	}, [currentAccount]);

	useAPIResponse(
		[isEnableAsCollateralResponseRunning, enableIsCollateralResponse],
		getUserData
	);
	useAPIResponse(
		[isDisableCollateralResponseRunning, disableIsCollateralResponse],
		getUserData
	);

	useAPIResponse(
		[isDepositUnderlyingResponseRunning, depositUnderlyingResponse],
		getUserData
	);
	useAPIResponse([isRedeemResponseRunning, redeemResponse], getUserData);
	useAPIResponse([isRepayResponseRunning, repayResponse], getUserData);
	useAPIResponse([isBorrowResponseRunning, borrowResponse], getUserData);

	if (!currencies.includes(assetId)) return <div>No such currency</div>;

	const wrappedCurrencyId = wrappedCurrencies[currencies.indexOf(assetId)];

	if (!currentAccount) return <div>Choose User</div>;

	if (
		!usersBalance ||
		!poolUserParams ||
		!lockedPricesData ||
		!userBalanceUSD ||
		!hypotheticalLiquidityData ||
		!accountCollateral
	)
		return <LoaderWrap text='Loading' />;

	const isCollateralEnabled =
		poolUserParams[assetId]['is_collateral'].toString() === 'true';

	const balance = parseFloat(
		formatData(usersBalance[assetId]['free']).toString()
	).toFixed(2);

	const lockedPrice = parseFloat(
		(lockedPricesData[assetId].toString() / 10 ** 18).toString()
	);

	const availableToBorrow = hypotheticalLiquidityData.value.liquidity
		? parseFloat(
				(
					hypotheticalLiquidityData.value.liquidity.toString() /
					10 ** 18
				).toString()
		  ) / lockedPrice
		: 0;

	const borrowed = parseFloat(
		formatData(poolUserParams[assetId]['total_borrowed']).toString()
	);

	const supplied = parseFloat(
		formatData(usersBalance[wrappedCurrencyId]['free']).toString()
	);

	const totalSupplied = Number(
		formatData(userBalanceUSD?.total_supply)
	).toFixed(8);
	const totalBorrowed = Number(
		formatData(userBalanceUSD?.total_borrowed)
	).toFixed(8);

	const currentOversupply = accountCollateral.value.amount
		? (parseFloat(
				(accountCollateral.value.amount.toString() / 10 ** 18).toString()
		  ) /
				Number(totalBorrowed)) *
		  100
		: 0;

	const calculateLoanToValue = () => {
		if (!+totalBorrowed || !+totalSupplied)
			return <div className='value'>N/A</div>;

		return (
			<div className='value'>
				<span className='bold'>
					{((+totalSupplied / +totalBorrowed) * 100).toFixed(2)}
				</span>{' '}
				%
			</div>
		);
	};

	const depositInfo = [
		{
			label: 'Wallet Balance:',
			value: `${toLocale(+balance)} ${assetId}`,
		},
	];

	const withdrawInfo = [
		{
			label: 'Supply Balance:',
			value: `${toLocale(supplied)} ${assetId}`,
		},
	];

	const borrowInfo = [
		{
			label: 'Available to Borrow:',
			value: `${toLocale(availableToBorrow)} ${assetId}`,
		},
		{
			label: 'Current Oversupply:',
			value: `${
				currentOversupply && currentOversupply !== Infinity
					? toLocale(currentOversupply) + ' %'
					: 'N/A'
			}`,
		},
	];

	const repayInfo = [
		{
			label: 'Borrowed:',
			value: `${toLocale(borrowed)} ${assetId}`,
		},
	];

	const loanToValueData = {
		supplied: totalSupplied,
		borrowed: totalBorrowed,
		lockedPrice,
	};

	return (
		<div className='asset-page'>
			<div className='main-title'>Asset: {assetId}</div>
			<div className='header-actions'>
				<div className='question'>Use as Collateral:</div>
				<IsCollateral
					currencyId={assetId}
					isCollateralEnabled={isCollateralEnabled}
				/>
			</div>
			<div className='info-block'>
				<div className='content-block'>
					<div className='block-header'>
						<div className='type'>Supply</div>
					</div>
					<div className='block-body'>
						<div className='text-row'>
							<div className='label'>Wallet Balance</div>
							<div className='value'>
								<span className='bold'>{toLocale(+balance)}</span> {assetId}
							</div>
						</div>
						<div className='text-row'>
							<div className='label'>Supplied</div>
							<div className='value'>
								<span className='bold'>{toLocale(supplied)}</span> {assetId}
							</div>
						</div>
						<div className='actions'>
							<DepositOperations
								title='Supply'
								defaultAssetId={assetId}
								info={depositInfo}
								loanToValueData={loanToValueData}
								disableCurrencySelection={true}
							/>
							<RedeemUnderlying
								title='Withdraw'
								defaultAssetId={assetId}
								info={withdrawInfo}
								loanToValueData={loanToValueData}
								disableCurrencySelection={true}
							/>
						</div>
					</div>
				</div>
				<div className='divider' />
				<div className='content-block'>
					<div className='block-header'>
						<div className='type'>Borrows</div>
					</div>
					<div className='block-body'>
						<div className='text-row'>
							<div className='label'>Borrowed</div>
							<div className='value'>
								<span className='bold'>{toLocale(borrowed)}</span> {assetId}
							</div>
						</div>
						<div className='text-row'>
							<div className='label'>Available to Borrow</div>
							<div className='value'>
								<span className='bold'>{toLocale(availableToBorrow)}</span>{' '}
								{assetId}
							</div>
						</div>
						<div className='text-row'>
							<div className='label'>Loan to Value</div>
							{calculateLoanToValue()}
						</div>
						<div className='actions'>
							<Repay
								title='Repay'
								defaultAssetId={assetId}
								info={repayInfo}
								loanToValueData={loanToValueData}
								disableCurrencySelection={true}
							/>
							<BorrowOperations
								title='Borrow'
								defaultAssetId={assetId}
								info={borrowInfo}
								loanToValueData={loanToValueData}
								disableCurrencySelection={true}
								availableToBorrow={availableToBorrow}
							/>
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
	hypotheticalLiquidityData: state.dashboardData.hypotheticalLiquidityData,
	userBalanceUSD: state.dashboardData.userBalanceUSD,
	accountCollateral: state.dashboardData.accountCollateral,
	//admin
	lockedPricesData: state.protocolAdminData.lockedPricesData,
	//apicheck
	isEnableAsCollateralResponseRunning:
		state.dashboardUpdates.isEnableAsCollateralResponseRunning,
	enableIsCollateralResponse: state.dashboardUpdates.enableIsCollateralResponse,
	isDisableCollateralResponseRunning:
		state.dashboardUpdates.isDisableCollateralResponseRunning,
	disableIsCollateralResponse:
		state.dashboardUpdates.disableIsCollateralResponse,
	isDepositUnderlyingResponseRunning:
		state.dashboardUpdates.isDepositUnderlyingResponseRunning,
	depositUnderlyingResponse: state.dashboardUpdates.depositUnderlyingResponse,
	isRedeemResponseRunning: state.dashboardUpdates.isRedeemResponseRunning,
	redeemResponse: state.dashboardUpdates.redeemResponse,
	isRepayResponseRunning: state.dashboardUpdates.isRepayResponseRunning,
	repayResponse: state.dashboardUpdates.repayResponse,
	isBorrowResponseRunning: state.dashboardUpdates.isBorrowResponseRunning,
	borrowResponse: state.dashboardUpdates.borrowResponse,
});

const mapDispatchToProps = {
	depositUnderlying,
	redeemUnderlying,
	repay,
	borrow,
	resetDashboardData,
	getUserBalance,
	getPoolUserParams,
	getHypotheticalLiquidityData,
	getLockedPrices,
	getAccountCollateral,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Asset);
