import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout/MainLayout';
import TabWrapper from './containers/TabWrapper/TabWrapper';
import Asset from './containers/Asset/Asset';
import Assets from './containers/Assets/Assets';

export default function AppRouter() {
	return (
		<BrowserRouter>
			<MainLayout>
				<Switch>
					<Route path='/' exact>
						<Assets />
					</Route>
					<Route path='/asset/:assetId' exact>
						<Asset />
					</Route>
					<Route path='/admin' exact>
						<TabWrapper />
					</Route>
					<Route>404</Route>
				</Switch>
			</MainLayout>
		</BrowserRouter>
	);
}
