import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, isValid } from 'redux-form';
import { Button } from 'semantic-ui-react';
import SendTransferWrapped from '../../Forms/SendTransferWrapped/SendTransferWrapped';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import {
	TransferWrappedProps,
	TransferWrappedFormValues,
} from '../UserActions.types';
import { useAPIResponse, useDebounce, useStateCallback } from '../../../util';
import { State } from '../../../util/types';
import { OPERATIONS } from '../../../util/constants';
import {
	getOperationInfo,
	resetOperationInfo,
} from '../../../actions/dashboardData';
import { transferWrapped } from '../../../actions/dashboardUpdates';
import './TransferWrapped.scss';

function TransferWrapped(props: TransferWrappedProps) {
	const {
		title = 'Transfer Wrapped',
		keyring,
		account,
		transferWrapped,
		isTransferWrappedResponseRunning,
		wrappedCurrenciesOptions,
		transferWrappedResponse,
		wrappedId,
		receiver,
		convertedAmount,
		operationInfo,
		getOperationInfo,
		resetOperationInfo,
		isFormValid,
	} = props;

	const [isModalOpen, setIsModalOpen] = useStateCallback(false);

	const isAccountReady = !!account;

	const handleSendTransferWrapped = (form: TransferWrappedFormValues) => {
		const { receiver, wrappedId, convertedAmount } = form;
		transferWrapped(keyring, account, receiver, wrappedId, convertedAmount);
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
			getOperationInfo(account, OPERATIONS.TRANSFER_WRAPPED, [
				receiver,
				wrappedId,
				convertedAmount,
			]);
		}
	};

	// TODO refactoring ??
	const debouncedHandler = useCallback(useDebounce(update, 800), []);

	useAPIResponse(
		[isTransferWrappedResponseRunning, transferWrappedResponse],
		closeModal
	);

	useEffect(debouncedHandler, [receiver, wrappedId, convertedAmount]);

	return (
		<div className='action-form'>
			<Button onClick={openModal} disabled={!isAccountReady} className='action'>
				{title}
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title={title}
				onClose={closeModal}
			>
				<SendTransferWrapped
					// @ts-ignore
					onSubmit={handleSendTransferWrapped}
					// @ts-ignore
					isLoading={isTransferWrappedResponseRunning}
					isAccountReady={!!account}
					wrappedCurrenciesOptions={wrappedCurrenciesOptions}
					onCancel={closeModal}
				/>
			</ClientConfirmActionModal>
		</div>
	);
}

const selector = formValueSelector('transferWrapped');

const mapStateToProps = (state: State) => ({
	keyring: state.account.keyring,
	account: state.account.currentAccount,
	wrappedCurrenciesOptions: state.protocolData.wrappedCurrenciesOptions,
	receiver: selector(state, 'receiver'),
	wrappedId: selector(state, 'wrappedId'),
	convertedAmount: selector(state, 'convertedAmount'),
	operationInfo: state.dashboardData.operationInfo,
	isFormValid: isValid('transferWrapped')(state),
	isTransferWrappedResponseRunning:
		state.dashboardUpdates.isTransferWrappedResponseRunning,
	transferWrappedResponse: state.dashboardUpdates.transferWrappedResponse,
});

const mapDispatchToProps = {
	transferWrapped,
	getOperationInfo,
	resetOperationInfo,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(TransferWrapped);
