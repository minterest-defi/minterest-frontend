import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AdminContentPool from './AdminContentPool/AdminContentPool';
import InsuranceDeposit from './InsuranceDeposit/InsuranceDeposit';
import InsuranceRedeem from './InsuranceRedeem/InsuranceRedeem';
import PoolOperationsStatuses from './PoolOperationsStatuses/PoolOperationsStatuses';
import PoolOperationsSwitch from './PoolOperationsSwitch/PoolOperationsSwitch';

import classes from './AdminPanel.module.css';
import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';

function AdminPanel(props) {
	const { account, updateData, api, keyring } = props;
	const [poolOperationData, setPoolOperationData] = useState([]);

	useEffect(() => {
		getPoolOperationStatuses();
	}, []);

	const getPoolOperationStatuses = async () => {
		const poolOperationData = await Promise.all(
			UNDERLYING_ASSETS_TYPES.map((assert) => {
				return api.query.controller.pauseKeepers(assert);
			})
		);
		setPoolOperationData(poolOperationData);
	};

	return (
		<div className={classes.admin_panel}>
			<div className={classes.switch}>
				<PoolOperationsSwitch
					getPoolOperationStatuses={getPoolOperationStatuses}
					account={account}
					keyring={keyring}
					api={api}
				/>
				<PoolOperationsStatuses poolOperationData={poolOperationData} />
			</div>
			<fieldset className={classes.fieldset}>
				<legend>Insurance operations</legend>
				<InsuranceDeposit account={account} updateData={updateData} />
				<InsuranceRedeem account={account} updateData={updateData} />
			</fieldset>
			<div className={classes.content}>
				<AdminContentPool />
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	api: state.substrate.api,
	keyring: state.account.keyring,
});

export default connect(mapStateToProps, null)(AdminPanel);
