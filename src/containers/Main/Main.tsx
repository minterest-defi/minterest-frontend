import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { State } from '../../util/types';
import { useInterval } from '../../util';
import config from '../../config';
import ContentUser from '../../components/ContentUser/ContentUser';
import ContentPool from '../../components/ContentPool/ContentPool';
import UserActions from '../../components/UserActions/UserActions';
// @ts-ignore
import classes from './Main.module.css';
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
} from '../../actions/usersFinancicalTransactions';
import {
	getUserBalance,
	getPoolUserDates,
	getPoolsBalance,
	getPoolsBorrowBalance,
	getRatesData,
	resetDashboardData,
	resetUserData,
} from '../../actions/dashboardData';
// TODO refactoring types
function Main(props: any) {
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
			getUserDashboardParameters(account);
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
			getUserDashboardParameters(account);
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
			getUserDashboardParameters(account);
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
			getUserDashboardParameters(account);
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
			getUserDashboardParameters(account);
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
			getUserDashboardParameters(account);
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
			getUserDashboardParameters(account);
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
			getUserDashboardParameters(account);
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
			getUserDashboardParameters(account);
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
			getUserDashboardParameters(account);
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
			getUserDashboardParameters(account);
			handleSuccess();
		}
	}, [enableAsCollateralResponse, isEnableAsCollateralResponseRunning]);

	const handleError = (errorMessage: string) => alert(errorMessage);
	const handleSuccess = () => alert('Transaction completed successfully.');

	return (
		<div className={classes.wrapper}>
			<div className={classes.content_user}>
				<ContentUser
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
			<div className={classes.content_pool}>
				<ContentPool
					poolsBalance={poolsBalance}
					poolsBorrowBalance={poolsBorrowBalance}
					ratesData={ratesData}
				/>
			</div>
			<div className={classes.button}>
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
	depositUnderlyingResponse:
		state.usersFinancicalTransactions.depositUnderlyingResponse,
	isDepositUnderlyingResponseRunning:
		state.usersFinancicalTransactions.isDepositUnderlyingResponseRunning,

	borrowResponse: state.usersFinancicalTransactions.borrowResponse,
	isBorrowResponseRunning:
		state.usersFinancicalTransactions.isBorrowResponseRunning,

	redeemResponse: state.usersFinancicalTransactions.redeemResponse,
	isRedeemResponseRunning:
		state.usersFinancicalTransactions.isRedeemResponseRunning,

	redeemUnderlyingResponse:
		state.usersFinancicalTransactions.redeemUnderlyingResponse,
	isRedeemUnderlyingResponseRunning:
		state.usersFinancicalTransactions.isRedeemUnderlyingResponseRunning,

	redeemWrappedResponse:
		state.usersFinancicalTransactions.redeemWrappedResponse,
	isRedeemWrappedResponseRunning:
		state.usersFinancicalTransactions.isRedeemWrappedResponseRunning,

	repayAllResponse: state.usersFinancicalTransactions.repayAllResponse,
	isRepayAllResponseRunning:
		state.usersFinancicalTransactions.isRepayAllResponseRunning,

	repayResponse: state.usersFinancicalTransactions.repayResponse,
	isRepayResponseRunning:
		state.usersFinancicalTransactions.isRepayResponseRunning,

	repayOnBehalfResponse:
		state.usersFinancicalTransactions.repayOnBehalfResponse,
	isRepayOnBehalfResponseRunning:
		state.usersFinancicalTransactions.isRepayOnBehalfResponseRunning,

	transferWrappedResponse:
		state.usersFinancicalTransactions.transferWrappedResponse,
	isTransferWrappedResponseRunning:
		state.usersFinancicalTransactions.isTransferWrappedResponseRunning,

	disableCollateralResponse:
		state.usersFinancicalTransactions.disableCollateralResponse,
	isDisableCollateralResponseRunning:
		state.usersFinancicalTransactions.isDisableCollateralResponseRunning,

	enableAsCollateralResponse:
		state.usersFinancicalTransactions.enableAsCollateralResponse,
	isEnableAsCollateralResponseRunning:
		state.usersFinancicalTransactions.isEnableAsCollateralResponseRunning,

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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
