import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { AssetsProps } from './Assets.types';
import AssetsTable from '../../components/Common/AssetsTable/AssetsTable';
import UserAssetsTable from '../../components/Common/UserAssetsTable/UserAssetsTable';
import './Assets.scss';
import { State } from '../../util/types';
import {
	getUserBalance,
	getPoolUserParams,
	resetDashboardData,
	getPoolsBalance,
	getPoolsBorrowBalance,
	getRatesData,
} from '../../actions/dashboardData';
import { useInterval } from '../../util';
import config from '../../config';

function Assets(props: AssetsProps) {
	const {
		currencies,
		wrappedCurrencies,
		currentAccount,
		//user
		poolUserParams,
		usersBalance,
		getUserBalance,
		getPoolUserParams,
		//pool
		getPoolsBalance,
		getPoolsBorrowBalance,
		getRatesData,
		poolsBalance,
		poolsBorrowBalance,
		ratesData,
	} = props;
	const history = useHistory();

	const handleAssetClick = (asset: string) => {
		if (currentAccount) history.push(`/asset/${asset}`);
	};

	const getPoolData = () => {
		getPoolsBalance();
		getPoolsBorrowBalance();
		getRatesData();
	};

	useEffect(() => {
		getPoolData();
		return () => {
			resetDashboardData();
		};
	}, []);

	useEffect(() => {
		if (currentAccount) {
			getUserBalance(currentAccount);
			getPoolUserParams(currentAccount);
		}
	}, [currentAccount]);

	const updateUserWatcher = () => {
		if (currentAccount) {
			getUserBalance(currentAccount);
			getPoolUserParams(currentAccount);
		}
	};

	const renderUserAssets = () => {
		if (!currentAccount || !poolUserParams || !usersBalance) return null;

		return (
			<Fragment>
				<div className={'title'}>User Assets</div>
				<UserAssetsTable
					currencies={currencies}
					wrappedCurrencies={wrappedCurrencies}
					poolUserParams={poolUserParams}
					usersBalance={usersBalance}
					onClick={handleAssetClick}
				/>
			</Fragment>
		);
	};

	useInterval(updateUserWatcher, config.POOL_PERIOD_SEC * 1000);

	if (!poolsBalance || !poolsBorrowBalance || !ratesData)
		return (
			<div className={'assets-page'}>
				<Loader size='small'>Loading</Loader>
			</div>
		);

	return (
		<div className={'assets-page'}>
			<div className={'title'}>Assets</div>
			<AssetsTable
				currencies={currencies}
				poolsBalance={poolsBalance}
				poolsBorrowBalance={poolsBorrowBalance}
				ratesData={ratesData}
				onClick={handleAssetClick}
			/>
			<div className={'divider'} />
			{renderUserAssets()}
		</div>
	);
}

const mapStateToProps = (state: State) => ({
	currentAccount: state.account.currentAccount,
	currencies: state.protocolData.currencies,
	wrappedCurrencies: state.protocolData.wrappedCurrencies,
	//user
	poolUserParams: state.dashboardData.poolUserParams,
	usersBalance: state.dashboardData.usersBalance,
	//pool
	poolsBalance: state.dashboardData.poolsBalance,
	poolsBorrowBalance: state.dashboardData.poolsBorrowBalance,
	ratesData: state.dashboardData.ratesData,
});

const mapDispatchToProps = {
	getUserBalance,
	getPoolUserParams,
	resetDashboardData,
	getPoolsBalance,
	getPoolsBorrowBalance,
	getRatesData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Assets);
