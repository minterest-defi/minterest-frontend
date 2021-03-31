import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { State } from '../../util/types';
import { useInterval } from '../../util';
import config from '../../config';
import UserData from '../../components/UserData/UserData';
import ProtocolData from '../../components/ProtocolData/ProtocolData';
import UserActions from '../../components/UserActions/UserActions';
// @ts-ignore
import classes from './Main.module.css';
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
	disableCollateral,
	enableAsCollateral,
} from '../../actions/dashboardUpdates';
import {
	getUserBalance,
	getPoolUserDates,
	getPoolsBalance,
	getPoolsBorrowBalance,
	getRatesData,
	resetDashboardData,
	resetUserData,
} from '../../actions/dashboardData';

function Main(props: MainProps) {
	const {
		keyring,
		account,

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

		getPoolUserDates,
		poolUserDates,

		getPoolsBalance,
		poolsBalance,

		getPoolsBorrowBalance,
		poolsBorrowBalance,

		getRatesData,
		ratesData,

		resetDashboardData,
		resetUserData,
		resetUserRequests,

		disableCollateral,
		disableCollateralResponse,
		isDisableCollateralResponseRunning,

		enableAsCollateral,
		enableAsCollateralResponse,
		isEnableAsCollateralResponseRunning,
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
		getPoolUserDates(account);
	};

	useEffect(() => {
		if (isDepositUnderlyingResponseRunning || !depositUnderlyingResponse)
			return;

		const { isError, errorMessage } = depositUnderlyingResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			if (account) {
				getUserDashboardParameters(account);
			}
			getPoolDashboardParameters();
			handleSuccess();
		}
	}, [depositUnderlyingResponse, isDepositUnderlyingResponseRunning]);

	useEffect(() => {
		if (isBorrowResponseRunning || !borrowResponse) return;

		const { isError, errorMessage } = borrowResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			if (account) {
				getUserDashboardParameters(account);
			}
			getPoolDashboardParameters();
			handleSuccess();
		}
	}, [borrowResponse, isBorrowResponseRunning]);

	useEffect(() => {
		if (isRedeemResponseRunning || !redeemResponse) return;

		const { isError, errorMessage } = redeemResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			if (account) {
				getUserDashboardParameters(account);
			}
			getPoolDashboardParameters();
			handleSuccess();
		}
	}, [redeemResponse, isRedeemResponseRunning]);

	useEffect(() => {
		if (isRedeemUnderlyingResponseRunning || !redeemUnderlyingResponse) return;

		const { isError, errorMessage } = redeemUnderlyingResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			if (account) {
				getUserDashboardParameters(account);
			}
			getPoolDashboardParameters();
			handleSuccess();
		}
	}, [redeemUnderlyingResponse, isRedeemUnderlyingResponseRunning]);

	useEffect(() => {
		if (isRedeemWrappedResponseRunning || !redeemWrappedResponse) return;

		const { isError, errorMessage } = redeemWrappedResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			if (account) {
				getUserDashboardParameters(account);
			}
			getPoolDashboardParameters();
			handleSuccess();
		}
	}, [redeemWrappedResponse, isRedeemWrappedResponseRunning]);

	useEffect(() => {
		if (isRepayAllResponseRunning || !repayAllResponse) return;

		const { isError, errorMessage } = repayAllResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			if (account) {
				getUserDashboardParameters(account);
			}
			getPoolDashboardParameters();
			handleSuccess();
		}
	}, [repayAllResponse, isRepayAllResponseRunning]);

	useEffect(() => {
		if (isRepayResponseRunning || !repayResponse) return;

		const { isError, errorMessage } = repayResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			if (account) {
				getUserDashboardParameters(account);
			}
			getPoolDashboardParameters();
			handleSuccess();
		}
	}, [repayResponse, isRepayResponseRunning]);

	useEffect(() => {
		if (isRepayOnBehalfResponseRunning || !repayOnBehalfResponse) return;

		const { isError, errorMessage } = repayOnBehalfResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			if (account) {
				getUserDashboardParameters(account);
			}
			getPoolDashboardParameters();
			handleSuccess();
		}
	}, [repayOnBehalfResponse, isRepayOnBehalfResponseRunning]);

	useEffect(() => {
		if (isTransferWrappedResponseRunning || !transferWrappedResponse) return;

		const { isError, errorMessage } = transferWrappedResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			if (account) {
				getUserDashboardParameters(account);
			}
			getPoolDashboardParameters();
			handleSuccess();
		}
	}, [transferWrappedResponse, isTransferWrappedResponseRunning]);

	useEffect(() => {
		if (isDisableCollateralResponseRunning || !disableCollateralResponse)
			return;

		const { isError, errorMessage } = disableCollateralResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			if (account) {
				getUserDashboardParameters(account);
			}
			handleSuccess();
		}
	}, [disableCollateralResponse, isDisableCollateralResponseRunning]);

	useEffect(() => {
		if (isEnableAsCollateralResponseRunning || !enableAsCollateralResponse)
			return;

		const { isError, errorMessage } = enableAsCollateralResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			if (account) {
				getUserDashboardParameters(account);
			}
			handleSuccess();
		}
	}, [enableAsCollateralResponse, isEnableAsCollateralResponseRunning]);

	const handleError = (errorMessage: string) => alert(errorMessage);
	const handleSuccess = () => alert('Transaction completed successfully.');

	return (
		<div className={classes.wrapper}>
			<div className={classes.protocol_data}>
				<ProtocolData
					poolsBalance={poolsBalance}
					poolsBorrowBalance={poolsBorrowBalance}
					ratesData={ratesData}
				/>
			</div>
			<div className={classes.user_data}>
				<UserData
					account={account}
					keyring={keyring}
					usersBalance={usersBalance}
					poolUserDates={poolUserDates}
					disableCollateral={disableCollateral}
					isDisableCollateralResponseRunning={
						isDisableCollateralResponseRunning
					}
					enableAsCollateral={enableAsCollateral}
					isEnableAsCollateralResponseRunning={
						isEnableAsCollateralResponseRunning
					}
					disableCollateralResponse={disableCollateralResponse}
					enableAsCollateralResponse={enableAsCollateralResponse}
				/>
			</div>
			<div className={classes.actions}>
				<h2>Actions</h2>
				<UserActions
					keyring={keyring}
					account={account}
					depositUnderlying={depositUnderlying}
					isDepositUnderlyingResponseRunning={
						isDepositUnderlyingResponseRunning
					}
					borrow={borrow}
					isBorrowResponseRunning={isBorrowResponseRunning}
					redeem={redeem}
					isRedeemResponseRunning={isRedeemResponseRunning}
					redeemUnderlying={redeemUnderlying}
					isRedeemUnderlyingResponseRunning={isRedeemUnderlyingResponseRunning}
					redeemWrapped={redeemWrapped}
					isRedeemWrappedResponseRunning={isRedeemWrappedResponseRunning}
					repayAll={repayAll}
					isRepayAllResponseRunning={isRepayAllResponseRunning}
					repay={repay}
					isRepayResponseRunning={isRepayResponseRunning}
					repayOnBehalf={repayOnBehalf}
					isRepayOnBehalfResponseRunning={isRepayOnBehalfResponseRunning}
					transferWrapped={transferWrapped}
					isTransferWrappedResponseRunning={isTransferWrappedResponseRunning}
				/>
			</div>
		</div>
	);
}

const mapStateToProps = (state: State) => ({
	account: state.account.currentAccount,
	keyring: state.account.keyring,
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

	disableCollateralResponse: state.dashboardUpdates.disableCollateralResponse,
	isDisableCollateralResponseRunning:
		state.dashboardUpdates.isDisableCollateralResponseRunning,

	enableAsCollateralResponse: state.dashboardUpdates.enableAsCollateralResponse,
	isEnableAsCollateralResponseRunning:
		state.dashboardUpdates.isEnableAsCollateralResponseRunning,

	usersBalance: state.dashboardData.usersBalance,
	poolUserDates: state.dashboardData.poolUserDates,
	poolsBalance: state.dashboardData.poolsBalance,
	poolsBorrowBalance: state.dashboardData.poolsBorrowBalance,
	ratesData: state.dashboardData.ratesData,
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
	getPoolUserDates,
	getPoolsBalance,
	getPoolsBorrowBalance,
	getRatesData,
	resetDashboardData,
	resetUserData,
	resetUserRequests,
	transferWrapped,
	disableCollateral,
	enableAsCollateral,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Main);
