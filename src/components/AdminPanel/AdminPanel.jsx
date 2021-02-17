import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AdminContentPool from './AdminContentPool/AdminContentPool';
import InsuranceDeposit from './InsuranceDeposit/InsuranceDeposit';
import InsuranceRedeem from './InsuranceRedeem/InsuranceRedeem';
import PoolOperationsStatuses from './PoolOperationsStatuses/PoolOperationsStatuses';
import PoolOperationsSwitch from './PoolOperationsSwitch/PoolOperationsSwitch';
import EconomicUpdateControls from './EconomicUpdateControls/EconomicUpdateControls';
import InsuranceFactor from './InsuranceFactor/InsuranceFactor';
import {
	setBaseRatePerBlock,
	setJumpMultiplierPerBlock,
	setKink,
	setMultiplierPerBlock,
} from '../../actions/economicUpdates';
import { setInsuranceFactor } from '../../actions/admin';

import classes from './AdminPanel.module.css';
import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';

function AdminPanel(props) {
	const {
		account,
		api,
		keyring,
		updateData,

		setKink,
		setKinkResponse,
		isSetKinkResponseRunning,

		setBaseRatePerBlock,
		setBaseRateBlockResponse,
		isSetBaseRateBlockResponseRunning,

		setJumpMultiplierPerBlock,
		setJumpMultiplierBlockResponse,
		isSetJumpMultiplierBlockResponseRunning,

		setMultiplierPerBlock,
		setMultiplierPerBlockResponse,
		isSetMultiplierPerBlockResponseRunning,

		setInsuranceFactor,
		setInsuranceFactorResponse,
		isSetInsuranceFactorResponseRunning,
	} = props;
	const [poolOperationData, setPoolOperationData] = useState([]);

	useEffect(() => {
		getPoolOperationStatuses();
	}, []);

	useEffect(() => {
		if (isSetBaseRateBlockResponseRunning || !setBaseRateBlockResponse) return;

		const { isError, errorMessage } = setBaseRateBlockResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			handleSuccess();
		}
	}, [setBaseRateBlockResponse, isSetBaseRateBlockResponseRunning]);

	useEffect(() => {
		if (
			isSetJumpMultiplierBlockResponseRunning ||
			!setJumpMultiplierBlockResponse
		)
			return;

		const { isError, errorMessage } = setJumpMultiplierBlockResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			handleSuccess();
		}
	}, [setJumpMultiplierBlockResponse, isSetJumpMultiplierBlockResponseRunning]);

	useEffect(() => {
		if (
			isSetMultiplierPerBlockResponseRunning ||
			!setMultiplierPerBlockResponse
		)
			return;

		const { isError, errorMessage } = setMultiplierPerBlockResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			handleSuccess();
		}
	}, [setMultiplierPerBlockResponse, isSetMultiplierPerBlockResponseRunning]);

	useEffect(() => {
		if (isSetKinkResponseRunning || !setKinkResponse) return;

		const { isError, errorMessage } = setKinkResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			handleSuccess();
		}
	}, [setKinkResponse, isSetKinkResponseRunning]);

	useEffect(() => {
		if (isSetInsuranceFactorResponseRunning || !setInsuranceFactorResponse)
			return;

		const { isError, errorMessage } = setInsuranceFactorResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			handleSuccess();
		}
	}, [setInsuranceFactorResponse, isSetInsuranceFactorResponseRunning]);

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
				<InsuranceDeposit account={account} updateData={updateData} />
				<InsuranceRedeem account={account} updateData={updateData} />
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
				isSetBaseRateBlockResponseRunning={isSetBaseRateBlockResponseRunning}
				isSetJumpMultiplierBlockResponseRunning={
					isSetJumpMultiplierBlockResponseRunning
				}
				isSetKinkResponseRunning={isSetKinkResponseRunning}
				isSetMultiplierPerBlockResponseRunning={
					isSetMultiplierPerBlockResponseRunning
				}
			/>
			<InsuranceFactor
				account={account}
				keyring={keyring}
				setInsuranceFactor={setInsuranceFactor}
				isSetInsuranceFactorResponseRunning={
					isSetInsuranceFactorResponseRunning
				}
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

	setInsuranceFactorResponse: state.admin.setInsuranceFactorResponse,
	isSetInsuranceFactorResponseRunning:
		state.admin.isSetInsuranceFactorResponseRunning,
});

const mapDispatchToProps = {
	setBaseRatePerBlock,
	setJumpMultiplierPerBlock,
	setKink,
	setMultiplierPerBlock,
	setInsuranceFactor,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
