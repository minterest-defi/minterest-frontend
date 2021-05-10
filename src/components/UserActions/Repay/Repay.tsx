import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, isValid } from 'redux-form';
import { Button } from 'semantic-ui-react';
import SendRepay from '../../Forms/SendRepay/SendRepay';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import { RepayProps, RepayFormValues } from '../UserActions.types';
import { useAPIResponse, useDebounce, useStateCallback } from '../../../util';
import { State } from '../../../util/types';
import { OPERATIONS, EMPTY_VALUE } from '../../../util/constants';
import {
	getOperationInfo,
	resetOperationInfo,
} from '../../../actions/dashboardData';
import './Repay.scss';
import { repay, repayAll } from '../../../actions/dashboardUpdates';
import FormActionInfoBlock from '../../Common/FormActionInfoBlock/FormActionInfoBlock';
import config from '../../../config';
//import { calculateCurrentOverSupplyPercent } from '../../../util/calculations';

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
	const [newLoanValue, setNewLoanValue] = useState<string>('');
	const [oversupply, setOversupply] = useState<string>('');

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

	const calculateNewLoanToValue = () => {
		if (!loanToValueData) return;
		const {
			totalBorrowed,
			totalSupplied,
			realPrice,
			borrowed,
		} = loanToValueData;

		if (!+totalBorrowed || !+totalSupplied || !repayAmount || !realPrice) {
			setNewLoanValue(EMPTY_VALUE);
			return;
		}

		if (handleAll && +totalBorrowed === +borrowed * +realPrice) {
			setNewLoanValue(EMPTY_VALUE);
			return;
		}

		let newValue: number;

		if (handleAll) {
			newValue =
				(+totalSupplied / (+totalBorrowed - +borrowed * +realPrice)) * 100;
		} else {
			newValue =
				(+totalSupplied / (+totalBorrowed - +repayAmount * +realPrice)) * 100;
		}

		setNewLoanValue(newValue.toFixed(2) + ' %');
	};

	// const currentOversupply = loanToValueData
	// 	? calculateCurrentOverSupplyPercent(
	// 			loanToValueData.totalCollateral,
	// 			loanToValueData.totalBorrowed
	// 	  )
	// 	: EMPTY_VALUE;

	// console.log(currentOversupply);

	const calculateCurrentOversupply = () => {
		if (!loanToValueData) return EMPTY_VALUE;
		const { totalBorrowed, totalCollateral } = loanToValueData;
		if (+totalCollateral && +totalBorrowed) {
			return ((+totalCollateral / +totalBorrowed) * 100).toFixed(2) + '%';
		}
		return EMPTY_VALUE;
	};

	const calculateOversupply = () => {
		if (!loanToValueData) return;
		const { totalBorrowed, totalCollateral, realPrice } = loanToValueData;
		if (!+totalCollateral || !repayAmount || !realPrice) {
			setOversupply(EMPTY_VALUE);
			return;
		}
		const newValue = (
			(+totalCollateral / (+totalBorrowed - +repayAmount * +realPrice)) *
			100
		).toFixed(2);
		setOversupply(newValue + '%');
	};

	const calculateSafeLoanValue = () => {
		if (!loanToValueData) return 0;
		const { totalCollateral } = loanToValueData;
		if (+totalCollateral) {
			return ((+totalCollateral / 100) * config.SAFE_OVERSUPPLY_LIMIT).toFixed(
				2
			);
		}
		return 0;
	};

	const calculateNewOversupplyValue = () => {
		if (!loanToValueData) return;
		const { totalCollateral, realPrice } = loanToValueData;
		if (!+totalCollateral || !repayAmount || !realPrice) {
			setOversupply(EMPTY_VALUE);
			return;
		}
	};

	const update = () => {
		if (account && isFormValid && isModalOpen) {
			getOperationInfo(account, OPERATIONS.REPAY, [
				underlyingAssetId,
				repayAmount,
			]);
			calculateNewLoanToValue();
			calculateOversupply();
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

	const currentOversupply = calculateCurrentOversupply();

	const safeLoanValue = calculateSafeLoanValue();

	const newInfo = info ? [...info] : [];
	newInfo.push({
		label: 'Oversupply:',
		value:
			repayAmount && oversupply !== EMPTY_VALUE
				? oversupply
				: currentOversupply,
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
							newLoanToValue={newLoanValue}
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
