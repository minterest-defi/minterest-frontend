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
import {
	OPERATIONS,
	SAFE_OVERSUPPLY_LIMIT,
	MESSAGE_NEW_LOAN_VALUE_WARNING,
	EMPTY_VALUE,
} from '../../../util/constants';
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
		availableToBorrow,
	} = props;

	const [isModalOpen, setIsModalOpen] = useStateCallback(false);
	const [oversupply, setOversupply] = useState<string>('');
	const [newLoanValue, setNewLoanValue] = useState<string>('');

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

	const calculateOversupply = () => {
		if (!loanToValueData) return;
		const { totalBorrowed, totalCollateral, lockedPrice } = loanToValueData;
		if (!+totalCollateral || !borrowAmount || !lockedPrice) {
			setOversupply(EMPTY_VALUE);
			return;
		}
		const newValue = (
			(+totalCollateral / (+totalBorrowed + +borrowAmount * +lockedPrice)) *
			100
		).toFixed(2);
		setOversupply(newValue + '%');
	};

	const calculateNewLoanValue = () => {
		if (!loanToValueData) return;
		const { totalBorrowed, totalCollateral, lockedPrice } = loanToValueData;
		if (!totalCollateral && !loanToValueData) return;
		if (!borrowAmount || !totalCollateral) {
			const newValue = (+totalBorrowed).toFixed(2);
			setNewLoanValue(newValue);
		} else {
			const newValue = (+totalBorrowed + +borrowAmount * +lockedPrice).toFixed(
				2
			);
			setNewLoanValue(newValue);
		}
	};

	const calculateCurrentOversupply = () => {
		if (!loanToValueData) return EMPTY_VALUE;
		const { totalBorrowed, totalCollateral } = loanToValueData;
		if (+totalCollateral && +totalBorrowed) {
			return (
				(
					(+loanToValueData.totalCollateral / +loanToValueData.totalBorrowed) *
					100
				).toFixed(2) + '%'
			);
		}
		return EMPTY_VALUE;
	};

	const calculateSafeLoanValue = () => {
		if (!loanToValueData) return 0;
		const { totalCollateral } = loanToValueData;
		if (+totalCollateral) {
			return (
				(+loanToValueData.totalCollateral / 100) *
				SAFE_OVERSUPPLY_LIMIT
			).toFixed(2);
		}
		return 0;
	};

	const update = () => {
		if (account && isFormValid && isModalOpen) {
			getOperationInfo(account, OPERATIONS.BORROW, [
				underlyingAssetId,
				borrowAmount,
			]);
		}
		calculateOversupply();
		calculateNewLoanValue();
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

	const currentOversupply = calculateCurrentOversupply();

	const safeLoanValue = calculateSafeLoanValue();

	const isNewLoanValueWarning = +newLoanValue > +safeLoanValue;

	const newInfo = info ? [...info] : [];
	newInfo.push({
		label: 'New Loan Value:',
		value: newLoanValue ? newLoanValue + '$' : EMPTY_VALUE,
		isWarning: isNewLoanValueWarning,
	});

	newInfo.push({
		label: 'Oversupply:',
		value:
			borrowAmount && oversupply !== EMPTY_VALUE
				? oversupply
				: currentOversupply,
		isWarning: isNewLoanValueWarning,
	});

	return (
		<div className='action-form'>
			<Button onClick={openModal} disabled={!isAccountReady} className='action'>
				Borrow
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title={title}
				onClose={closeModal}
			>
				<React.Fragment>
					{isNewLoanValueWarning && (
						<div className='message-warning'>
							{MESSAGE_NEW_LOAN_VALUE_WARNING}
						</div>
					)}
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
								info={newInfo}
							/>
						}
						disableCurrencySelection={disableCurrencySelection}
						availableToBorrow={availableToBorrow}
					/>
				</React.Fragment>
			</ClientConfirmActionModal>
		</div>
	);
}

const selector = formValueSelector('borrow');

const mapStateToProps = (state: State) => ({
	underlyingAssetId: selector(state, 'underlyingAssetId'),
	borrowAmount: selector(state, 'borrowAmount'),
	isFormValid: isValid('borrow')(state),

	keyring: state.account.keyring,
	account: state.account.currentAccount,
	operationInfo: state.dashboardData.operationInfo,
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
