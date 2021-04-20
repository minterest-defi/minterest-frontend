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
import { useAPIResponse, useDebounce, useStateCallback } from '../../../util';
import { State } from '../../../util/types';
import { OPERATIONS } from '../../../util/constants';
import {
	getOperationInfo,
	resetOperationInfo,
} from '../../../actions/dashboardData';
import { redeemUnderlying } from '../../../actions/dashboardUpdates';

import './RedeemUnderlying.scss';

function RedeemUnderlying(props: RedeemUnderlyingProps) {
	const {
		title = 'Withdraw Underlying',
		keyring,
		account,
		currenciesOptions,
		redeemUnderlying,
		isRedeemUnderlyingResponseRunning,
		redeemUnderlyingResponse,
		underlyingAssetId,
		underlyingAmount,
		operationInfo,
		getOperationInfo,
		resetOperationInfo,
		isFormValid,
	} = props;

	const [isModalOpen, setIsModalOpen] = useStateCallback(false);

	const isAccountReady = !!account;

	const handleSendRedeemUnderlying = (form: RedeemUnderlyingFormValues) => {
		const { underlyingAssetId, underlyingAmount } = form;
		redeemUnderlying(keyring, account, underlyingAssetId, underlyingAmount);
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
			getOperationInfo(account, OPERATIONS.REDEEM_UNDERLYING, [
				underlyingAssetId,
				underlyingAmount,
			]);
		}
	};

	// TODO refactoring ??
	const debouncedHandler = useCallback(useDebounce(update, 800), []);

	useAPIResponse(
		[isRedeemUnderlyingResponseRunning, redeemUnderlyingResponse],
		closeModal
	);

	useEffect(debouncedHandler, [underlyingAssetId, underlyingAmount]);

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
				<SendRedeemUnderlying
					// @ts-ignore
					onSubmit={handleSendRedeemUnderlying}
					// @ts-ignore
					isLoading={isRedeemUnderlyingResponseRunning}
					isAccountReady={isAccountReady}
					currenciesOptions={currenciesOptions}
					onCancel={closeModal}
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
	operationInfo: state.dashboardData.operationInfo,
	isFormValid: isValid('redeemUnderlying')(state),
	isRedeemUnderlyingResponseRunning:
		state.dashboardUpdates.isRedeemUnderlyingResponseRunning,
	redeemUnderlyingResponse: state.dashboardUpdates.redeemUnderlyingResponse,
});

const mapDispatchToProps = {
	redeemUnderlying,
	getOperationInfo,
	resetOperationInfo,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(RedeemUnderlying);
