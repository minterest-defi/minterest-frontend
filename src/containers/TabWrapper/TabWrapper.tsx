import React from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { State } from '../../util/types';
import ProtocolAdmin from '../../containers/ProtocolAdmin/ProtocolAdmin';
import LiquidationAdmin from '../../containers/LiquidationAdmin/LiquidationAdmin';
import Governance from '../Governance/Governance';

interface Props {
	isAdmin?: boolean;
}

function TabWrapper(props: Props) {
	const { isAdmin } = props;

	const panes = [
		{
			menuItem: 'Governance',
			render: () => (
				<Tab.Pane>
					{/* @ts-ignore*/}
					<Governance />
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
