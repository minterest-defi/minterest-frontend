import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, isValid } from 'redux-form';
import { Button } from 'semantic-ui-react';
import SendRedeemUnderlying from '../../Forms/SendRedeemUnderlying/SendRedeemUnderlying';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import {
	RedeemUnderlyingProps,
	RedeemUnderlyingFormValues,
} from '../UserActions.types';
import { useAPIResponse, useDebounce, useStateCallback } from '../../../util';
import { State } from '../../../util/types';
import { OPERATIONS } from '../../../util/constants';
import {
	getOperationInfo,
	resetOperationInfo,
} from '../../../actions/dashboardData';
import './RedeemUnderlying.scss';
import { redeemUnderlying, redeem } from '../../../actions/dashboardUpdates';

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
	} = props;

	const [isModalOpen, setIsModalOpen] = useStateCallback(false);
	const [newLoanToValue, setNewLoanToValue] = useState<string>('');

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

	const calculateNewLoanToValue = () => {
		if (!loanToValueData) return;
		const { borrowed, supplied, lockedPrice } = loanToValueData;

		if (!+borrowed || !+supplied || !underlyingAmount || !lockedPrice) {
			setNewLoanToValue('N/A');
		} else {
			const newValue = (
				((+supplied - +underlyingAmount * +lockedPrice) / +borrowed) *
				100
			).toFixed(2);
			setNewLoanToValue(newValue + ' %');
		}
	};

	const update = () => {
		if (account && isFormValid && isModalOpen) {
			getOperationInfo(account, OPERATIONS.REDEEM_UNDERLYING, [
				underlyingAssetId,
				underlyingAmount,
			]);
			calculateNewLoanToValue();
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

	useEffect(debouncedHandler, [underlyingAssetId, underlyingAmount]);

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
				fee={operationInfo?.partialFee}
				newLoanToValue={newLoanToValue}
				info={info}
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
