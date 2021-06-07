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
	resetDashboardData,
	getPoolsBalance,
	getPoolsBorrowBalance,
	getRatesData,
	getUserBorrowPerAsset,
	getUserUnderlyingBalancePerAsset,
} from '../../actions/dashboardData';
import { useInterval } from '../../util';
import config from '../../config';

function Assets(props: AssetsProps) {
	const {
		currencies,
		currentAccount,
		//user
		usersBalance,
		getUserBalance,
		getUserBorrowPerAsset,
		userBorrowPerAsset,
		getUserUnderlyingBalancePerAsset,
		userUnderlyingBalancePerAsset,
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
			getUserBorrowPerAsset(currentAccount);
			getUserUnderlyingBalancePerAsset(currentAccount);
		}
	}, [currentAccount]);

	const updateUserWatcher = () => {
		if (currentAccount) {
			getUserBalance(currentAccount);
			getUserBorrowPerAsset(currentAccount);
			getUserUnderlyingBalancePerAsset(currentAccount);
		}
	};

	const renderUserAssets = () => {
		if (
			!currentAccount ||
			!usersBalance ||
			!userBorrowPerAsset ||
			!userUnderlyingBalancePerAsset
		)
			return null;

		return (
			<Fragment>
				<div className={'title'}>User Assets</div>
				<UserAssetsTable
					currencies={currencies}
					userBorrowPerAsset={userBorrowPerAsset}
					userUnderlyingBalancePerAsset={userUnderlyingBalancePerAsset}
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
			<div className={'title'}>Available Assets</div>
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
	usersBalance: state.dashboardData.usersBalance,
	userBorrowPerAsset: state.dashboardData.userBorrowPerAsset,
	userUnderlyingBalancePerAsset:
		state.dashboardData.userUnderlyingBalancePerAsset,
	//pool
	poolsBalance: state.dashboardData.poolsBalance,
	poolsBorrowBalance: state.dashboardData.poolsBorrowBalance,
	ratesData: state.dashboardData.ratesData,
});

const mapDispatchToProps = {
	getUserBalance,
	resetDashboardData,
	getPoolsBalance,
	getPoolsBorrowBalance,
	getRatesData,
	getUserBorrowPerAsset,
	getUserUnderlyingBalancePerAsset,
};

export default connect(mapStateToProps, mapDispatchToProps)(Assets);
