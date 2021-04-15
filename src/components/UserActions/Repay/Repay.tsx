import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Button } from 'semantic-ui-react';
import SendRepay from '../../Forms/SendRepay/SendRepay';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import { RepayProps, RepayFormValues } from '../UserActions.types';
import { useAPIResponse, useDebounce } from '../../../util';
import { State } from '../../../util/types';
import { OPERATIONS } from '../../../util/constants';
import {
	getOperationInfo,
	resetOperationInfo,
} from '../../../actions/dashboardData';
import classes from './Repay.module.scss';

function Repay(props: RepayProps) {
	const {
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
	} = props;

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const isAccountReady = !!account;

	const handleSendRepay = (form: RepayFormValues) => {
		const { underlyingAssetId, repayAmount } = form;
		repay(keyring, account, underlyingAssetId, repayAmount);
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
		<div className={classes.btnWrapper}>
			<Button
				onClick={openModal}
				color={isAccountReady ? 'green' : 'red'}
				disabled={!isAccountReady}
			>
				Repay
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title='Repay'
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
});

const mapDispatchToProps = {
	getOperationInfo,
	resetOperationInfo,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Repay);
