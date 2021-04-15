import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Button } from 'semantic-ui-react';
import SendRedeem from '../../Forms/SendRedeem/SendRedeem';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import { RedeemProps, RedeemFormValues } from '../UserActions.types';
import { useAPIResponse, useDebounce } from '../../../util';
import { State } from '../../../util/types';
import { OPERATIONS } from '../../../util/constants';
import {
	getOperationInfo,
	resetOperationInfo,
} from '../../../actions/dashboardData';
import classes from '../DepositOperations/DepositOperations.module.scss';

function Redeem(props: RedeemProps) {
	const {
		keyring,
		account,
		redeem,
		isRedeemResponseRunning,
		currenciesOptions,
		redeemResponse,
		underlyingAssetId,
		operationInfo,
		getOperationInfo,
		resetOperationInfo,
	} = props;

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const isAccountReady = !!account;

	const handleSendRedeem = (form: RedeemFormValues) => {
		const { underlyingAssetId } = form;
		redeem(keyring, account, underlyingAssetId);
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
			getOperationInfo(account, OPERATIONS.REDEEM, [underlyingAssetId]);
		}
	};

	// TODO refactoring ??
	const debouncedHandler = useCallback(useDebounce(update, 800), []);

	useAPIResponse([isRedeemResponseRunning, redeemResponse], closeModal);

	useEffect(debouncedHandler, [underlyingAssetId]);

	return (
		<div className={classes.btnWrapper}>
			<Button
				onClick={openModal}
				color={isAccountReady ? 'green' : 'red'}
				disabled={!isAccountReady}
			>
				Withdraw
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title='Withdraw'
				onClose={closeModal}
				fee={operationInfo?.partialFee}
			>
				<SendRedeem
					// @ts-ignore
					onSubmit={handleSendRedeem}
					// @ts-ignore
					isLoading={isRedeemResponseRunning}
					isAccountReady={isAccountReady}
					currenciesOptions={currenciesOptions}
					onCancel={closeModal}
				/>
			</ClientConfirmActionModal>
		</div>
	);
}

const selector = formValueSelector('redeem');

const mapStateToProps = (state: State) => ({
	underlyingAssetId: selector(state, 'underlyingAssetId'),
	operationInfo: state.dashboardData.operationInfo,
});

const mapDispatchToProps = {
	getOperationInfo,
	resetOperationInfo,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Redeem);
