import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Button } from 'semantic-ui-react';
import SendDepositUnderlying from '../../Forms/SendDepositUnderlying/SendDepositUnderlying';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import {
	DepositOperationsProps,
	DepositUnderlyingFormValues,
} from '../UserActions.types';
import { useAPIResponse } from '../../../util';
import classes from './DepositOperations.module.scss';
import { State } from '../../../util/types';
import { useDebounce } from '../../../util';
import { OPERATIONS } from '../../../util/constants';
import { getOperationInfo } from '../../../actions/dashboardData';

function DepositOperations(props: DepositOperationsProps) {
	const {
		keyring,
		account,
		currenciesOptions,
		depositUnderlying,
		isDepositUnderlyingResponseRunning,
		depositUnderlyingResponse,
		underlyingAssetId,
		underlyingAmount,
		operationInfo,
		getOperationInfo,
	} = props;
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const isAccountReady = !!account;

	const handleSendDepositUnderlying = (form: DepositUnderlyingFormValues) => {
		const { underlyingAssetId, underlyingAmount } = form;
		depositUnderlying(keyring, account, underlyingAssetId, underlyingAmount);
	};
	// TODO reset operation data
	const closeModal = () => {
		setIsModalOpen(false);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	// TODO validation
	const update = () => {
		if (account) {
			getOperationInfo(account, OPERATIONS.DEPOSIT_UNDERLYING, [
				underlyingAssetId,
				underlyingAmount,
			]);
		}
	};

	// TODO refactoring ??
	const debouncedHandler = useCallback(useDebounce(update, 800), []);

	useAPIResponse(
		[isDepositUnderlyingResponseRunning, depositUnderlyingResponse],
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
				Deposit Underlying
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title='Deposit Underlying'
				onClose={closeModal}
				fee={operationInfo?.partialFee}
			>
				<SendDepositUnderlying
					// @ts-ignore
					onSubmit={handleSendDepositUnderlying}
					// @ts-ignore
					isLoading={isDepositUnderlyingResponseRunning}
					isAccountReady={isAccountReady}
					currenciesOptions={currenciesOptions}
					onCancel={closeModal}
				/>
			</ClientConfirmActionModal>
		</div>
	);
}

const selector = formValueSelector('depositUnderlying');

const mapStateToProps = (state: State) => ({
	underlyingAssetId: selector(state, 'underlyingAssetId'),
	underlyingAmount: selector(state, 'underlyingAmount'),
	operationInfo: state.dashboardData.operationInfo,
});

const mapDispatchToProps = {
	getOperationInfo,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(DepositOperations);
