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
} from '../../actions/dashboardData';
import { getLockedPrices } from '../../actions/protocolAdminData';
import { formatData, useAPIResponse } from '../../util';
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
		!hypotheticalLiquidityData
	)
		return <LoaderWrap text='Loading' />;

	// TODO WIP
	const calculateLoanToValue = () => {
		const allSupplied = 0;
		const allBorrowed = 0;

		if (!allBorrowed) return 'N/A';

		return `${(allSupplied / allBorrowed) * 100} %`;
	};

	const isCollateralEnabled =
		poolUserParams[assetId]['is_collateral'].toString() === 'true';

	const balance = parseFloat(
		formatData(usersBalance[assetId]['free']).toString()
	).toFixed(2);

	const availableToBorrow =
		parseFloat(
			(
				hypotheticalLiquidityData.value.liquidity.toString() /
				10 ** 18
			).toString()
		) /
		parseFloat((lockedPricesData[assetId].toString() / 10 ** 18).toString());

	const borrowed = parseFloat(
		formatData(poolUserParams[assetId]['total_borrowed']).toString()
	).toFixed(2);

	const supplied = parseFloat(
		formatData(usersBalance[wrappedCurrencyId]['free']).toString()
	).toFixed(2);

	const depositInfo = [
		{
			label: 'Wallet Balance:',
			value: `${balance} ${assetId}`,
		},
	];

	const withdrawInfo = [
		{
			label: 'Supply Balance:',
			value: `${supplied} ${wrappedCurrencyId}`,
		},
	];

	const borrowInfo = [
		{
			label: 'Available to Borrow:',
			value: `${availableToBorrow.toFixed(2)} ${assetId}`,
		},
		{
			label: 'New loan to value:',
			value: `djjdj`,
		},
	];

	const repayInfo = [
		{
			label: 'Borrowed:',
			value: `${borrowed} ${assetId}`,
		},
		{
			label: 'New loan to value:',
			value: `djjdj`,
		},
	];

	return (
		<div className='asset-page'>
			<div className='main-title'>Asset: {assetId}</div>
			<div className='header-actions'>
				<div className='question'>Use as Collateral?</div>
				<IsCollateral
					currencyId={assetId}
					isCollateralEnabled={isCollateralEnabled}
				/>
			</div>
			<div className='info-block'>
				<div className='title'>Your information</div>
				<div className='content-block'>
					<div className='block-header'>
						<div className='type'>Supply</div>
						<div className='actions'>
							<DepositOperations
								title='Supply'
								defaultAssetId={assetId}
								info={depositInfo}
							/>
							<RedeemUnderlying
								title='Withdraw'
								defaultAssetId={assetId}
								info={withdrawInfo}
							/>
						</div>
					</div>
					<div className='block-body'>
						<div className='text-row'>
							<div className='label'>Wallet Balance</div>
							<div className='value'>
								<span className='bold'>{balance}</span> {assetId}
							</div>
						</div>
						<div className='text-row'>
							<div className='label'>Supplied</div>
							<div className='value'>
								<span className='bold'>{supplied}</span> {wrappedCurrencyId}
							</div>
						</div>
					</div>
				</div>
				<div className='divider' />
				<div className='content-block'>
					<div className='block-header'>
						<div className='type'>Borrows</div>
						<div className='actions'>
							<Repay title='Repay' defaultAssetId={assetId} info={repayInfo} />
							<BorrowOperations
								title='Borrow'
								defaultAssetId={assetId}
								info={borrowInfo}
							/>
						</div>
					</div>
					<div className='block-body'>
						<div className='text-row'>
							<div className='label'>Borrowed</div>
							<div className='value'>
								<span className='bold'>{borrowed}</span> {assetId}
							</div>
						</div>
						<div className='text-row'>
							<div className='label'>Available to Borrow</div>
							<div className='value'>
								<span className='bold'>{availableToBorrow.toFixed(2)}</span>{' '}
								{assetId}
							</div>
						</div>
						<div className='text-row'>
							<div className='label'>Loan to Value</div>
							<div className='value'>{calculateLoanToValue()}</div>
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
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Asset);