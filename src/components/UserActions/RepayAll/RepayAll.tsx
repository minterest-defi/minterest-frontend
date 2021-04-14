import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import SendRepayAll from '../../Forms/SendRepayAll/SendRepayAll';
import { RepayAllProps, RepayAllFormValues } from '../UserActions.types';
import classes from './RepayAll.module.scss';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import { useAPIResponse } from '../../../util';

export default function RepayAll(props: RepayAllProps) {
	const {
		keyring,
		account,
		repayAll,
		isRepayAllResponseRunning,
		currenciesOptions,
		repayAllResponse,
	} = props;

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const isAccountReady = !!account;

	const handleSendRepayAll = (form: RepayAllFormValues) => {
		const { underlyingAssetId } = form;
		repayAll(keyring, account, underlyingAssetId);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	useAPIResponse([isRepayAllResponseRunning, repayAllResponse], closeModal);

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
