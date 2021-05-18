import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { State } from '../../util/types';
import { MESSAGE_SUCCESS } from '../../util/constants';
import { useInterval, useAPIResponse } from '../../util';
import config from '../../config';
import UserData from '../../components/UserData/UserData';
import ProtocolData from '../../components/ProtocolData/ProtocolData';
import UserActions from '../../components/UserActions/UserActions';
import classes from './Main.module.scss';
import { MainProps } from './Main.types';
import {
	resetUserRequests,
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
	getUserBalanceUSD,
	getUserBorrowPerAsset,
} from '../../actions/dashboardData';

function Main(props: MainProps) {
	const {
		keyring,
		account,
		wrappedCurrencies,
		currencies,

		depositUnderlyingResponse,
		isDepositUnderlyingResponseRunning,

		borrowResponse,
		isBorrowResponseRunning,

		redeemResponse,
		isRedeemResponseRunning,

		redeemUnderlyingResponse,
		isRedeemUnderlyingResponseRunning,

		redeemWrappedResponse,
		isRedeemWrappedResponseRunning,

		repayAllResponse,
		isRepayAllResponseRunning,

		repayResponse,
		isRepayResponseRunning,

		repayOnBehalfResponse,
		isRepayOnBehalfResponseRunning,

		transferWrappedResponse,
		isTransferWrappedResponseRunning,

		getUserBalance,
		usersBalance,

		getPoolUserParams,
		poolUserParams,

		getUserBorrowPerAsset,
		userBorrowPerAsset,

		getPoolsBalance,
		poolsBalance,

		getPoolsBorrowBalance,
		poolsBorrowBalance,

		getRatesData,
		ratesData,

		resetDashboardData,
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
		}
	}, [account]);

	const getUserDashboardParameters = (account: string) => {
		getUserBalance(account);
		getPoolUserParams(account);
		getUserBalanceUSD(account);
		getUserBorrowPerAsset(account);
	};

	const showMessage = (message: string = MESSAGE_SUCCESS) => {
		alert(message);
	};

	const onSuccess = () => {
		getPoolDashboardParameters();
		showMessage();
	};

	useAPIResponse(
		[isDepositUnderlyingResponseRunning, depositUnderlyingResponse],
		onSuccess,
		showMessage
	);

	useAPIResponse(
		[isBorrowResponseRunning, borrowResponse],
		onSuccess,
		showMessage
	);

	useAPIResponse(
		[isRedeemResponseRunning, redeemResponse],
		onSuccess,
		showMessage
	);

	useAPIResponse(
		[isRedeemUnderlyingResponseRunning, redeemUnderlyingResponse],
		onSuccess,
		showMessage
	);

	useAPIResponse(
		[isRedeemWrappedResponseRunning, redeemWrappedResponse],
		onSuccess,
		showMessage
	);

	useAPIResponse(
		[isRepayAllResponseRunning, repayAllResponse],
		onSuccess,
		showMessage
	);

	useAPIResponse(
		[isRepayResponseRunning, repayResponse],
		onSuccess,
		showMessage
	);

	useAPIResponse(
		[isRepayOnBehalfResponseRunning, repayOnBehalfResponse],
		onSuccess,
		showMessage
	);

	useAPIResponse(
		[isTransferWrappedResponseRunning, transferWrappedResponse],
		onSuccess,
		showMessage
	);

	useAPIResponse(
		[isDisableCollateralResponseRunning, disableIsCollateralResponse],
		showMessage,
		showMessage
	);

	useAPIResponse(
		[isEnableAsCollateralResponseRunning, enableIsCollateralResponse],
		showMessage,
		showMessage
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
					userBorrowPerAsset={userBorrowPerAsset}
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
				<UserActions />
			</div>
		</div>
	);
}

const mapStateToProps = (state: State) => ({
	account: state.account.currentAccount,
	keyring: state.account.keyring,
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
	userBorrowPerAsset: state.dashboardData.userBorrowPerAsset,
});

const mapDispatchToProps = {
	getUserBalance,
	getPoolUserParams,
	getPoolsBalance,
	getPoolsBorrowBalance,
	getRatesData,
	resetDashboardData,
	resetUserRequests,
	disableIsCollateral,
	enableIsCollateral,
	getUserBalanceUSD,
	getUserBorrowPerAsset,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Main);
