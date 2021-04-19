import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, isValid } from 'redux-form';
import { Button } from 'semantic-ui-react';
import SendRepayAll from '../../Forms/SendRepayAll/SendRepayAll';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import { RepayAllProps, RepayAllFormValues } from '../UserActions.types';
import { useAPIResponse, useDebounce, useStateCallback } from '../../../util';
import { State } from '../../../util/types';
import { OPERATIONS } from '../../../util/constants';
import {
	getOperationInfo,
	resetOperationInfo,
} from '../../../actions/dashboardData';
import classes from './RepayAll.module.scss';

function RepayAll(props: RepayAllProps) {
	const {
		keyring,
		account,
		repayAll,
		isRepayAllResponseRunning,
		currenciesOptions,
		repayAllResponse,
		underlyingAssetId,
		operationInfo,
		getOperationInfo,
		resetOperationInfo,
		isFormValid,
	} = props;

	const [isModalOpen, setIsModalOpen] = useStateCallback(false);

	const isAccountReady = !!account;

	const handleSendRepayAll = (form: RepayAllFormValues) => {
		const { underlyingAssetId } = form;
		repayAll(keyring, account, underlyingAssetId);
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
			getOperationInfo(account, OPERATIONS.REPAY_ALL, [underlyingAssetId]);
		}
	};

	// TODO refactoring ??
	const debouncedHandler = useCallback(useDebounce(update, 800), []);

	useAPIResponse([isRepayAllResponseRunning, repayAllResponse], closeModal);

	useEffect(debouncedHandler, [underlyingAssetId]);

	return (
		<div className={classes.btnWrapper}>
			<Button
				onClick={openModal}
				color={isAccountReady ? 'green' : 'red'}
				disabled={!isAccountReady}
			>
				Repay All
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title='Repay All'
				onClose={closeModal}
				fee={operationInfo?.partialFee}
			>
				<SendRepayAll
					// @ts-ignore
					onSubmit={handleSendRepayAll}
					// @ts-ignore
					isLoading={isRepayAllResponseRunning}
					isAccountReady={isAccountReady}
					currenciesOptions={currenciesOptions}
					onCancel={closeModal}
				/>
			</ClientConfirmActionModal>
		</div>
	);
}

const selector = formValueSelector('repayAll');

const mapStateToProps = (state: State) => ({
	underlyingAssetId: selector(state, 'underlyingAssetId'),
	operationInfo: state.dashboardData.operationInfo,
	isFormValid: isValid('repayAll')(state),
});

const mapDispatchToProps = {
	getOperationInfo,
	resetOperationInfo,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(RepayAll);
