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
import classes from './TransferWrapped.module.scss';

function TransferWrapped(props: TransferWrappedProps) {
	const {
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
		<div className={classes.btnWrapper}>
			<Button
				onClick={openModal}
				color={isAccountReady ? 'green' : 'red'}
				disabled={!isAccountReady}
			>
				Transfer Wrapped
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title='Transfer Wrapped'
				onClose={closeModal}
				fee={operationInfo?.partialFee}
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
	receiver: selector(state, 'receiver'),
	wrappedId: selector(state, 'wrappedId'),
	convertedAmount: selector(state, 'convertedAmount'),
	operationInfo: state.dashboardData.operationInfo,
	isFormValid: isValid('transferWrapped')(state),
});

const mapDispatchToProps = {
	getOperationInfo,
	resetOperationInfo,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(TransferWrapped);
