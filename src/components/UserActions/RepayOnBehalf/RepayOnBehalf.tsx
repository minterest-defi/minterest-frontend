import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Button } from 'semantic-ui-react';
import SendRepayOnBehalf from '../../Forms/SendRepayOnBehalf/SendRepayOnBehalf';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import {
	RepayOnBehalfProps,
	RepayOnBehalfFormValues,
} from '../UserActions.types';
import { useAPIResponse, useDebounce } from '../../../util';
import { State } from '../../../util/types';
import { OPERATIONS } from '../../../util/constants';
import {
	getOperationInfo,
	resetOperationInfo,
} from '../../../actions/dashboardData';
import classes from './RepayOnBehalf.module.scss';

function RepayOnBehalf(props: RepayOnBehalfProps) {
	const {
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
	} = props;

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const isAccountReady = !!account;

	const handleSendRepayOnBehalf = (form: RepayOnBehalfFormValues) => {
		const { underlyingAssetId, borrower, repayAmount } = form;
		repayOnBehalf(keyring, account, underlyingAssetId, borrower, repayAmount);
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
		<div className={classes.btnWrapper}>
			<Button
				onClick={openModal}
				color={isAccountReady ? 'green' : 'red'}
				disabled={!isAccountReady}
			>
				Repay on behalf
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title='Repay on behalf'
				onClose={closeModal}
				fee={operationInfo?.partialFee}
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
	underlyingAssetId: selector(state, 'underlyingAssetId'),
	borrower: selector(state, 'borrower'),
	repayAmount: selector(state, 'repayAmount'),
	operationInfo: state.dashboardData.operationInfo,
});

const mapDispatchToProps = {
	getOperationInfo,
	resetOperationInfo,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(RepayOnBehalf);
