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
	resetUserRequests,
} from '../../actions/dashboardUpdates';
import {
	resetDashboardData,
	getUserBalance,
	getPoolUserParams,
	getHypotheticalLiquidityData,
	getAccountCollateral,
	getUserBorrowPerAsset,
} from '../../actions/dashboardData';
import { getControllerParams } from '../../actions/protocolAdminData';
import { getUserPrices } from '../../actions/protocolData';
import {
	formatData,
	toLocale,
	useAPIResponse,
	convertRateToFraction,
} from '../../util';
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

		getUserPrices,
		pricesData,
		resetDashboardData,
		resetUserRequests,

		getControllerParams,
		controllerParams,

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

		getUserBorrowPerAsset,
		userBorrowPerAsset,
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
		isRepayAllResponseRunning,
		repayAllResponse,
		isRedeemUnderlyingResponseRunning,
		redeemUnderlyingResponse,
	} = props;

	const { assetId } = useParams<AssetParams>();

	const getUserData = () => {
		getUserPrices();
		if (currentAccount) {
			getUserBalance(currentAccount);
			getPoolUserParams(currentAccount);
			getHypotheticalLiquidityData(currentAccount);
			getAccountCollateral(currentAccount);
			getUserBorrowPerAsset(currentAccount);
		}
	};

	useEffect(() => {
		getUserData();
		getControllerParams();
		return () => {
			resetDashboardData();
			resetUserRequests();
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
	useAPIResponse([isRepayAllResponseRunning, repayAllResponse], getUserData);
	useAPIResponse(
		[isRedeemUnderlyingResponseRunning, redeemUnderlyingResponse],
		getUserData
	);

	if (!currencies.includes(assetId)) return <div>No such currency</div>;

	const wrappedCurrencyId = wrappedCurrencies[currencies.indexOf(assetId)];

	if (!currentAccount) return <div>Choose User</div>;

	if (
		!usersBalance ||
		!poolUserParams ||
		!pricesData ||
		!userBalanceUSD ||
		!hypotheticalLiquidityData ||
		!accountCollateral ||
		!userBorrowPerAsset
	)
		return <LoaderWrap text='Loading' />;

	const isCollateralEnabled =
		poolUserParams[assetId]['is_collateral'].toString() === 'true';

	const balance = parseFloat(
		formatData(usersBalance[assetId]['free']).toString()
	).toFixed(2);

	const realPrice = parseFloat(
		(pricesData[assetId].toString() / 10 ** 18).toString()
	);

	const availableToBorrow = hypotheticalLiquidityData.value.liquidity
		? parseFloat(
				(
					hypotheticalLiquidityData.value.liquidity.toString() /
					10 ** 18
				).toString()
		  ) / realPrice
		: 0;

	const currentBorrowLimit = hypotheticalLiquidityData.value.liquidity
		? parseFloat(
				(
					hypotheticalLiquidityData.value.liquidity.toString() /
					10 ** 18
				).toString()
		  )
		: 0;

	const borrowed = parseFloat(
		formatData(userBorrowPerAsset[assetId].value.amount).toString()
	);

	const supplied = parseFloat(
		formatData(usersBalance[wrappedCurrencyId]['free']).toString()
	);

	const borrowedPerAsset =
		userBorrowPerAsset &&
		parseFloat(
			formatData(userBorrowPerAsset[assetId].value.amount).toString()
		).toFixed(2);

	const totalSupplied = Number(
		formatData(userBalanceUSD?.total_supply)
	).toFixed(8);
	const totalBorrowed = Number(
		formatData(userBalanceUSD?.total_borrowed)
	).toFixed(8);
	const totalCollateral = Number(
		formatData(accountCollateral?.value.amount)
	).toFixed(8);

	const collateralFactor =
		controllerParams &&
		convertRateToFraction(controllerParams[assetId].collateral_factor);

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
			label: 'Borrow Limit:',
			value: `${toLocale(availableToBorrow)} ${assetId}`,
		},
	];

	const repayInfo = [
		{
			label: 'Borrowed:',
			value: `${borrowedPerAsset} ${assetId}`,
		},
	];

	const loanToValueData = {
		totalSupplied: totalSupplied,
		totalBorrowed: totalBorrowed,
		borrowed: borrowed,
		supplied: supplied,
		realPrice,
		totalCollateral,
		collateralFactor: collateralFactor,
		currentBorrowLimit: currentBorrowLimit,
		isCollateralEnabled: isCollateralEnabled,
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
								title={`Confirm ${assetId} Supply`}
								defaultAssetId={assetId}
								info={depositInfo}
								loanToValueData={loanToValueData}
								walletBalance={+balance}
								disableCurrencySelection={true}
							/>
							<RedeemUnderlying
								title={`Confirm ${assetId} Withdraw`}
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
							<div className='label'>Borrow Limit</div>
							<div className='value'>
								<span className='bold'>{toLocale(availableToBorrow)}</span>{' '}
								{assetId}
							</div>
						</div>
						<div className='actions'>
							<Repay
								title={`Confirm ${assetId} Repay`}
								defaultAssetId={assetId}
								info={repayInfo}
								loanToValueData={loanToValueData}
								disableCurrencySelection={true}
								userBorrowPerAsset={userBorrowPerAsset}
							/>
							<BorrowOperations
								title={`Confirm ${assetId} Borrow`}
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
	pricesData: state.protocolData.prices,
	accountCollateral: state.dashboardData.accountCollateral,
	userBorrowPerAsset: state.dashboardData.userBorrowPerAsset,
	controllerParams: state.protocolAdminData.controllerParams,
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
	isRepayAllResponseRunning: state.dashboardUpdates.isRepayAllResponseRunning,
	repayAllResponse: state.dashboardUpdates.repayAllResponse,
	isRedeemUnderlyingResponseRunning:
		state.dashboardUpdates.isRedeemUnderlyingResponseRunning,
	redeemUnderlyingResponse: state.dashboardUpdates.redeemUnderlyingResponse,
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
	getUserPrices,
	resetUserRequests,
	getAccountCollateral,
	getUserBorrowPerAsset,
	getControllerParams,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Asset);
