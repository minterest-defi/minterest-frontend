import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AdminContentPool from './AdminContentPool/AdminContentPool';
import InsuranceDeposit from './InsuranceDeposit/InsuranceDeposit';
import InsuranceRedeem from './InsuranceRedeem/InsuranceRedeem';
import PoolOperationsStatuses from './PoolOperationsStatuses/PoolOperationsStatuses';
import PoolOperationsSwitch from './PoolOperationsSwitch/PoolOperationsSwitch';
import EconomicUpdateControls from './EconomicUpdateControls/EconomicUpdateControls';
import {
	setBaseRatePerBlock,
	setJumpMultiplierPerBlock,
	setKink,
	setMultiplierPerBlock,
} from '../../actions/economicUpdates';

import classes from './AdminPanel.module.css';
import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';

function AdminPanel(props) {
	const {
		account,
		setStateStale,
		stateStale,
		api,
		keyring,
		setKink,
		setKinkResponse,
		isSetKinkResponseRunning,

		setBaseRatePerBlock,
		// setBaseRatePerBlockResponse,
		// isSetBaseRatePerBlockResponseRunning,

		setJumpMultiplierPerBlock,
		// setJumpMultiplierPerBlockResponse,
		// isSetJumpMultiplierPerBlockResponseRunning,

		setMultiplierPerBlock,
		// setMultiplierPerBlockResponse,
		// isSetMultiplierPerBlockResponseRunning,
	} = props;
	const [poolOperationData, setPoolOperationData] = useState([]);

	useEffect(() => {
		getPoolOperationStatuses();
	}, []);

	// useEffect(() => {
	// 	if (isSetKinkResponseRunning || !setKinkResponse) return;
	//
	// 	const { isError, errorMessage } = setKinkResponse;
	//
	// 	if (isError) {
	// 		handleError(errorMessage);
	// 	} else {
	// 		handleSuccess();
	// 	}
	// }, [setKinkResponse, isSetKinkResponseRunning]);
	//
	// useEffect(() => {
	// 	if (isSetKinkResponseRunning || !setKinkResponse) return;
	//
	// 	const { isError, errorMessage } = setKinkResponse;
	//
	// 	if (isError) {
	// 		handleError(errorMessage);
	// 	} else {
	// 		handleSuccess();
	// 	}
	// }, [setKinkResponse, isSetKinkResponseRunning]);
	//
	// useEffect(() => {
	// 	if (isSetKinkResponseRunning || !setKinkResponse) return;
	//
	// 	const { isError, errorMessage } = setKinkResponse;
	//
	// 	if (isError) {
	// 		handleError(errorMessage);
	// 	} else {
	// 		handleSuccess();
	// 	}
	// }, [setKinkResponse, isSetKinkResponseRunning]);

	useEffect(() => {
		if (isSetKinkResponseRunning || !setKinkResponse) return;

		const { isError, errorMessage } = setKinkResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			handleSuccess();
		}
	}, [setKinkResponse, isSetKinkResponseRunning]);

	const getPoolOperationStatuses = async () => {
		const poolOperationData = await Promise.all(
			UNDERLYING_ASSETS_TYPES.map((assert) => {
				return api.query.controller.pauseKeepers(assert);
			})
		);
		setPoolOperationData(poolOperationData);
	};

	const handleError = (errorMessage) => alert(errorMessage);
	const handleSuccess = () => alert('Transaction completed successfully.');

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
				<InsuranceDeposit
					account={account}
					setStateStale={setStateStale}
					stateStale={stateStale}
				/>
				<InsuranceRedeem
					account={account}
					setStateStale={setStateStale}
					stateStale={stateStale}
				/>
			</fieldset>
			<div className={classes.content}>
				<AdminContentPool />
			</div>
			<EconomicUpdateControls
				account={account}
				keyring={keyring}
				setBaseRatePerBlock={setBaseRatePerBlock}
				setJumpMultiplierPerBlock={setJumpMultiplierPerBlock}
				setKink={setKink}
				setMultiplierPerBlock={setMultiplierPerBlock}
			/>
		</div>
	);
}

const mapStateToProps = (state) => ({
	api: state.substrate.api,
	keyring: state.account.keyring,

	isSetBaseRateBlockResponseRunning:
		state.economicUpdates.isSetBaseRateBlockResponseRunning,
	setBaseRateBlockResponse: state.economicUpdates.setBaseRateBlockResponse,

	isSetJumpMultiplierBlockResponseRunning:
		state.economicUpdates.isSetJumpMultiplierBlockResponseRunning,
	setJumpMultiplierBlockResponse:
		state.economicUpdates.setJumpMultiplierBlockResponse,

	isSetKinkResponseRunning: state.economicUpdates.isSetKinkResponseRunning,
	setKinkResponse: state.economicUpdates.setKinkResponse,

	isSetMultiplierPerBlockResponseRunning:
		state.economicUpdates.isSetMultiplierPerBlockResponseRunning,
	setMultiplierPerBlockResponse:
		state.economicUpdates.setMultiplierPerBlockResponse,
});

const mapDispatchToProps = {
	setBaseRatePerBlock,
	setJumpMultiplierPerBlock,
	setKink,
	setMultiplierPerBlock,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
