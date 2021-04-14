import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import SendRedeem from '../../Forms/SendRedeem/SendRedeem';
import { RedeemProps, RedeemFormValues } from '../UserActions.types';
import { useAPIResponse } from '../../../util';
import classes from '../DepositOperations/DepositOperations.module.scss';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';

export default function Redeem(props: RedeemProps) {
	const {
		keyring,
		account,
		redeem,
		isRedeemResponseRunning,
		currenciesOptions,
		redeemResponse,
	} = props;

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const isAccountReady = !!account;

	const handleSendRedeem = (form: RedeemFormValues) => {
		const { underlyingAssetId } = form;
		redeem(keyring, account, underlyingAssetId);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	useAPIResponse([isRedeemResponseRunning, redeemResponse], closeModal);

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
