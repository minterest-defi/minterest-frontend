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
import {
	toLocale,
	useAPIResponse,
	useDebounce,
	useStateCallback,
} from '../../../util';
import './DepositOperations.scss';
import { State } from '../../../util/types';
import { OPERATIONS, EMPTY_VALUE } from '../../../util/constants';
import {
	getOperationInfo,
	resetOperationInfo,
} from '../../../actions/dashboardData';
import { depositUnderlying } from '../../../actions/dashboardUpdates';
import FormActionInfoBlock from '../../Common/FormActionInfoBlock/FormActionInfoBlock';
import {
	calculateNewBorrowLimitSupply,
	calculateCurrentBorrowLimitUsed,
	calculateNewBorrowLimitUsed,
} from '../../../util/calculations';

function DepositOperations(props: DepositOperationsProps) {
	const {
		title = 'Deposit Underlying',
		defaultAssetId,
		info,
		loanToValueData,
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
		disableCurrencySelection = false,
		walletBalance,
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

	const showError = (message: string) => {
		alert(message);
	};

	const calculateNewBorrowLimit = () => {
		if (!loanToValueData) return EMPTY_VALUE;

		const {
			realPrice,
			currentBorrowLimit,
			collateralFactor,
			isCollateralEnabled,
		} = loanToValueData;
		const amountUSD = underlyingAmount ? +underlyingAmount * +realPrice : 0;
		return calculateNewBorrowLimitSupply(
			+currentBorrowLimit,
			amountUSD,
			+collateralFactor,
			isCollateralEnabled
		).toFixed(2);
	};

	const newBorrowLimit = calculateNewBorrowLimit();

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
			collateralFactor,
			isCollateralEnabled,
			totalBorrowed,
			totalCollateral,
		} = loanToValueData;
		const amountUSD = underlyingAmount ? +underlyingAmount * +realPrice : 0;
		return calculateNewBorrowLimitUsed(
			+currentBorrowLimitUsed,
			+totalBorrowed,
			+totalCollateral,
			amountUSD,
			+collateralFactor,
			isCollateralEnabled
		).toFixed(2);
	};

	const getBorrowLimit = () => {
		if (!loanToValueData) return '0';
		const { currentBorrowLimit } = loanToValueData;

		// @ts-ignore
		return newBorrowLimit && !isNaN(+underlyingAmount)
			? `${toLocale(+currentBorrowLimit.toFixed(2))} $ -> ${toLocale(
					+newBorrowLimit
			  )} $`
			: toLocale(+currentBorrowLimit.toFixed(2)) + ' $';
	};

	const newBorrowLimitUsed = calculateNewBorrowLimitU();

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
		closeModal,
		showError
	);

	useEffect(debouncedHandler, [underlyingAssetId, underlyingAmount]);
	useEffect(update, [isModalOpen]);

	const initialValues = { underlyingAssetId: defaultAssetId };

	const newInfo = info ? [...info] : [];

	const borrowLimit = getBorrowLimit();

	const borrowLimitUsed =
		// @ts-ignore
		newBorrowLimitUsed && !isNaN(+underlyingAmount)
			? `${currentBorrowLimitUsed} % -> ${newBorrowLimitUsed} %`
			: currentBorrowLimitUsed + ' %';

	newInfo.push({
		label: 'Borrow Limit',
		value: borrowLimit,
	});

	newInfo.push({
		label: 'Borrow Limit Used',
		value: borrowLimitUsed,
	});

	return (
		<div className='action-form'>
			<Button onClick={openModal} disabled={!isAccountReady} className='action'>
				Supply
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title={title}
				onClose={closeModal}
			>
				<SendDepositUnderlying
					// @ts-ignore
					onSubmit={handleSendDepositUnderlying}
					// @ts-ignore
					isLoading={isDepositUnderlyingResponseRunning}
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
					walletBalance={walletBalance}
					disableCurrencySelection={disableCurrencySelection}
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
