import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, isValid } from 'redux-form';
import { Button } from 'semantic-ui-react';
import SendRedeemUnderlying from '../../Forms/SendRedeemUnderlying/SendRedeemUnderlying';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import {
	RedeemUnderlyingProps,
	RedeemUnderlyingFormValues,
} from '../UserActions.types';
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
import './RedeemUnderlying.scss';
import { redeemUnderlying, redeem } from '../../../actions/dashboardUpdates';
import FormActionInfoBlock from '../../Common/FormActionInfoBlock/FormActionInfoBlock';
import {
	calculateNewBorrowLimitWithdraw,
	calculateCurrentBorrowLimitUsed,
	calculateNewBorrowLimitUsedWithdraw,
} from '../../../util/calculations';

function RedeemUnderlying(props: RedeemUnderlyingProps) {
	const {
		title = 'Withdraw Underlying',
		defaultAssetId,
		info,
		loanToValueData,
		keyring,
		account,
		redeemUnderlying,
		redeem,
		isRedeemResponseRunning,
		redeemResponse,
		isRedeemUnderlyingResponseRunning,
		currenciesOptions,
		redeemUnderlyingResponse,
		underlyingAssetId,
		underlyingAmount,
		operationInfo,
		getOperationInfo,
		resetOperationInfo,
		isFormValid,
		handleAll = false,
		disableCurrencySelection = false,
	} = props;

	const [isModalOpen, setIsModalOpen] = useStateCallback(false);

	const isAccountReady = !!account;

	const handleSendRedeemUnderlying = (form: RedeemUnderlyingFormValues) => {
		const { underlyingAssetId, underlyingAmount, handleAll } = form;
		if (!account) return;

		if (handleAll) {
			redeem(keyring, account, underlyingAssetId);
		} else {
			redeemUnderlying(keyring, account, underlyingAssetId, underlyingAmount);
		}
	};

	const closeModal = () => {
		setIsModalOpen(false, () => {
			resetOperationInfo();
		});
	};

	const showError = (message: string) => {
		alert(message);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const calculateBorrowLimit = () => {
		if (!loanToValueData) return EMPTY_VALUE;
		const {
			realPrice,
			currentBorrowLimit,
			collateralFactor,
			isCollateralEnabled,
		} = loanToValueData;
		const amountUSD = underlyingAmount ? +underlyingAmount * +realPrice : 0;
		return calculateNewBorrowLimitWithdraw(
			+currentBorrowLimit,
			amountUSD,
			+collateralFactor,
			isCollateralEnabled
		).toFixed(2);
	};

	const newBorrowLimit = calculateBorrowLimit();

	const calculateCurrentBorrowLimitU = () => {
		if (!loanToValueData) return EMPTY_VALUE;
		const { totalBorrowed, totalCollateral } = loanToValueData;
		return calculateCurrentBorrowLimitUsed(
			+totalBorrowed,
			+totalCollateral
		).toFixed(2);
	};

	const currentBorrowLimitUsed = calculateCurrentBorrowLimitU();

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
		return calculateNewBorrowLimitUsedWithdraw(
			+currentBorrowLimitUsed,
			+totalBorrowed,
			+totalCollateral,
			amountUSD,
			+collateralFactor,
			isCollateralEnabled
		).toFixed(2);
	};

	const newBorrowLimitUsed = calculateNewBorrowLimitU();

	const update = () => {
		if (account && isFormValid && isModalOpen) {
			if (handleAll) {
				getOperationInfo(account, OPERATIONS.REDEEM, [underlyingAssetId]);
			} else {
				getOperationInfo(account, OPERATIONS.REDEEM_UNDERLYING, [
					underlyingAssetId,
					underlyingAmount,
				]);
			}
		}
	};

	// TODO refactoring ??
	const debouncedHandler = useCallback(useDebounce(update, 800), []);

	useAPIResponse(
		[isRedeemUnderlyingResponseRunning, redeemUnderlyingResponse],
		closeModal,
		showError
	);
	useAPIResponse(
		[isRedeemResponseRunning, redeemResponse],
		closeModal,
		showError
	);

	useEffect(update, [isModalOpen]);

	useEffect(debouncedHandler, [underlyingAssetId, underlyingAmount, handleAll]);

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
				Withdraw
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title={title}
				onClose={closeModal}
			>
				<SendRedeemUnderlying
					// @ts-ignore
					onSubmit={handleSendRedeemUnderlying}
					// @ts-ignore
					isLoading={
						isRedeemUnderlyingResponseRunning || isRedeemResponseRunning
					}
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
				/>
			</ClientConfirmActionModal>
		</div>
	);
}

const selector = formValueSelector('redeemUnderlying');

const mapStateToProps = (state: State) => ({
	keyring: state.account.keyring,
	account: state.account.currentAccount,
	currenciesOptions: state.protocolData.currenciesOptions,
	underlyingAssetId: selector(state, 'underlyingAssetId'),
	underlyingAmount: selector(state, 'underlyingAmount'),
	handleAll: selector(state, 'handleAll'),
	operationInfo: state.dashboardData.operationInfo,
	isFormValid: isValid('redeemUnderlying')(state),
	isRedeemUnderlyingResponseRunning:
		state.dashboardUpdates.isRedeemUnderlyingResponseRunning,
	redeemUnderlyingResponse: state.dashboardUpdates.redeemUnderlyingResponse,
	isRedeemResponseRunning: state.dashboardUpdates.isRedeemResponseRunning,
	redeemResponse: state.dashboardUpdates.redeemResponse,
});

const mapDispatchToProps = {
	redeemUnderlying,
	redeem,
	getOperationInfo,
	resetOperationInfo,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(RedeemUnderlying);
