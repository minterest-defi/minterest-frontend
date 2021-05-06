import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, isValid } from 'redux-form';
import { Button } from 'semantic-ui-react';
import SendDepositUnderlying from '../../Forms/SendDepositUnderlying/SendDepositUnderlying';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import {
	DepositOperationsProps,
	DepositUnderlyingFormValues,
} from '../UserActions.types';
import { useAPIResponse, useDebounce, useStateCallback } from '../../../util';
import './DepositOperations.scss';
import { State } from '../../../util/types';
import { OPERATIONS, EMPTY_VALUE } from '../../../util/constants';
import {
	getOperationInfo,
	resetOperationInfo,
} from '../../../actions/dashboardData';
import { depositUnderlying } from '../../../actions/dashboardUpdates';
import FormActionInfoBlock from '../../Common/FormActionInfoBlock/FormActionInfoBlock';
import {
	calculateCurrentOverSupplyPercent,
	calculateNewOversupplyPercent,
	calculateNewOversupplyUSD,
} from '../../../util/calculations';

function DepositOperations(props: DepositOperationsProps) {
	const {
		title = 'Deposit Underlying',
		defaultAssetId,
		info,
		loanToValueData,
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
		resetOperationInfo,
		isFormValid,
		disableCurrencySelection = false,
	} = props;
	const [isModalOpen, setIsModalOpen] = useStateCallback(false);
	const [newOverSupplyPercent, setNewOversupplyPercent] = useState<number>(0);
	const [newOversupplyUSD, setNewOversupplyUSD] = useState<number>(0);

	const isAccountReady = !!account;

	const handleSendDepositUnderlying = (form: DepositUnderlyingFormValues) => {
		const { underlyingAssetId, underlyingAmount } = form;
		depositUnderlying(keyring, account, underlyingAssetId, underlyingAmount);
	};
	const closeModal = () => {
		setIsModalOpen(false, () => {
			resetOperationInfo();
		});
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const calculateCurrentValues = () => {
		if (!loanToValueData)
			return {
				oversupplyPercent: 0,
				safeOversupplyUSD: 0,
			};

		const { totalCollateral, totalBorrowed } = loanToValueData;

		return {
			oversupplyPercent: calculateCurrentOverSupplyPercent(
				+totalCollateral,
				+totalBorrowed
			),
		};
	};
	const calculateNewValues = () => {
		if (!loanToValueData || !underlyingAmount) return;
		const { totalCollateral, realPrice, totalBorrowed } = loanToValueData;

		const amountUSD = underlyingAmount ? +underlyingAmount * +realPrice : 0;

		setNewOversupplyPercent(
			calculateNewOversupplyPercent(+totalCollateral, amountUSD, +totalBorrowed)
		);
		setNewOversupplyUSD(calculateNewOversupplyUSD(+totalCollateral, amountUSD));
	};

	const update = () => {
		if (account && isFormValid && isModalOpen) {
			getOperationInfo(account, OPERATIONS.DEPOSIT_UNDERLYING, [
				underlyingAssetId,
				underlyingAmount,
			]);
			calculateNewValues();
		}
	};

	const showError = (message: string) => {
		alert(message);
	};

	// TODO refactoring ??
	const debouncedHandler = useCallback(useDebounce(update, 800), []);

	useAPIResponse(
		[isDepositUnderlyingResponseRunning, depositUnderlyingResponse],
		closeModal,
		showError
	);

	useEffect(debouncedHandler, [underlyingAssetId, underlyingAmount]);
	useEffect(update, [isModalOpen]);

	const initialValues = { underlyingAssetId: defaultAssetId };
	const { oversupplyPercent } = calculateCurrentValues();
	const newInfo = info ? [...info] : [];

	const newDisplayOverSupplyPercent =
		// @ts-ignore
		newOverSupplyPercent && !isNaN(+underlyingAmount)
			? newOverSupplyPercent.toFixed(2) + ' %'
			: EMPTY_VALUE;

	const newOverSupplyUSD =
		// @ts-ignore
		newOversupplyUSD && !isNaN(+underlyingAmount)
			? newOversupplyUSD.toFixed(2) + ' $'
			: EMPTY_VALUE;

	const currentOverSupplyPercent = oversupplyPercent
		? oversupplyPercent.toFixed(2) + ' %'
		: EMPTY_VALUE;

	newInfo.push({
		label: 'New Loan Value:',
		value: newOverSupplyUSD,
	});

	newInfo.push({
		label: 'Oversupply:',
		value:
			// @ts-ignore
			newOverSupplyPercent && !isNaN(+underlyingAmount)
				? newDisplayOverSupplyPercent
				: currentOverSupplyPercent,
	});

	return (
		<div className='action-form'>
			<Button onClick={openModal} disabled={!isAccountReady} className='action'>
				Supply
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title={title}
				onClose={closeModal}
			>
				<SendDepositUnderlying
					// @ts-ignore
					onSubmit={handleSendDepositUnderlying}
					// @ts-ignore
					isLoading={isDepositUnderlyingResponseRunning}
					isAccountReady={isAccountReady}
					currenciesOptions={currenciesOptions}
					onCancel={closeModal}
					initialValues={initialValues}
					formActionInfoBlock={
						<FormActionInfoBlock
							fee={operationInfo?.partialFee}
							info={newInfo}
						/>
					}
					disableCurrencySelection={disableCurrencySelection}
				/>
			</ClientConfirmActionModal>
		</div>
	);
}

const selector = formValueSelector('depositUnderlying');

const mapStateToProps = (state: State) => ({
	keyring: state.account.keyring,
	account: state.account.currentAccount,
	currenciesOptions: state.protocolData.currenciesOptions,
	underlyingAssetId: selector(state, 'underlyingAssetId'),
	underlyingAmount: selector(state, 'underlyingAmount'),
	operationInfo: state.dashboardData.operationInfo,
	isFormValid: isValid('depositUnderlying')(state),
	isDepositUnderlyingResponseRunning:
		state.dashboardUpdates.isDepositUnderlyingResponseRunning,
	depositUnderlyingResponse: state.dashboardUpdates.depositUnderlyingResponse,
});

const mapDispatchToProps = {
	depositUnderlying,
	getOperationInfo,
	resetOperationInfo,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(DepositOperations);
