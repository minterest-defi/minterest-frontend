import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import SendBorrow from '../../Forms/SendBorrow/SendBorrow';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import {
	BorrowOperationsProps,
	SendBorrowFormValues,
} from '../UserActions.types';
import { useAPIResponse } from '../../../util';
import classes from './BorrowOperations.module.scss';

export default function BorrowOperations(props: BorrowOperationsProps) {
	const {
		keyring,
		account,
		borrow,
		isBorrowResponseRunning,
		currenciesOptions,
		borrowResponse,
	} = props;

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const isAccountReady = !!account;

	const handleSendBorrow = (form: SendBorrowFormValues) => {
		const { underlyingAssetId, borrowAmount } = form;
		borrow(keyring, account, underlyingAssetId, borrowAmount);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	useAPIResponse([isBorrowResponseRunning, borrowResponse], closeModal);

	return (
		<div className={classes.btnWrapper}>
			<Button
				onClick={openModal}
				color={isAccountReady ? 'green' : 'red'}
				disabled={!isAccountReady}
			>
				Borrow
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title='Borrow'
				onClose={closeModal}
			>
				<SendBorrow
					// @ts-ignore
					onSubmit={handleSendBorrow}
					// @ts-ignore
					isLoading={isBorrowResponseRunning}
					isAccountReady={isAccountReady}
					currenciesOptions={currenciesOptions}
					onCancel={closeModal}
				/>
			</ClientConfirmActionModal>
		</div>
	);
}
