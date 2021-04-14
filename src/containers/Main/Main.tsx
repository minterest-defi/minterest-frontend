import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { State } from '../../util/types';
import { useInterval, useAPIResponse } from '../../util';
import config from '../../config';
import UserData from '../../components/UserData/UserData';
import ProtocolData from '../../components/ProtocolData/ProtocolData';
import UserActions from '../../components/UserActions/UserActions';
import classes from './Main.module.scss';
import { MainProps } from './Main.types';
import {
	depositUnderlying,
	borrow,
	redeem,
	redeemUnderlying,
	redeemWrapped,
	repayAll,
	repay,
	repayOnBehalf,
	resetUserRequests,
	transferWrapped,
	disableIsCollateral,
	enableIsCollateral,
} from '../../actions/dashboardUpdates';
import {
	getUserBalance,
	getPoolUserParams,
	getPoolsBalance,
	getPoolsBorrowBalance,
	getRatesData,
	resetDashboardData,
	resetUserData,
	getUserBalanceUSD,
} from '../../actions/dashboardData';

function Main(props: MainProps) {
	const {
		keyring,
		account,
		currenciesOptions,
		wrappedCurrenciesOptions,
		wrappedCurrencies,
		currencies,

		depositUnderlying,
		depositUnderlyingResponse,
		isDepositUnderlyingResponseRunning,

		borrow,
		borrowResponse,
		isBorrowResponseRunning,

		redeem,
		redeemResponse,
		isRedeemResponseRunning,

		redeemUnderlying,
		redeemUnderlyingResponse,
		isRedeemUnderlyingResponseRunning,

		redeemWrapped,
		redeemWrappedResponse,
		isRedeemWrappedResponseRunning,

		repayAll,
		repayAllResponse,
		isRepayAllResponseRunning,

		repay,
		repayResponse,
		isRepayResponseRunning,

		repayOnBehalf,
		repayOnBehalfResponse,
		isRepayOnBehalfResponseRunning,

		transferWrapped,
		transferWrappedResponse,
		isTransferWrappedResponseRunning,

		getUserBalance,
		usersBalance,

		getPoolUserParams,
		poolUserParams,

		getPoolsBalance,
		poolsBalance,

		getPoolsBorrowBalance,
		poolsBorrowBalance,

		getRatesData,
		ratesData,

		resetDashboardData,
		resetUserData,
		resetUserRequests,

		disableIsCollateral,
		disableIsCollateralResponse,
		isDisableCollateralResponseRunning,

		enableIsCollateral,
		enableIsCollateralResponse,
		isEnableAsCollateralResponseRunning,

		userBalanceUSD,
		getUserBalanceUSD,
	} = props;

	useEffect(() => {
		getPoolDashboardParameters();
		return () => {
			resetDashboardData();
			resetUserRequests();
		};
	}, []);

	const updateUserWatcher = () => {
		if (account) {
			getUserDashboardParameters(account);
		}
	};

	useInterval(updateUserWatcher, config.POOL_PERIOD_SEC * 1000);

	const getPoolDashboardParameters = () => {
		getPoolsBalance();
		getPoolsBorrowBalance();
		getRatesData();
	};

	useEffect(() => {
		if (account) {
			getUserDashboardParameters(account);
		} else {
			resetUserData();
		}
	}, [account]);

	const getUserDashboardParameters = (account: string) => {
		getUserBalance(account);
		getPoolUserParams(account);
		getUserBalanceUSD(account);
	};

	const handleError = (errorMessage: string) => alert(errorMessage);
	const handleSuccess = () => alert('Transaction completed successfully.');

	const onSuccess = () => {
		getPoolDashboardParameters();
		handleSuccess();
	};

	useAPIResponse(
		[isDepositUnderlyingResponseRunning, depositUnderlyingResponse],
		onSuccess,
		handleError
	);

	useAPIResponse(
		[isBorrowResponseRunning, borrowResponse],
		onSuccess,
		handleError
	);

	useAPIResponse(
		[isRedeemResponseRunning, redeemResponse],
		onSuccess,
		handleError
	);

	useAPIResponse(
		[isRedeemUnderlyingResponseRunning, redeemUnderlyingResponse],
		onSuccess,
		handleError
	);

	useAPIResponse(
		[isRedeemWrappedResponseRunning, redeemWrappedResponse],
		onSuccess,
		handleError
	);

	useAPIResponse(
		[isRepayAllResponseRunning, repayAllResponse],
		onSuccess,
		handleError
	);

	useAPIResponse(
		[isRepayResponseRunning, repayResponse],
		onSuccess,
		handleError
	);

	useAPIResponse(
		[isRepayOnBehalfResponseRunning, repayOnBehalfResponse],
		onSuccess,
		handleError
	);

	useAPIResponse(
		[isTransferWrappedResponseRunning, transferWrappedResponse],
		onSuccess,
		handleError
	);

	useAPIResponse(
		[isDisableCollateralResponseRunning, disableIsCollateralResponse],
		handleSuccess,
		handleError
	);

	useAPIResponse(
		[isEnableAsCollateralResponseRunning, enableIsCollateralResponse],
		handleSuccess,
		handleError
	);

	return (
		<div className={classes.wrapper}>
			<div className={classes.protocol_data}>
				<ProtocolData
					poolsBalance={poolsBalance}
					poolsBorrowBalance={poolsBorrowBalance}
					ratesData={ratesData}
					currencies={currencies}
				/>
			</div>
			<div className={classes.user_data}>
				<UserData
					account={account}
					keyring={keyring}
					usersBalance={usersBalance}
					poolUserParams={poolUserParams}
					disableIsCollateral={disableIsCollateral}
					isDisableCollateralResponseRunning={
						isDisableCollateralResponseRunning
					}
					enableIsCollateral={enableIsCollateral}
					isEnableAsCollateralResponseRunning={
						isEnableAsCollateralResponseRunning
					}
					disableIsCollateralResponse={disableIsCollateralResponse}
					enableIsCollateralResponse={enableIsCollateralResponse}
					userBalanceUSD={userBalanceUSD}
					wrappedCurrencies={wrappedCurrencies}
					currencies={currencies}
				/>
			</div>
			<div className={classes.actions}>
				<h2>Actions</h2>
				<UserActions
					keyring={keyring}
					account={account}
					currenciesOptions={currenciesOptions}
					wrappedCurrenciesOptions={wrappedCurrenciesOptions}
					depositUnderlying={depositUnderlying}
					isDepositUnderlyingResponseRunning={
						isDepositUnderlyingResponseRunning
					}
					depositUnderlyingResponse={depositUnderlyingResponse}
					borrow={borrow}
					isBorrowResponseRunning={isBorrowResponseRunning}
					borrowResponse={borrowResponse}
					redeem={redeem}
					isRedeemResponseRunning={isRedeemResponseRunning}
					redeemResponse={redeemResponse}
					redeemUnderlying={redeemUnderlying}
					isRedeemUnderlyingResponseRunning={isRedeemUnderlyingResponseRunning}
					redeemUnderlyingResponse={redeemUnderlyingResponse}
					redeemWrapped={redeemWrapped}
					isRedeemWrappedResponseRunning={isRedeemWrappedResponseRunning}
					redeemWrappedResponse={redeemWrappedResponse}
					repayAll={repayAll}
					isRepayAllResponseRunning={isRepayAllResponseRunning}
					repayAllResponse={repayAllResponse}
					repay={repay}
					isRepayResponseRunning={isRepayResponseRunning}
					repayResponse={repayResponse}
					repayOnBehalf={repayOnBehalf}
					isRepayOnBehalfResponseRunning={isRepayOnBehalfResponseRunning}
					repayOnBehalfResponse={repayOnBehalfResponse}
					transferWrapped={transferWrapped}
					isTransferWrappedResponseRunning={isTransferWrappedResponseRunning}
					transferWrappedResponse={transferWrappedResponse}
				/>
			</div>
		</div>
	);
}

const mapStateToProps = (state: State) => ({
	account: state.account.currentAccount,
	keyring: state.account.keyring,
	currenciesOptions: state.protocolData.currenciesOptions,
	wrappedCurrenciesOptions: state.protocolData.wrappedCurrenciesOptions,
	wrappedCurrencies: state.protocolData.wrappedCurrencies,
	currencies: state.protocolData.currencies,

	depositUnderlyingResponse: state.dashboardUpdates.depositUnderlyingResponse,
	isDepositUnderlyingResponseRunning:
		state.dashboardUpdates.isDepositUnderlyingResponseRunning,

	borrowResponse: state.dashboardUpdates.borrowResponse,
	isBorrowResponseRunning: state.dashboardUpdates.isBorrowResponseRunning,

	redeemResponse: state.dashboardUpdates.redeemResponse,
	isRedeemResponseRunning: state.dashboardUpdates.isRedeemResponseRunning,

	redeemUnderlyingResponse: state.dashboardUpdates.redeemUnderlyingResponse,
	isRedeemUnderlyingResponseRunning:
		state.dashboardUpdates.isRedeemUnderlyingResponseRunning,

	redeemWrappedResponse: state.dashboardUpdates.redeemWrappedResponse,
	isRedeemWrappedResponseRunning:
		state.dashboardUpdates.isRedeemWrappedResponseRunning,

	repayAllResponse: state.dashboardUpdates.repayAllResponse,
	isRepayAllResponseRunning: state.dashboardUpdates.isRepayAllResponseRunning,

	repayResponse: state.dashboardUpdates.repayResponse,
	isRepayResponseRunning: state.dashboardUpdates.isRepayResponseRunning,

	repayOnBehalfResponse: state.dashboardUpdates.repayOnBehalfResponse,
	isRepayOnBehalfResponseRunning:
		state.dashboardUpdates.isRepayOnBehalfResponseRunning,

	transferWrappedResponse: state.dashboardUpdates.transferWrappedResponse,
	isTransferWrappedResponseRunning:
		state.dashboardUpdates.isTransferWrappedResponseRunning,

	disableIsCollateralResponse:
		state.dashboardUpdates.disableIsCollateralResponse,
	isDisableCollateralResponseRunning:
		state.dashboardUpdates.isDisableCollateralResponseRunning,

	enableIsCollateralResponse: state.dashboardUpdates.enableIsCollateralResponse,
	isEnableAsCollateralResponseRunning:
		state.dashboardUpdates.isEnableAsCollateralResponseRunning,

	usersBalance: state.dashboardData.usersBalance,
	poolUserParams: state.dashboardData.poolUserParams,
	poolsBalance: state.dashboardData.poolsBalance,
	poolsBorrowBalance: state.dashboardData.poolsBorrowBalance,
	ratesData: state.dashboardData.ratesData,
	userBalanceUSD: state.dashboardData.userBalanceUSD,
});

const mapDispatchToProps = {
	depositUnderlying,
	borrow,
	redeem,
	redeemUnderlying,
	redeemWrapped,
	repayAll,
	repay,
	repayOnBehalf,
	getUserBalance,
	getPoolUserParams,
	getPoolsBalance,
	getPoolsBorrowBalance,
	getRatesData,
	resetDashboardData,
	resetUserData,
	resetUserRequests,
	transferWrapped,
	disableIsCollateral,
	enableIsCollateral,
	getUserBalanceUSD,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Main);
