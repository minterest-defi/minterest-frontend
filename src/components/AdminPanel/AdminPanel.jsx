import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AdminContentPool from './AdminContentPool/AdminContentPool';
import PoolOperationsStatuses from './PoolOperationsStatuses/PoolOperationsStatuses';
import PoolOperationsSwitch from './PoolOperationsSwitch/PoolOperationsSwitch';
import EconomicUpdateControls from './EconomicUpdateControls/EconomicUpdateControls';
import InsuranceFactor from './InsuranceFactor/InsuranceFactor';
import {
	setBaseRatePerBlock,
	setJumpMultiplierPerBlock,
	setKink,
	setMultiplierPerBlock,
	resetEconomicUpdateRequests,
} from '../../actions/economicUpdates';
import {
	setInsuranceFactor,
	resetInsuranceFactorRequests,
	depositInsurance,
	redeemInsurance,
} from '../../actions/admin';

import DepositInsurance from './DepositInsurance/DepositInsurance';
import RedeemInsurance from './RedeemInsurance/RedeemInsurance';

import classes from './AdminPanel.module.css';
import { UNDERLYING_ASSETS_TYPES } from '../../util/constants';

function AdminPanel(props) {
	const {
		account,
		api,
		keyring,
		updateData,

		resetEconomicUpdateRequests,
		resetInsuranceFactorRequests,

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

		depositInsurance,
		depositInsuranceResponse,
		isDepositInsuranceResponseRunning,

		redeemInsurance,
		redeemInsuranceResponse,
		isRedeemInsuranceResponseRunning,
	} = props;
	const [poolOperationData, setPoolOperationData] = useState([]);

	useEffect(() => {
		getPoolOperationStatuses();

		return () => {
			resetEconomicUpdateRequests();
			resetInsuranceFactorRequests();
		};
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

	useEffect(() => {
		if (isDepositInsuranceResponseRunning || !depositInsuranceResponse) return;

		const { isError, errorMessage } = depositInsuranceResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			handleSuccess();
		}
	}, [depositInsuranceResponse, isDepositInsuranceResponseRunning]);

	useEffect(() => {
		if (isRedeemInsuranceResponseRunning || !redeemInsuranceResponse) return;

		const { isError, errorMessage } = redeemInsuranceResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			handleSuccess();
		}
	}, [redeemInsuranceResponse, isRedeemInsuranceResponseRunning]);

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
				<DepositInsurance
					account={account}
					api={api}
					keyring={keyring}
					depositInsurance={depositInsurance}
					isDepositInsuranceResponseRunning={isDepositInsuranceResponseRunning}
					updateData={updateData}
				/>
				<RedeemInsurance
					account={account}
					api={api}
					keyring={keyring}
					redeemInsurance={redeemInsurance}
					isRedeemInsuranceResponseRunning={isRedeemInsuranceResponseRunning}
					updateData={updateData}
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

	depositInsuranceResponse: state.admin.depositInsuranceResponse,
	isDepositInsuranceResponseRunning:
		state.admin.isDepositInsuranceResponseRunning,

	redeemInsuranceResponse: state.admin.redeemInsuranceResponse,
	isRedeemInsuranceResponseRunning:
		state.admin.isRedeemInsuranceResponseRunning,
});

const mapDispatchToProps = {
	setBaseRatePerBlock,
	setJumpMultiplierPerBlock,
	setKink,
	setMultiplierPerBlock,
	setInsuranceFactor,
	resetEconomicUpdateRequests,
	resetInsuranceFactorRequests,
	depositInsurance,
	redeemInsurance,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
