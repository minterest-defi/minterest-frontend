import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, isValid } from 'redux-form';
import { Button } from 'semantic-ui-react';
import SendRepayOnBehalf from '../../Forms/SendRepayOnBehalf/SendRepayOnBehalf';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import {
	RepayOnBehalfProps,
	RepayOnBehalfFormValues,
} from '../UserActions.types';
import { useAPIResponse, useDebounce, useStateCallback } from '../../../util';
import { State } from '../../../util/types';
import { OPERATIONS } from '../../../util/constants';
import {
	getOperationInfo,
	resetOperationInfo,
} from '../../../actions/dashboardData';
import { repayOnBehalf } from '../../../actions/dashboardUpdates';
import './RepayOnBehalf.scss';

function RepayOnBehalf(props: RepayOnBehalfProps) {
	const {
		title = 'Repay on behalf',
		keyring,
		account,
		repayOnBehalf,
		isRepayOnBehalfResponseRunning,
		currenciesOptions,
		repayOnBehalfResponse,
		underlyingAssetId,
		borrower,
		repayAmount,
		operationInfo,
		getOperationInfo,
		resetOperationInfo,
		isFormValid,
	} = props;

	const [isModalOpen, setIsModalOpen] = useStateCallback(false);

	const isAccountReady = !!account;

	const handleSendRepayOnBehalf = (form: RepayOnBehalfFormValues) => {
		const { underlyingAssetId, borrower, repayAmount } = form;
		repayOnBehalf(keyring, account, underlyingAssetId, borrower, repayAmount);
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
			getOperationInfo(account, OPERATIONS.REPAY_ON_BEHALF, [
				underlyingAssetId,
				borrower,
				repayAmount,
			]);
		}
	};

	// TODO refactoring ??
	const debouncedHandler = useCallback(useDebounce(update, 800), []);

	useAPIResponse(
		[isRepayOnBehalfResponseRunning, repayOnBehalfResponse],
		closeModal
	);

	useEffect(debouncedHandler, [underlyingAssetId, borrower, repayAmount]);

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
				<SendRepayOnBehalf
					// @ts-ignore
					onSubmit={handleSendRepayOnBehalf}
					// @ts-ignore
					isLoading={isRepayOnBehalfResponseRunning}
					isAccountReady={isAccountReady}
					currenciesOptions={currenciesOptions}
					onCancel={closeModal}
				/>
			</ClientConfirmActionModal>
		</div>
	);
}

const selector = formValueSelector('repayOnBehalf');

const mapStateToProps = (state: State) => ({
	keyring: state.account.keyring,
	account: state.account.currentAccount,
	currenciesOptions: state.protocolData.currenciesOptions,
	underlyingAssetId: selector(state, 'underlyingAssetId'),
	borrower: selector(state, 'borrower'),
	repayAmount: selector(state, 'repayAmount'),
	operationInfo: state.dashboardData.operationInfo,
	isFormValid: isValid('repayOnBehalf')(state),
	isRepayOnBehalfResponseRunning:
		state.dashboardUpdates.isRepayOnBehalfResponseRunning,
	repayOnBehalfResponse: state.dashboardUpdates.repayOnBehalfResponse,
});

const mapDispatchToProps = {
	repayOnBehalf,
	getOperationInfo,
	resetOperationInfo,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(RepayOnBehalf);
