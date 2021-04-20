import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, isValid } from 'redux-form';
import { Button } from 'semantic-ui-react';
import SendRedeem from '../../Forms/SendRedeem/SendRedeem';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import { RedeemProps, RedeemFormValues } from '../UserActions.types';
import { useAPIResponse, useDebounce, useStateCallback } from '../../../util';
import { State } from '../../../util/types';
import { OPERATIONS } from '../../../util/constants';
import {
	getOperationInfo,
	resetOperationInfo,
} from '../../../actions/dashboardData';
import './Redeem.scss';
import { redeem } from '../../../actions/dashboardUpdates';

function Redeem(props: RedeemProps) {
	const {
		title = 'Withdraw',
		defaultAssetId,
		info,
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
		isFormValid,
	} = props;

	const [isModalOpen, setIsModalOpen] = useStateCallback(false);

	const isAccountReady = !!account;

	const handleSendRedeem = (form: RedeemFormValues) => {
		const { underlyingAssetId } = form;
		redeem(keyring, account, underlyingAssetId);
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
			getOperationInfo(account, OPERATIONS.REDEEM, [underlyingAssetId]);
		}
	};

	// TODO refactoring ??
	const debouncedHandler = useCallback(useDebounce(update, 800), []);

	useAPIResponse([isRedeemResponseRunning, redeemResponse], closeModal);

	useEffect(debouncedHandler, [underlyingAssetId]);

	const initialValues = { underlyingAssetId: defaultAssetId };

	return (
		<div className={'action'}>
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
				info={info}
			>
				<SendRedeem
					// @ts-ignore
					onSubmit={handleSendRedeem}
					// @ts-ignore
					isLoading={isRedeemResponseRunning}
					isAccountReady={isAccountReady}
					currenciesOptions={currenciesOptions}
					onCancel={closeModal}
					initialValues={initialValues}
				/>
			</ClientConfirmActionModal>
		</div>
	);
}

const selector = formValueSelector('redeem');

const mapStateToProps = (state: State) => ({
	underlyingAssetId: selector(state, 'underlyingAssetId'),
	operationInfo: state.dashboardData.operationInfo,
	isFormValid: isValid('redeem')(state),

	keyring: state.account.keyring,
	account: state.account.currentAccount,
	currenciesOptions: state.protocolData.currenciesOptions,
	isRedeemResponseRunning: state.dashboardUpdates.isRedeemResponseRunning,
	redeemResponse: state.dashboardUpdates.redeemResponse,
});

const mapDispatchToProps = {
	getOperationInfo,
	resetOperationInfo,
	redeem,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Redeem);
