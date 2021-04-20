import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, isValid } from 'redux-form';
import { Button } from 'semantic-ui-react';
import SendDepositUnderlying from '../../Forms/SendDepositUnderlying/SendDepositUnderlying';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import {
	DepositOperationsProps,
	DepositUnderlyingFormValues,
} from '../UserActions.types';
import { useAPIResponse, useDebounce, useStateCallback } from '../../../util';
import './DepositOperations.scss';
import { State } from '../../../util/types';
import { OPERATIONS } from '../../../util/constants';
import {
	getOperationInfo,
	resetOperationInfo,
} from '../../../actions/dashboardData';
import { depositUnderlying } from '../../../actions/dashboardUpdates';

function DepositOperations(props: DepositOperationsProps) {
	const {
		title = 'Deposit Underlying',
		keyring,
		account,
		currenciesOptions,
		depositUnderlying,
		isDepositUnderlyingResponseRunning,
		depositUnderlyingResponse,
		underlyingAssetId,
		underlyingAmount,
		operationInfo,
		getOperationInfo,
		resetOperationInfo,
		isFormValid,
	} = props;
	const [isModalOpen, setIsModalOpen] = useStateCallback(false);

	const isAccountReady = !!account;

	const handleSendDepositUnderlying = (form: DepositUnderlyingFormValues) => {
		const { underlyingAssetId, underlyingAmount } = form;
		depositUnderlying(keyring, account, underlyingAssetId, underlyingAmount);
	};
	const closeModal = () => {
		setIsModalOpen(false, () => {
			resetOperationInfo();
		});
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const update = () => {
		if (account && isFormValid && isModalOpen) {
			getOperationInfo(account, OPERATIONS.DEPOSIT_UNDERLYING, [
				underlyingAssetId,
				underlyingAmount,
			]);
		}
	};

	// TODO refactoring ??
	const debouncedHandler = useCallback(useDebounce(update, 800), []);

	useAPIResponse(
		[isDepositUnderlyingResponseRunning, depositUnderlyingResponse],
		closeModal
	);

	useEffect(debouncedHandler, [underlyingAssetId, underlyingAmount]);

	return (
		<div className='action'>
			<Button
				onClick={openModal}
				disabled={!isAccountReady}
				className='action-btn'
			>
				{title}
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title={title}
				onClose={closeModal}
				fee={operationInfo?.partialFee}
			>
				<SendDepositUnderlying
					// @ts-ignore
					onSubmit={handleSendDepositUnderlying}
					// @ts-ignore
					isLoading={isDepositUnderlyingResponseRunning}
					isAccountReady={isAccountReady}
					currenciesOptions={currenciesOptions}
					onCancel={closeModal}
				/>
			</ClientConfirmActionModal>
		</div>
	);
}

const selector = formValueSelector('depositUnderlying');

const mapStateToProps = (state: State) => ({
	keyring: state.account.keyring,
	account: state.account.currentAccount,
	currenciesOptions: state.protocolData.currenciesOptions,
	underlyingAssetId: selector(state, 'underlyingAssetId'),
	underlyingAmount: selector(state, 'underlyingAmount'),
	operationInfo: state.dashboardData.operationInfo,
	isFormValid: isValid('depositUnderlying')(state),
	isDepositUnderlyingResponseRunning:
		state.dashboardUpdates.isDepositUnderlyingResponseRunning,
	depositUnderlyingResponse: state.dashboardUpdates.depositUnderlyingResponse,
});

const mapDispatchToProps = {
	depositUnderlying,
	getOperationInfo,
	resetOperationInfo,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(DepositOperations);
