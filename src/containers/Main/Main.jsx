import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ContentUser from '../../components/ContentUser/ContentUser';
import ContentPool from '../../components/ContentPool/ContentPool';
import UserActions from '../../components/UserActions/UserActions';

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
} from '../../actions/usersFinancicalTransactions';

import {
	getPoolsBalance,
	getPoolsBorrowBalance,
	getRatesData,
	resetPoolsData,
} from '../../actions/dashboardData';

function Main(props) {
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

		getPoolsBalance,
		poolsBalance,

		getPoolsBorrowBalance,
		poolsBorrowBalance,

		getRatesData,
		ratesData,

		resetPoolsData,
	} = props;

	useEffect(() => {
		getPoolParameters();
		return () => {
			resetPoolsData();
		};
	}, []);

	const getPoolParameters = () => {
		getPoolsBalance();
		getPoolsBorrowBalance();
		getRatesData();
	};

	useEffect(() => {
		if (isDepositUnderlyingResponseRunning || !depositUnderlyingResponse)
			return;

		const { isError, errorMessage } = depositUnderlyingResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getPoolParameters();
			handleSuccess();
		}
	}, [depositUnderlyingResponse, isDepositUnderlyingResponseRunning]);

	useEffect(() => {
		if (isBorrowResponseRunning || !borrowResponse) return;

		const { isError, errorMessage } = borrowResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getPoolParameters();
			handleSuccess();
		}
	}, [borrowResponse, isBorrowResponseRunning]);

	useEffect(() => {
		if (isRedeemResponseRunning || !redeemResponse) return;

		const { isError, errorMessage } = redeemResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getPoolParameters();
			handleSuccess();
		}
	}, [redeemResponse, isRedeemResponseRunning]);

	useEffect(() => {
		if (isRedeemUnderlyingResponseRunning || !redeemUnderlyingResponse) return;

		const { isError, errorMessage } = redeemUnderlyingResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getPoolParameters();
			handleSuccess();
		}
	}, [redeemUnderlyingResponse, isRedeemUnderlyingResponseRunning]);

	useEffect(() => {
		if (isRedeemWrappedResponseRunning || !redeemWrappedResponse) return;

		const { isError, errorMessage } = redeemWrappedResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getPoolParameters();
			handleSuccess();
		}
	}, [redeemWrappedResponse, isRedeemWrappedResponseRunning]);

	useEffect(() => {
		if (isRepayAllResponseRunning || !repayAllResponse) return;

		const { isError, errorMessage } = repayAllResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getPoolParameters();
			handleSuccess();
		}
	}, [repayAllResponse, isRepayAllResponseRunning]);

	useEffect(() => {
		if (isRepayResponseRunning || !repayResponse) return;

		const { isError, errorMessage } = repayResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getPoolParameters();
			handleSuccess();
		}
	}, [repayResponse, isRepayResponseRunning]);

	useEffect(() => {
		if (isRepayOnBehalfResponseRunning || !repayOnBehalfResponse) return;

		const { isError, errorMessage } = repayOnBehalfResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getPoolParameters();
			handleSuccess();
		}
	}, [repayOnBehalfResponse, isRepayOnBehalfResponseRunning]);

	const handleError = (errorMessage) => alert(errorMessage);
	const handleSuccess = () => alert('Transaction completed successfully.');

	return (
		<div className={classes.wrapper}>
			<div className={classes.content_user}>
				<ContentUser account={account} />
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
				/>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	api: state.substrate.api,
	keyring: state.account.keyring,
	account: state.account.currentAccount,

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
	getPoolsBalance,
	getPoolsBorrowBalance,
	getRatesData,
	resetPoolsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
