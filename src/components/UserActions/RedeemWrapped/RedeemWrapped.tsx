import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import SendRedeemWrapped from '../../Forms/SendRedeemWrapped/SendRedeemWrapped';
import {
	RedeemWrappedProps,
	RedeemWrappedFormValues,
} from '../UserActions.types';
import classes from './RedeemWrapped.module.scss';
import { useAPIResponse } from '../../../util';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';

export default function RedeemWrapped(props: RedeemWrappedProps) {
	const {
		keyring,
		account,
		redeemWrapped,
		isRedeemWrappedResponseRunning,
		wrappedCurrenciesOptions,
		redeemWrappedResponse,
	} = props;

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const isAccountReady = !!account;

	const handleSendRedeemWrapped = (form: RedeemWrappedFormValues) => {
		const { wrappedId, wrappedAmount } = form;
		redeemWrapped(keyring, account, wrappedId, wrappedAmount);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	useAPIResponse(
		[isRedeemWrappedResponseRunning, redeemWrappedResponse],
		closeModal
	);

	return (
		<div className={classes.btnWrapper}>
			<Button
				onClick={openModal}
				color={isAccountReady ? 'green' : 'red'}
				disabled={!isAccountReady}
			>
				Withdraw Wrapped
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title='Withdraw Wrapped'
				onClose={closeModal}
			>
				<SendRedeemWrapped
					// @ts-ignore
					onSubmit={handleSendRedeemWrapped}
					// @ts-ignore
					isLoading={isRedeemWrappedResponseRunning}
					isAccountReady={isAccountReady}
					wrappedCurrenciesOptions={wrappedCurrenciesOptions}
					onCancel={closeModal}
				/>
			</ClientConfirmActionModal>
		</div>
	);
}
