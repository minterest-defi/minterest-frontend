import React, { useEffect, useCallback } from 'react';
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
import { repay } from '../../../actions/dashboardUpdates';

function Repay(props: RepayProps) {
	const {
		title = 'Repay',
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
	} = props;

	const [isModalOpen, setIsModalOpen] = useStateCallback(false);

	const isAccountReady = !!account;

	const handleSendRepay = (form: RepayFormValues) => {
		const { underlyingAssetId, repayAmount } = form;
		repay(keyring, account, underlyingAssetId, repayAmount);
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
			getOperationInfo(account, OPERATIONS.REPAY, [
				underlyingAssetId,
				repayAmount,
			]);
		}
	};

	// TODO refactoring ??
	const debouncedHandler = useCallback(useDebounce(update, 800), []);

	useAPIResponse([isRepayResponseRunning, repayResponse], closeModal);

	useEffect(debouncedHandler, [underlyingAssetId, repayAmount]);

	return (
		<div className='action'>
			<Button
				onClick={openModal}
				disabled={!isAccountReady}
				className='action-btn'
			>
				{title}
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title={title}
				onClose={closeModal}
				fee={operationInfo?.partialFee}
			>
				<SendRepay
					// @ts-ignore
					onSubmit={handleSendRepay}
					// @ts-ignore
					isLoading={isRepayResponseRunning}
					isAccountReady={isAccountReady}
					currenciesOptions={currenciesOptions}
					onCancel={closeModal}
				/>
			</ClientConfirmActionModal>
		</div>
	);
}

const selector = formValueSelector('repay');

const mapStateToProps = (state: State) => ({
	underlyingAssetId: selector(state, 'underlyingAssetId'),
	repayAmount: selector(state, 'repayAmount'),
	operationInfo: state.dashboardData.operationInfo,
	isFormValid: isValid('repay')(state),

	keyring: state.account.keyring,
	account: state.account.currentAccount,
	currenciesOptions: state.protocolData.currenciesOptions,
	isRepayResponseRunning: state.dashboardUpdates.isRepayResponseRunning,
	repayResponse: state.dashboardUpdates.repayResponse,
});

const mapDispatchToProps = {
	getOperationInfo,
	resetOperationInfo,
	repay,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Repay);
