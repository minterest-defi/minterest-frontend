import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, isValid } from 'redux-form';
import { Button } from 'semantic-ui-react';
import SendRepay from '../../Forms/SendRepay/SendRepay';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import { RepayProps, RepayFormValues } from '../UserActions.types';
import { useAPIResponse, useDebounce, useStateCallback } from '../../../util';
import { State } from '../../../util/types';
import { OPERATIONS } from '../../../util/constants';
import {
	getOperationInfo,
	resetOperationInfo,
} from '../../../actions/dashboardData';
import './Repay.scss';
import { repay, repayAll } from '../../../actions/dashboardUpdates';
import FormActionInfoBlock from '../../Common/FormActionInfoBlock/FormActionInfoBlock';

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
	} = props;

	const [isModalOpen, setIsModalOpen] = useStateCallback(false);
	const [newLoanValue, setNewLoanValue] = useState<string>('');

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
		const { borrowed, supplied, lockedPrice } = loanToValueData;

		if (!+borrowed || !+supplied || !repayAmount || !lockedPrice) {
			setNewLoanValue('N/A');
			return;
		}

		if (handleAll) {
			setNewLoanValue('N/A');
		} else {
			const newValue = (
				(+supplied / (+borrowed - +repayAmount * +lockedPrice)) *
				100
			).toFixed(2);

			setNewLoanValue(newValue + ' %');
		}
	};

	const update = () => {
		if (account && isFormValid && isModalOpen) {
			getOperationInfo(account, OPERATIONS.REPAY, [
				underlyingAssetId,
				repayAmount,
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
		[isRepayResponseRunning, repayResponse],
		closeModal,
		showError
	);

	useAPIResponse(
		[isRepayAllResponseRunning, repayAllResponse],
		closeModal,
		showError
	);

	useEffect(debouncedHandler, [underlyingAssetId, repayAmount, handleAll]);

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
							info={info}
						/>
					}
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
