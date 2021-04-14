import React, { useState } from 'react';
import { useAPIResponse } from '../../../util';
import SendRepay from '../../Forms/SendRepay/SendRepay';
import { RepayProps, RepayFormValues } from '../UserActions.types';
import classes from './Repay.module.scss';
import { Button } from 'semantic-ui-react';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';

export default function Repay(props: RepayProps) {
	const {
		keyring,
		account,
		repay,
		isRepayResponseRunning,
		currenciesOptions,
		repayResponse,
	} = props;

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const isAccountReady = !!account;

	const handleSendRepay = (form: RepayFormValues) => {
		const { underlyingAssetId, repayAmount } = form;
		repay(keyring, account, underlyingAssetId, repayAmount);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	useAPIResponse([isRepayResponseRunning, repayResponse], closeModal);

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
