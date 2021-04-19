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

import classes from './RedeemUnderlying.module.scss';

function RedeemUnderlying(props: RedeemUnderlyingProps) {
	const {
		keyring,
		account,
		redeemUnderlying,
		isRedeemUnderlyingResponseRunning,
		currenciesOptions,
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
		<div className={classes.btnWrapper}>
			<Button
				onClick={openModal}
				color={isAccountReady ? 'green' : 'red'}
				disabled={!isAccountReady}
			>
				Withdraw Underlying
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title='Withdraw Underlying'
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
	underlyingAssetId: selector(state, 'underlyingAssetId'),
	borrowAmount: selector(state, 'underlyingAmount'),
	operationInfo: state.dashboardData.operationInfo,
	isFormValid: isValid('redeemUnderlying')(state),
});

const mapDispatchToProps = {
	getOperationInfo,
	resetOperationInfo,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(RedeemUnderlying);
