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
import classes from './RedeemWrapped.module.scss';
import { useAPIResponse, useDebounce, useStateCallback } from '../../../util';
import { State } from '../../../util/types';
import { OPERATIONS } from '../../../util/constants';
import {
	getOperationInfo,
	resetOperationInfo,
} from '../../../actions/dashboardData';

function RedeemWrapped(props: RedeemWrappedProps) {
	const {
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
		<div className={classes.btnWrapper}>
			<Button
				onClick={openModal}
				color={isAccountReady ? 'green' : 'red'}
				disabled={!isAccountReady}
			>
				Withdraw Wrapped
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title='Withdraw Wrapped'
				onClose={closeModal}
				fee={operationInfo?.partialFee}
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
	wrappedId: selector(state, 'wrappedId'),
	wrappedAmount: selector(state, 'wrappedAmount'),
	operationInfo: state.dashboardData.operationInfo,
	isFormValid: isValid('redeemWrapped')(state),
});

const mapDispatchToProps = {
	getOperationInfo,
	resetOperationInfo,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(RedeemWrapped);
