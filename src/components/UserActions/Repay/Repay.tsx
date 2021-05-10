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
import {
	calculateCurrentOverSupplyPercent,
	calculateSafeOverSupplyUSD,
	calculateNewCurrentOversupplyPercent,
	calculateNewOversupplyUSD,
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
	const [newOverSupplyPercent, setNewOversupplyPercent] = useState<number>(0);
	const [newOversupplyUSD, setNewOversupplyUSD] = useState<number>(0);

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

	const calculateCurrentValues = () => {
		if (!loanToValueData)
			return {
				oversupplyPercent: 0,
				safeOversupplyUSD: 0,
			};

		const { totalCollateral, totalBorrowed } = loanToValueData;

		return {
			oversupplyPercent: calculateCurrentOverSupplyPercent(
				+totalCollateral,
				+totalBorrowed
			),
		};
	};

	const calculateNewValues = () => {
		if (!loanToValueData || !repayAmount) return;
		const { totalCollateral, realPrice, totalBorrowed } = loanToValueData;

		const amountUSD = repayAmount ? +repayAmount * +realPrice : 0;

		setNewOversupplyPercent(
			calculateNewCurrentOversupplyPercent(
				+totalCollateral,
				amountUSD,
				+totalBorrowed
			)
		);
		setNewOversupplyUSD(calculateNewOversupplyUSD(+totalCollateral, amountUSD));
	};

	const update = () => {
		if (account && isFormValid && isModalOpen) {
			getOperationInfo(account, OPERATIONS.REPAY, [
				underlyingAssetId,
				repayAmount,
			]);
			calculateNewValues();
		}
	};

	const calculateSafeLoanValue = () => {
		if (!loanToValueData) return 0;
		const { totalCollateral } = loanToValueData;
		if (+totalCollateral) {
			return calculateSafeOverSupplyUSD(+totalCollateral).toFixed(2);
		}
		return 0;
	};

	const safeLoanValue = calculateSafeLoanValue();

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
	const { oversupplyPercent } = calculateCurrentValues();
	const newInfo = info ? [...info] : [];

	const newDisplayOverSupplyPercent =
		// @ts-ignore
		newOverSupplyPercent && !isNaN(+repayAmount)
			? newOverSupplyPercent.toFixed(2) + ' %'
			: EMPTY_VALUE;

	const newOverSupplyUSD =
		// @ts-ignore
		newOversupplyUSD && !isNaN(+repayAmount)
			? newOversupplyUSD.toFixed(2) + ' $'
			: EMPTY_VALUE;

	const currentOverSupplyPercent = oversupplyPercent
		? oversupplyPercent.toFixed(2) + ' %'
		: EMPTY_VALUE;

	newInfo.push({
		label: 'New Loan Value:',
		value: newOverSupplyUSD,
	});

	newInfo.push({
		label: 'Oversupply:',
		value:
			// @ts-ignore
			newOverSupplyPercent && !isNaN(+repayAmount)
				? newDisplayOverSupplyPercent
				: currentOverSupplyPercent,
	});

	newInfo.push({
		label: 'Safe Oversupply Value:',
		value: safeLoanValue + '$',
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
