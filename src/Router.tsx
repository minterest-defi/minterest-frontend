import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout/MainLayout';
import TabWrapper from './containers/TabWrapper/TabWrapper';
import Asset from './containers/Asset/Asset';
import Assets from './containers/Assets/Assets';
import GovernanceProposal from './containers/GovernanceProposal/GovernanceProposal';

export default function AppRouter() {
	return (
		<BrowserRouter>
			<MainLayout>
				<Switch>
					<Route path='/' exact>
						{/*@ts-ignore*/}
						<Assets />
					</Route>
					<Route path='/asset/:assetId' exact>
						{/*@ts-ignore*/}
						<Asset />
					</Route>
					<Route path='/admin_view' exact>
						<TabWrapper />
					</Route>
					<Route path='/governance-proposal/:proposalHash' exact>
						{/*@ts-ignore*/}
						<GovernanceProposal />
					</Route>
					<Route>404</Route>
				</Switch>
			</MainLayout>
		</BrowserRouter>
	);
}
