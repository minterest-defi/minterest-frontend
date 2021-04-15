import React from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { State } from '../../util/types';
import MainPage from '../../containers/Main/Main';
import ProtocolAdmin from '../../containers/ProtocolAdmin/ProtocolAdmin';
import LiquidationAdmin from '../../containers/LiquidationAdmin/LiquidationAdmin';

interface Props {
	isAdmin?: boolean;
}

function TabWrapper(props: Props) {
	const { isAdmin } = props;

	const panes = [
		{
			menuItem: 'Dashboard',
			render: () => (
				<Tab.Pane>
					{/* @ts-ignore*/}
					<MainPage />
				</Tab.Pane>
			),
		},
	];

	if (isAdmin) {
		panes.push(
			{
				menuItem: 'Protocol Admin',
				render: () => (
					<Tab.Pane>
						{/* @ts-ignore*/}
						<ProtocolAdmin />
					</Tab.Pane>
				),
			},
			{
				menuItem: 'Liquidation Admin',
				render: () => (
					<Tab.Pane>
						{/* @ts-ignore*/}
						<LiquidationAdmin />
					</Tab.Pane>
				),
			}
		);
	}

	return <Tab panes={panes} />;
}

const mapStateToProps = (state: State) => ({
	isAdmin: state.account.isAdmin,
});

export default connect(mapStateToProps, null)(TabWrapper);
