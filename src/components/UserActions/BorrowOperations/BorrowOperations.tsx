import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, isValid } from 'redux-form';
import { Button } from 'semantic-ui-react';
import SendBorrow from '../../Forms/SendBorrow/SendBorrow';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import {
	BorrowOperationsProps,
	SendBorrowFormValues,
} from '../UserActions.types';
import { useAPIResponse, useDebounce, useStateCallback } from '../../../util';
import { State } from '../../../util/types';
import { OPERATIONS } from '../../../util/constants';
import {
	getOperationInfo,
	resetOperationInfo,
} from '../../../actions/dashboardData';
import './BorrowOperations.scss';
import { borrow } from '../../../actions/dashboardUpdates';
import FormActionInfoBlock from '../../Common/FormActionInfoBlock/FormActionInfoBlock';

function BorrowOperations(props: BorrowOperationsProps) {
	const {
		title = 'Borrow',
		defaultAssetId,
		info,
		loanToValueData,
		keyring,
		account,
		borrow,
		isBorrowResponseRunning,
		currenciesOptions,
		borrowResponse,
		underlyingAssetId,
		borrowAmount,
		operationInfo,
		getOperationInfo,
		resetOperationInfo,
		isFormValid,
		disableCurrencySelection = false,
	} = props;

	const [isModalOpen, setIsModalOpen] = useStateCallback(false);
	const [newLoanToValue, setNewLoanToValue] = useState<string>('');

	const isAccountReady = !!account;

	const handleSendBorrow = (form: SendBorrowFormValues) => {
		const { underlyingAssetId, borrowAmount } = form;
		borrow(keyring, account, underlyingAssetId, borrowAmount);
	};

	const closeModal = () => {
		setIsModalOpen(false, () => {
			resetOperationInfo();
		});
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const calculateNewLoanToValue = () => {
		if (!loanToValueData) return;
		const { borrowed, supplied, lockedPrice } = loanToValueData;
		if (!+supplied || !borrowAmount || !lockedPrice) {
			setNewLoanToValue('N/A');
		} else {
			const newValue = (
				(+supplied / (+borrowed + +borrowAmount * +lockedPrice)) *
				100
			).toFixed(2);
			setNewLoanToValue(newValue + ' %');
		}
	};

	const update = () => {
		if (account && isFormValid && isModalOpen) {
			getOperationInfo(account, OPERATIONS.BORROW, [
				underlyingAssetId,
				borrowAmount,
			]);
			calculateNewLoanToValue();
		}
	};

	// TODO refactoring ??
	const debouncedHandler = useCallback(useDebounce(update, 800), []);

	const showError = (message: string) => {
		alert(message);
	};

	useAPIResponse(
		[isBorrowResponseRunning, borrowResponse],
		closeModal,
		showError
	);

	useEffect(update, [isModalOpen]);

	useEffect(debouncedHandler, [underlyingAssetId, borrowAmount]);

	const initialValues = { underlyingAssetId: defaultAssetId };

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
				<SendBorrow
					// @ts-ignore
					onSubmit={handleSendBorrow}
					// @ts-ignore
					isLoading={isBorrowResponseRunning}
					isAccountReady={isAccountReady}
					currenciesOptions={currenciesOptions}
					onCancel={closeModal}
					initialValues={initialValues}
					formActionInfoBlock={
						<FormActionInfoBlock
							fee={operationInfo?.partialFee}
							newLoanToValue={newLoanToValue}
							info={info}
						/>
					}
					disableCurrencySelection={disableCurrencySelection}
				/>
			</ClientConfirmActionModal>
		</div>
	);
}

const selector = formValueSelector('borrow');

const mapStateToProps = (state: State) => ({
	underlyingAssetId: selector(state, 'underlyingAssetId'),
	borrowAmount: selector(state, 'borrowAmount'),
	operationInfo: state.dashboardData.operationInfo,
	isFormValid: isValid('borrow')(state),

	keyring: state.account.keyring,
	account: state.account.currentAccount,
	currenciesOptions: state.protocolData.currenciesOptions,
	isBorrowResponseRunning: state.dashboardUpdates.isBorrowResponseRunning,
	borrowResponse: state.dashboardUpdates.borrowResponse,
});

const mapDispatchToProps = {
	getOperationInfo,
	resetOperationInfo,
	borrow,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(BorrowOperations);
