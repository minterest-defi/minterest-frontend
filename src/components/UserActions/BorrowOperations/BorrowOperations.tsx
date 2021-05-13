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
import {
	calculateSafeOverSupplyUSD,
	calculateNewBorrowBalance,
	calculateCurrentBorrowLimitUsed,
	calculateNewBorrowLimitUsedBorrow,
} from '../../../util/calculations';

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

	const calculateNewLoanValue = () => {
		if (!loanToValueData) return;
		const { totalBorrowed, realPrice } = loanToValueData;
		let amount = borrowAmount ? +borrowAmount : 0;
		const newValue = (+totalBorrowed + +amount * +realPrice).toFixed(2);
		setNewLoanValue(newValue);
	};

	const calculateSafeLoanValue = () => {
		if (!loanToValueData) return 0;
		const { totalCollateral } = loanToValueData;
		if (+totalCollateral) {
			return calculateSafeOverSupplyUSD(+totalCollateral).toFixed(2);
		}
		return 0;
	};

	const calculateCurrentBorrowBalance = () => {
		if (!loanToValueData) return 0;
		const { totalBorrowed } = loanToValueData;
		return +totalBorrowed;
	};

	const currentBorrowBalance = calculateCurrentBorrowBalance();

	const calculateNewBorrowBalanceU = () => {
		if (!loanToValueData) return EMPTY_VALUE;
		const { realPrice, isCollateralEnabled, totalBorrowed } = loanToValueData;
		const amountUSD = borrowAmount ? +borrowAmount * +realPrice : 0;
		return calculateNewBorrowBalance(
			+totalBorrowed,
			amountUSD,
			isCollateralEnabled
		).toFixed(2);
	};

	const newBorrowBalance = calculateNewBorrowBalanceU();

	const calculateCurrentBorrowLimitU = () => {
		if (!loanToValueData) return EMPTY_VALUE;
		const { totalBorrowed, totalCollateral } = loanToValueData;
		return calculateCurrentBorrowLimitUsed(
			+totalBorrowed,
			+totalCollateral
		).toFixed(2);
	};

	const currentBorrowLimitUsed = calculateCurrentBorrowLimitU();

	const calculateNewBorrowLimitU = () => {
		if (!loanToValueData) return EMPTY_VALUE;
		const {
			realPrice,
			isCollateralEnabled,
			totalBorrowed,
			totalCollateral,
		} = loanToValueData;
		const amountUSD = borrowAmount ? +borrowAmount * +realPrice : 0;
		return calculateNewBorrowLimitUsedBorrow(
			+currentBorrowLimitUsed,
			+totalBorrowed,
			+totalCollateral,
			amountUSD,
			isCollateralEnabled
		).toFixed(2);
	};

	const newBorrowLimitUsed = calculateNewBorrowLimitU();

	const update = () => {
		if (account && isFormValid && isModalOpen) {
			getOperationInfo(account, OPERATIONS.BORROW, [
				underlyingAssetId,
				borrowAmount,
			]);
		}
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

	const safeLoanValue = calculateSafeLoanValue();

	const isNewLoanValueWarning = +newLoanValue > +safeLoanValue;

	const newInfo = info ? [...info] : [];

	const borrowBalance =
		// @ts-ignore
		newBorrowBalance && !isNaN(+borrowAmount)
			? `${currentBorrowBalance.toFixed(2)} $ -> ${newBorrowBalance} $`
			: currentBorrowBalance.toFixed(2) + ' $';

	const borrowLimitUsed =
		// @ts-ignore
		newBorrowLimitUsed && !isNaN(+borrowAmount)
			? `${currentBorrowLimitUsed} % -> ${newBorrowLimitUsed} %`
			: currentBorrowLimitUsed + ' %';

	newInfo.push({
		label: 'Borrow Balance:',
		value: borrowBalance,
		isWarning: isNewLoanValueWarning,
	});

	newInfo.push({
		label: 'Borrow Limit Used:',
		value: borrowLimitUsed,
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
