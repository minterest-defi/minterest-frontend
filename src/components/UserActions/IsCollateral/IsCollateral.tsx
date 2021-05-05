import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import { useAPIResponse, useStateCallback } from '../../../util';
import { OperationInfo, State } from '../../../util/types';
import {
	disableIsCollateral,
	enableIsCollateral,
} from '../../../actions/dashboardUpdates';
import {
	getOperationInfo,
	resetOperationInfo,
} from '../../../actions/dashboardData';
import { OPERATIONS } from '../../../util/constants';
import classes from './IsCollateral.module.scss';
import IsCollateralModalContent from './IsCollateralModalContent/IsCollateralModalContent';

interface Props {
	currentAccount: string;
	keyring: any;
	currencyId: string;
	getOperationInfo: (
		account: string,
		operationType: string,
		params: any[]
	) => Promise<void>;
	resetOperationInfo: () => void;
	operationInfo: OperationInfo | null;
	isEnableAsCollateralResponseRunning: boolean;
	enableIsCollateralResponse: any;
	isDisableCollateralResponseRunning: boolean;
	disableIsCollateralResponse: any;
	isCollateralEnabled: boolean;

	disableIsCollateral: (
		account: string,
		keyring: any,
		poolId: string
	) => Promise<void>;
	enableIsCollateral: (
		account: string,
		keyring: any,
		poolId: string
	) => Promise<void>;
}

function IsCollateral(props: Props) {
	const {
		currentAccount,
		keyring,
		currencyId,
		getOperationInfo,
		resetOperationInfo,
		operationInfo,
		// TODO
		isCollateralEnabled,

		isEnableAsCollateralResponseRunning,
		enableIsCollateralResponse,
		isDisableCollateralResponseRunning,
		disableIsCollateralResponse,

		disableIsCollateral,
		enableIsCollateral,
	} = props;

	const [isModalOpen, setIsModalOpen] = useStateCallback(false);

	const isAccountReady = !!currentAccount;

	const [
		isCollateralButtonHover,
		setIsCollateralButtonHover,
	] = useState<boolean>(false);

	const handleSubmitCollateral = () => {
		if (isCollateralEnabled) {
			disableIsCollateral(currentAccount, keyring, currencyId);
		} else {
			enableIsCollateral(currentAccount, keyring, currencyId);
		}
	};

	const closeModal = () => {
		setIsModalOpen(false, () => {
			resetOperationInfo();
		});
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const onMouseEnter = () => {
		setIsCollateralButtonHover(true);
	};

	const onMouseLeave = () => {
		setIsCollateralButtonHover(false);
	};

	useEffect(() => {
		if (isModalOpen) {
			getOperationInfo(
				currentAccount,
				isCollateralEnabled
					? OPERATIONS.DISABLE_IS_COLLATERAL
					: OPERATIONS.ENABLE_IS_COLLATERAL,
				[currencyId]
			);
		}
	}, [isModalOpen]);

	const showErrorMessage = (message: string) => {
		alert(message);
	};

	useAPIResponse(
		[isEnableAsCollateralResponseRunning, enableIsCollateralResponse],
		closeModal,
		showErrorMessage
	);
	useAPIResponse(
		[isDisableCollateralResponseRunning, disableIsCollateralResponse],
		closeModal,
		showErrorMessage
	);

	let isCollateralActionText = '';
	let isCollateralActionColor: 'red' | 'green' = 'red';

	if (isCollateralButtonHover) {
		isCollateralActionText = isCollateralEnabled ? 'Disable' : 'Enable';
		isCollateralActionColor = isCollateralEnabled ? 'red' : 'green';
	} else {
		isCollateralActionText = isCollateralEnabled ? 'Enabled' : 'Disabled';
		isCollateralActionColor = isCollateralEnabled ? 'green' : 'red';
	}

	const isCollateralTitleText = isCollateralEnabled
		? `Disable use of ${currencyId} as collateral`
		: `Enable use of ${currencyId} as collateral`;

	return (
		<div className={classes.btnWrapper}>
			<Button
				className={classes.isCollateralButton}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onClick={openModal}
				color={isCollateralActionColor}
			>
				{isCollateralActionText}
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title={isCollateralTitleText}
				onClose={closeModal}
			>
				<IsCollateralModalContent
					onSubmit={handleSubmitCollateral}
					isLoading={
						isEnableAsCollateralResponseRunning ||
						isDisableCollateralResponseRunning
					}
					fee={operationInfo?.partialFee}
					isAccountReady={isAccountReady}
					onCancel={closeModal}
				/>
			</ClientConfirmActionModal>
		</div>
	);
}

const mapStateToProps = (state: State) => ({
	currentAccount: state.account.currentAccount,
	keyring: state.account.keyring,
	operationInfo: state.dashboardData.operationInfo,

	isEnableAsCollateralResponseRunning:
		state.dashboardUpdates.isEnableAsCollateralResponseRunning,
	enableIsCollateralResponse: state.dashboardUpdates.enableIsCollateralResponse,
	isDisableCollateralResponseRunning:
		state.dashboardUpdates.isDisableCollateralResponseRunning,
	disableIsCollateralResponse:
		state.dashboardUpdates.disableIsCollateralResponse,
});

const mapDispatchToProps = {
	disableIsCollateral,
	enableIsCollateral,
	getOperationInfo,
	resetOperationInfo,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(IsCollateral);
