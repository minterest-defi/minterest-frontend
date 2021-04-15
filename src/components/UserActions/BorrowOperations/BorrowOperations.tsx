import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Button } from 'semantic-ui-react';
import SendBorrow from '../../Forms/SendBorrow/SendBorrow';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import {
	BorrowOperationsProps,
	SendBorrowFormValues,
} from '../UserActions.types';
import { useAPIResponse, useDebounce } from '../../../util';
import { State } from '../../../util/types';
import { OPERATIONS } from '../../../util/constants';
import {
	getOperationInfo,
	resetOperationInfo,
} from '../../../actions/dashboardData';

import classes from './BorrowOperations.module.scss';

function BorrowOperations(props: BorrowOperationsProps) {
	const {
		keyring,
		account,
		borrow,
		isBorrowResponseRunning,
		currenciesOptions,
		borrowResponse,
		underlyingAssetId,
		borrowAmount,
		operationInfo,
		getOperationInfo,
		resetOperationInfo,
	} = props;

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const isAccountReady = !!account;

	const handleSendBorrow = (form: SendBorrowFormValues) => {
		const { underlyingAssetId, borrowAmount } = form;
		borrow(keyring, account, underlyingAssetId, borrowAmount);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		resetOperationInfo();
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	// TODO validation
	const update = () => {
		if (account) {
			getOperationInfo(account, OPERATIONS.BORROW, [
				underlyingAssetId,
				borrowAmount,
			]);
		}
	};

	// TODO refactoring ??
	const debouncedHandler = useCallback(useDebounce(update, 800), []);

	useAPIResponse([isBorrowResponseRunning, borrowResponse], closeModal);

	useEffect(debouncedHandler, [underlyingAssetId, borrowAmount]);

	return (
		<div className={classes.btnWrapper}>
			<Button
				onClick={openModal}
				color={isAccountReady ? 'green' : 'red'}
				disabled={!isAccountReady}
			>
				Borrow
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title='Borrow'
				onClose={closeModal}
				fee={operationInfo?.partialFee}
			>
				<SendBorrow
					// @ts-ignore
					onSubmit={handleSendBorrow}
					// @ts-ignore
					isLoading={isBorrowResponseRunning}
					isAccountReady={isAccountReady}
					currenciesOptions={currenciesOptions}
					onCancel={closeModal}
				/>
			</ClientConfirmActionModal>
		</div>
	);
}

const selector = formValueSelector('borrow');

const mapStateToProps = (state: State) => ({
	underlyingAssetId: selector(state, 'underlyingAssetId'),
	borrowAmount: selector(state, 'borrowAmount'),
	operationInfo: state.dashboardData.operationInfo,
});

const mapDispatchToProps = {
	getOperationInfo,
	resetOperationInfo,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(BorrowOperations);
