import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, isValid } from 'redux-form';
import { Button } from 'semantic-ui-react';
import SendRepay from '../../Forms/SendRepay/SendRepay';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import { RepayProps, RepayFormValues } from '../UserActions.types';
import {
	toLocale,
	useAPIResponse,
	useDebounce,
	useStateCallback,
} from '../../../util';
import { State } from '../../../util/types';
import { OPERATIONS, EMPTY_VALUE } from '../../../util/constants';
import {
	getOperationInfo,
	resetOperationInfo,
} from '../../../actions/dashboardData';
import './Repay.scss';
import { repay, repayAll } from '../../../actions/dashboardUpdates';
import FormActionInfoBlock from '../../Common/FormActionInfoBlock/FormActionInfoBlock';
import {
	calculateNewBorrowBalanceRepay,
	calculateCurrentBorrowLimitUsed,
	calculateNewBorrowLimitUsedRepay,
} from '../../../util/calculations';

function Repay(props: RepayProps) {
	const {
		title = 'Repay',
		defaultAssetId,
		info,
		loanToValueData,
		keyring,
		account,
		repay,
		isRepayResponseRunning,
		currenciesOptions,
		repayResponse,
		underlyingAssetId,
		repayAmount,
		operationInfo,
		getOperationInfo,
		resetOperationInfo,
		isFormValid,
		repayAll,
		repayAllResponse,
		isRepayAllResponseRunning,
		handleAll,
		disableCurrencySelection = false,
		userBorrowPerAsset,
	} = props;

	const [isModalOpen, setIsModalOpen] = useStateCallback(false);

	const isAccountReady = !!account;

	const handleSendRepay = (form: RepayFormValues) => {
		const { underlyingAssetId, repayAmount, handleAll } = form;
		if (!account) return;

		if (handleAll) {
			repayAll(keyring, account, underlyingAssetId);
		} else {
			repay(keyring, account, underlyingAssetId, repayAmount);
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

	const calculateCurrentBorrowBalance = () => {
		if (!loanToValueData) return 0;
		const { totalBorrowed } = loanToValueData;
		return +totalBorrowed;
	};

	const currentBorrowBalance = calculateCurrentBorrowBalance();

	const calculateNewBorrowBalanceU = () => {
		if (!loanToValueData) return EMPTY_VALUE;
		const { realPrice, totalBorrowed } = loanToValueData;
		const amountUSD = repayAmount ? +repayAmount * +realPrice : 0;
		return calculateNewBorrowBalanceRepay(+totalBorrowed, amountUSD).toFixed(2);
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
		const { realPrice, totalBorrowed, totalCollateral } = loanToValueData;
		const amountUSD = repayAmount ? +repayAmount * +realPrice : 0;
		return calculateNewBorrowLimitUsedRepay(
			+currentBorrowLimitUsed,
			+totalBorrowed,
			+totalCollateral,
			amountUSD
		).toFixed(2);
	};

	const newBorrowLimitUsed = calculateNewBorrowLimitU();

	const update = () => {
		if (account && isFormValid && isModalOpen) {
			if (handleAll) {
				getOperationInfo(account, OPERATIONS.REPAY_ALL, [underlyingAssetId]);
			} else {
				getOperationInfo(account, OPERATIONS.REPAY, [
					underlyingAssetId,
					repayAmount,
				]);
			}
		}
	};

	// TODO refactoring ??
	const debouncedHandler = useCallback(useDebounce(update, 800), []);

	const showError = (message: string) => {
		alert(message);
	};

	useAPIResponse(
		[isRepayResponseRunning, repayResponse],
		closeModal,
		showError
	);

	useAPIResponse(
		[isRepayAllResponseRunning, repayAllResponse],
		closeModal,
		showError
	);

	useEffect(update, [isModalOpen]);

	useEffect(debouncedHandler, [underlyingAssetId, repayAmount, handleAll]);

	const initialValues = { underlyingAssetId: defaultAssetId };
	const newInfo = info ? [...info] : [];

	const borrowBalance =
		// @ts-ignore
		newBorrowBalance && !isNaN(+repayAmount)
			? `${toLocale(+currentBorrowBalance.toFixed(2))} $ -> ${toLocale(
					+newBorrowBalance
			  )} $`
			: toLocale(+currentBorrowBalance.toFixed(2)) + ' $';

	const borrowLimitUsed =
		// @ts-ignore
		newBorrowLimitUsed && !isNaN(+repayAmount)
			? `${currentBorrowLimitUsed} % -> ${newBorrowLimitUsed} %`
			: currentBorrowLimitUsed + ' %';

	newInfo.push({
		label: 'Borrow Balance:',
		value: borrowBalance,
	});

	newInfo.push({
		label: 'Borrow Limit Used:',
		value: borrowLimitUsed,
	});

	return (
		<div className='action-form'>
			<Button onClick={openModal} disabled={!isAccountReady} className='action'>
				Repay
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title={title}
				onClose={closeModal}
			>
				<SendRepay
					// @ts-ignore
					onSubmit={handleSendRepay}
					// @ts-ignore
					isLoading={isRepayResponseRunning || isRepayAllResponseRunning}
					isAccountReady={isAccountReady}
					currenciesOptions={currenciesOptions}
					onCancel={closeModal}
					initialValues={initialValues}
					handleAllCase={handleAll}
					formActionInfoBlock={
						<FormActionInfoBlock
							fee={operationInfo?.partialFee}
							info={newInfo}
						/>
					}
					disableCurrencySelection={disableCurrencySelection}
					userBorrowPerAsset={userBorrowPerAsset}
				/>
			</ClientConfirmActionModal>
		</div>
	);
}

const selector = formValueSelector('repay');

const mapStateToProps = (state: State) => ({
	underlyingAssetId: selector(state, 'underlyingAssetId'),
	repayAmount: selector(state, 'repayAmount'),
	handleAll: selector(state, 'handleAll'),
	operationInfo: state.dashboardData.operationInfo,
	isFormValid: isValid('repay')(state),

	keyring: state.account.keyring,
	account: state.account.currentAccount,
	currenciesOptions: state.protocolData.currenciesOptions,
	isRepayResponseRunning: state.dashboardUpdates.isRepayResponseRunning,
	repayResponse: state.dashboardUpdates.repayResponse,
	repayAllResponse: state.dashboardUpdates.repayAllResponse,
	isRepayAllResponseRunning: state.dashboardUpdates.isRepayAllResponseRunning,
});

const mapDispatchToProps = {
	getOperationInfo,
	resetOperationInfo,
	repay,
	repayAll,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Repay);
