import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import SendRepayOnBehalf from '../../Forms/SendRepayOnBehalf/SendRepayOnBehalf';
import {
	RepayOnBehalfProps,
	RepayOnBehalfFormValues,
} from '../UserActions.types';
import { useAPIResponse } from '../../../util';
import classes from './RepayOnBehalf.module.scss';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';

export default function RepayOnBehalf(props: RepayOnBehalfProps) {
	const {
		keyring,
		account,
		repayOnBehalf,
		isRepayOnBehalfResponseRunning,
		currenciesOptions,
		repayOnBehalfResponse,
	} = props;

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const isAccountReady = !!account;

	const handleSendRepayOnBehalf = (form: RepayOnBehalfFormValues) => {
		const { underlyingAssetId, borrower, repayAmount } = form;
		repayOnBehalf(keyring, account, underlyingAssetId, borrower, repayAmount);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	useAPIResponse(
		[isRepayOnBehalfResponseRunning, repayOnBehalfResponse],
		closeModal
	);

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
