import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// import ContentUser from '../../components/ContentUser/ContentUser';
import ContentPool from '../../components/ContentPool/ContentPool';
import UserActions from '../../components/UserActions/UserActions';

import classes from './Main.module.css';

//import { BLOCKS_PER_YEAR, UNDERLYING_ASSETS_TYPES } from '../../util/constants';

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

import { getPoolsBalance, resetPoolsData } from '../../actions/dashboardData';

function Main(props) {
	const {
		//api,
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

		resetPoolsData,
	} = props;

	useEffect(() => {
		getPoolsBalance();
		return () => {
			resetPoolsData();
		};
	}, []);

	useEffect(() => {
		if (isDepositUnderlyingResponseRunning || !depositUnderlyingResponse)
			return;

		const { isError, errorMessage } = depositUnderlyingResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getPoolsBalance();
			handleSuccess();
		}
	}, [depositUnderlyingResponse, isDepositUnderlyingResponseRunning]);

	useEffect(() => {
		if (isBorrowResponseRunning || !borrowResponse) return;

		const { isError, errorMessage } = borrowResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getPoolsBalance();
			handleSuccess();
		}
	}, [borrowResponse, isBorrowResponseRunning]);

	useEffect(() => {
		if (isRedeemResponseRunning || !redeemResponse) return;

		const { isError, errorMessage } = redeemResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getPoolsBalance();
			handleSuccess();
		}
	}, [redeemResponse, isRedeemResponseRunning]);

	useEffect(() => {
		if (isRedeemUnderlyingResponseRunning || !redeemUnderlyingResponse) return;

		const { isError, errorMessage } = redeemUnderlyingResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getPoolsBalance();
			handleSuccess();
		}
	}, [redeemUnderlyingResponse, isRedeemUnderlyingResponseRunning]);

	useEffect(() => {
		if (isRedeemWrappedResponseRunning || !redeemWrappedResponse) return;

		const { isError, errorMessage } = redeemWrappedResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getPoolsBalance();
			handleSuccess();
		}
	}, [redeemWrappedResponse, isRedeemWrappedResponseRunning]);

	useEffect(() => {
		if (isRepayAllResponseRunning || !repayAllResponse) return;

		const { isError, errorMessage } = repayAllResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getPoolsBalance();
			handleSuccess();
		}
	}, [repayAllResponse, isRepayAllResponseRunning]);

	useEffect(() => {
		if (isRepayResponseRunning || !repayResponse) return;

		const { isError, errorMessage } = repayResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getPoolsBalance();
			handleSuccess();
		}
	}, [repayResponse, isRepayResponseRunning]);

	useEffect(() => {
		if (isRepayOnBehalfResponseRunning || !repayOnBehalfResponse) return;

		const { isError, errorMessage } = repayOnBehalfResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getPoolsBalance();
			handleSuccess();
		}
	}, [repayOnBehalfResponse, isRepayOnBehalfResponseRunning]);

	const handleError = (errorMessage) => alert(errorMessage);
	const handleSuccess = () => alert('Transaction completed successfully.');

	//const { api, currentAccount, getPoolsBalance } = props;

	// const initRates = UNDERLYING_ASSETS_TYPES.reduce((old, item) => {
	// 	old[item] = {};
	// 	return old;
	// }, {});

	// const initCurrencyBalance = UNDERLYING_ASSETS_TYPES.reduce((old, item) => {
	// 	old[item] = '0.0';
	// 	return old;
	// }, {});

	// const [rates, setRates] = useState(initRates);
	// const [currencyBalance, setCurrencyBalance] = useState(initCurrencyBalance);

	// // TODO redux actions, refactoring
	// useEffect(() => {
	// 	fetchData();
	// }, []);
	// // TODO refactoring
	// const updateData = () => {
	// 	fetchData();
	// };

	// const fetchRates = async (asset) => {
	// 	const dataRates = await api.rpc.controller.liquidityPoolState(asset);
	// 	const conversionRate = (rate) => {
	// 		return rate.toHuman().split(',').join('') / 10 ** 18;
	// 	};
	// 	const borrow = conversionRate(dataRates.borrow_rate) * BLOCKS_PER_YEAR;
	// 	const supply = conversionRate(dataRates.supply_rate) * BLOCKS_PER_YEAR;
	// 	const exchange = conversionRate(dataRates.exchange_rate);
	// 	return {
	// 		borrowRate: `${(borrow * 100).toFixed(2)} %`,
	// 		supplyRate: `${(supply * 100).toFixed(2)} %`,
	// 		exchangeRate: exchange,
	// 	};
	// };

	// const fetchBalancePool = async (asset) => {
	// 	const poolKey = api.consts.liquidityPools.poolAccountId.toHuman();

	// 	if (poolKey) {
	// 		const palletName = 'tokens';
	// 		const transactionName = 'accounts';
	// 		const dataName = 'free';
	// 		const transactionParams = [poolKey, asset];

	// 		const decimals = api.registry.chainDecimals;
	// 		const data = await api.query[palletName][transactionName](
	// 			...transactionParams
	// 		);
	// 		const balanceData = formatBalance(
	// 			data[dataName],
	// 			{ withSi: false, forceUnit: '-' },
	// 			0
	// 		)
	// 			.split('.', 1)
	// 			.join('')
	// 			.split(',')
	// 			.join('');
	// 		let balance;
	// 		if (balanceData.length > decimals) {
	// 			balance = `${
	// 				balanceData.slice(0, balanceData.length - decimals) || '0'
	// 			}.${balanceData.slice(balanceData.length - decimals)}`;
	// 		} else if (balanceData.length < decimals) {
	// 			balance = balanceData / 10 ** decimals;
	// 		} else {
	// 			balance = balanceData;
	// 		}
	// 		return balance;
	// 	} else if (currencyBalance[asset] !== '0.0') {
	// 		return '0.0';
	// 	}
	// };

	// const fetchData = async () => {
	// 	const newRatesData = await Promise.all(
	// 		UNDERLYING_ASSETS_TYPES.map((asset) => {
	// 			return fetchRates(asset);
	// 		})
	// 	);

	// 	const newCurrencyBalanceData = await Promise.all(
	// 		UNDERLYING_ASSETS_TYPES.map((asset) => {
	// 			return fetchBalancePool(asset);
	// 		})
	// 	);

	// 	let newRates = {};
	// 	let newCurrencyBalance = {};

	// 	UNDERLYING_ASSETS_TYPES.forEach((assert, index) => {
	// 		newRates[assert] = newRatesData[index];
	// 		newCurrencyBalance[assert] = newCurrencyBalanceData[index];
	// 	});

	// 	setRates(newRates);
	// 	setCurrencyBalance(newCurrencyBalance);
	// };

	return (
		<div className={classes.wrapper}>
			{/* <div className={classes.content_user}>
				<ContentUser account={account} />
			</div>
			<div className={classes.content_pool}>
				<ContentPool getPoolsBalance={getPoolsBalance} />
			</div> */}
			<div className={classes.content_pool}>
				<ContentPool poolsBalance={poolsBalance} />
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
	resetPoolsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
