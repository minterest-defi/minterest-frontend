import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, isValid } from 'redux-form';
import { Button } from 'semantic-ui-react';
import SendRedeemWrapped from '../../Forms/SendRedeemWrapped/SendRedeemWrapped';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import {
	RedeemWrappedProps,
	RedeemWrappedFormValues,
} from '../UserActions.types';
import './RedeemWrapped.scss';
import { useAPIResponse, useDebounce, useStateCallback } from '../../../util';
import { State } from '../../../util/types';
import { OPERATIONS } from '../../../util/constants';
import {
	getOperationInfo,
	resetOperationInfo,
} from '../../../actions/dashboardData';
import { redeemWrapped } from '../../../actions/dashboardUpdates';

function RedeemWrapped(props: RedeemWrappedProps) {
	const {
		title = 'Withdraw Wrapped',
		keyring,
		account,
		redeemWrapped,
		isRedeemWrappedResponseRunning,
		wrappedCurrenciesOptions,
		redeemWrappedResponse,
		wrappedId,
		wrappedAmount,
		operationInfo,
		getOperationInfo,
		resetOperationInfo,
		isFormValid,
	} = props;

	const [isModalOpen, setIsModalOpen] = useStateCallback(false);

	const isAccountReady = !!account;

	const handleSendRedeemWrapped = (form: RedeemWrappedFormValues) => {
		const { wrappedId, wrappedAmount } = form;
		redeemWrapped(keyring, account, wrappedId, wrappedAmount);
	};

	const closeModal = () => {
		setIsModalOpen(false, () => {
			resetOperationInfo();
		});
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const update = () => {
		if (account && isFormValid && isModalOpen) {
			getOperationInfo(account, OPERATIONS.REDEEM_WRAPPED, [
				wrappedId,
				wrappedAmount,
			]);
		}
	};

	// TODO refactoring ??
	const debouncedHandler = useCallback(useDebounce(update, 800), []);

	useAPIResponse(
		[isRedeemWrappedResponseRunning, redeemWrappedResponse],
		closeModal
	);

	useEffect(debouncedHandler, [wrappedId, wrappedAmount]);

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
				<SendRedeemWrapped
					// @ts-ignore
					onSubmit={handleSendRedeemWrapped}
					// @ts-ignore
					isLoading={isRedeemWrappedResponseRunning}
					isAccountReady={isAccountReady}
					wrappedCurrenciesOptions={wrappedCurrenciesOptions}
					onCancel={closeModal}
				/>
			</ClientConfirmActionModal>
		</div>
	);
}

const selector = formValueSelector('redeemWrapped');

const mapStateToProps = (state: State) => ({
	keyring: state.account.keyring,
	account: state.account.currentAccount,
	wrappedCurrenciesOptions: state.protocolData.wrappedCurrenciesOptions,
	wrappedId: selector(state, 'wrappedId'),
	wrappedAmount: selector(state, 'wrappedAmount'),
	operationInfo: state.dashboardData.operationInfo,
	isFormValid: isValid('redeemWrapped')(state),
	isRedeemWrappedResponseRunning:
		state.dashboardUpdates.isRedeemWrappedResponseRunning,
	redeemWrappedResponse: state.dashboardUpdates.redeemWrappedResponse,
});

const mapDispatchToProps = {
	redeemWrapped,
	getOperationInfo,
	resetOperationInfo,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(RedeemWrapped);
