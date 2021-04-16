import React, { ReactElement, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import {
	API_STATE_READY,
	KEYRING_STATE_READY,
	API_STATE_ERROR,
} from '../../util/constants';
import { State } from '../../util/types';
import MessageWrap from '../../components/Common/MessageWrap/MessageWrap';
import LoaderWrap from '../../components/Common/LoaderWrap/LoaderWrap';
import { loadAccounts, setAccount, checkIsAdmin } from '../../actions/accounts';
import { initializeAPI } from '../../actions/api';
import {
	getCurrencies,
	getWrappedCurrencies,
} from '../../actions/protocolData';
import {
	getBalanceAnnotation,
	getUserBalanceUSD,
	resetUserData,
} from '../../actions/dashboardData';
import { useInterval } from '../../util';
import config from '../../config';

interface MainLayoutProps {
	api: any;
	loadAccounts: () => Promise<void>;
	getCurrencies: () => Promise<void>;
	getWrappedCurrencies: () => Promise<void>;
	initializeAPI: () => Promise<void>;
	resetUserData: () => void;
	apiState: string | null;
	keyringState: string | null;
	currentAccount: string | null;
	keyring: any;
	setAccount: (account: any) => Promise<void>;
	checkIsAdmin: (account: string) => Promise<void>;
	children: ReactElement<any, any>;
	isAdminRequestRunning: boolean;
	wrappedCurrencies: string[];
	currencies: string[];

	userBalanceUSD: any;
	getUserBalanceUSD: (account: string) => Promise<void>;

	getBalanceAnnotation: (account: string | undefined) => Promise<void>;
	balanceAnnotation: any;
}

function MainLayout(props: MainLayoutProps) {
	const {
		children,
		api,
		apiState,
		keyring,
		setAccount,
		isAdminRequestRunning,
		resetUserData,
		userBalanceUSD,
		getUserBalanceUSD,
		balanceAnnotation,
		currentAccount,
		wrappedCurrencies,
		currencies,
		keyringState,
		getCurrencies,
		getWrappedCurrencies,
		loadAccounts,
		initializeAPI,
		checkIsAdmin,
		getBalanceAnnotation,
	} = props;

	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		initializeAPI();
	}, []);

	useEffect(() => {
		if (currentAccount) {
			getBalanceAnnotation(currentAccount);
			getUserBalanceUSD(currentAccount);
			checkIsAdmin(currentAccount);
		} else {
			resetUserData();
		}
	}, [currentAccount]);

	useEffect(() => {
		if (apiState === API_STATE_READY && !isInitialized) {
			loadAccounts();
			getCurrencies();
			getWrappedCurrencies();
			setIsInitialized(true);
		}
	}, [apiState]);

	const updateWatcher = () => {
		if (currentAccount) {
			getBalanceAnnotation(currentAccount);
			getUserBalanceUSD(currentAccount);
		}
	};

	useInterval(updateWatcher, config.POOL_PERIOD_SEC * 1000);

	if (apiState === API_STATE_ERROR) return <MessageWrap />;
	else if (apiState !== API_STATE_READY)
		return <LoaderWrap text={'Connecting to Substrate'} />;

	if (keyringState !== KEYRING_STATE_READY) {
		return (
			<LoaderWrap
				text={"Loading accounts (please review any extension's authorization)"}
			/>
		);
	}

	//Important APP initialization step
	if (!wrappedCurrencies.length || !currencies.length) {
		return <LoaderWrap text={'Loading currencies'} />;
	}

	return (
		<div>
			<div>
				<Header
					api={api}
					keyring={keyring}
					account={currentAccount}
					userBalanceUSD={userBalanceUSD}
					onChange={setAccount}
					isCheckingAdmin={isAdminRequestRunning}
					balanceAnnotation={balanceAnnotation}
				/>
			</div>
			{children}
		</div>
	);
}

const mapStateToProps = (state: State) => ({
	api: state.substrate.api,
	apiState: state.substrate.apiState,
	keyringState: state.account.keyringState,
	userBalanceUSD: state.dashboardData.userBalanceUSD,
	keyring: state.account.keyring,
	currentAccount: state.account.currentAccount,
	isAdminRequestRunning: state.account.isAdminRequestRunning,
	balanceAnnotation: state.dashboardData.balanceAnnotation,
	currencies: state.protocolData.currencies,
	wrappedCurrencies: state.protocolData.wrappedCurrencies,
});

const mapDispatchToProps = {
	setAccount,
	getCurrencies,
	getWrappedCurrencies,
	loadAccounts,
	initializeAPI,
	checkIsAdmin,
	getBalanceAnnotation,
	resetUserData,
	getUserBalanceUSD,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
