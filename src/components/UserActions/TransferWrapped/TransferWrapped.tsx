import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import SendTransferWrapped from '../../Forms/SendTransferWrapped/SendTransferWrapped';
import {
	TransferWrappedProps,
	TransferWrappedFormValues,
} from '../UserActions.types';
import { useAPIResponse } from '../../../util';
import classes from './TransferWrapped.module.scss';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';

export default function TransferWrapped(props: TransferWrappedProps) {
	const {
		keyring,
		account,
		transferWrapped,
		isTransferWrappedResponseRunning,
		wrappedCurrenciesOptions,
		transferWrappedResponse,
	} = props;

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const isAccountReady = !!account;

	const handleSendTransferWrapped = (form: TransferWrappedFormValues) => {
		const { receiver, wrappedId, convertedAmount } = form;
		transferWrapped(keyring, account, receiver, wrappedId, convertedAmount);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	useAPIResponse(
		[isTransferWrappedResponseRunning, transferWrappedResponse],
		closeModal
	);

	return (
		<div className={classes.btnWrapper}>
			<Button
				onClick={openModal}
				color={isAccountReady ? 'green' : 'red'}
				disabled={!isAccountReady}
			>
				Transfer Wrapped
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title='Transfer Wrapped'
				onClose={closeModal}
			>
				<SendTransferWrapped
					// @ts-ignore
					onSubmit={handleSendTransferWrapped}
					// @ts-ignore
					isLoading={isTransferWrappedResponseRunning}
					isAccountReady={!!account}
					wrappedCurrenciesOptions={wrappedCurrenciesOptions}
					onCancel={closeModal}
				/>
			</ClientConfirmActionModal>
		</div>
	);
}
