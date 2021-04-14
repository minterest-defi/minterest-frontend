import React, { useState } from 'react';

import SendRedeemUnderlying from '../../Forms/SendRedeemUnderlying/SendRedeemUnderlying';

import {
	RedeemUnderlyingProps,
	RedeemUnderlyingFormValues,
} from '../UserActions.types';
import { Button } from 'semantic-ui-react';
import classes from './RedeemUnderlying.module.scss';
import ClientConfirmActionModal from '../../Common/ClientConfirmActionModal/ClientConfirmActionModal';
import { useAPIResponse } from '../../../util';

export default function RedeemUnderlying(props: RedeemUnderlyingProps) {
	const {
		keyring,
		account,
		redeemUnderlying,
		isRedeemUnderlyingResponseRunning,
		currenciesOptions,
		redeemUnderlyingResponse,
	} = props;

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const isAccountReady = !!account;

	const handleSendRedeemUnderlying = (form: RedeemUnderlyingFormValues) => {
		const { underlyingAssetId, underlyingAmount } = form;
		redeemUnderlying(keyring, account, underlyingAssetId, underlyingAmount);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	useAPIResponse(
		[isRedeemUnderlyingResponseRunning, redeemUnderlyingResponse],
		closeModal
	);

	return (
		<div className={classes.btnWrapper}>
			<Button
				onClick={openModal}
				color={isAccountReady ? 'green' : 'red'}
				disabled={!isAccountReady}
			>
				Withdraw Underlying
			</Button>
			<ClientConfirmActionModal
				isOpen={isModalOpen}
				title='Withdraw Underlying'
				onClose={closeModal}
			>
				<SendRedeemUnderlying
					// @ts-ignore
					onSubmit={handleSendRedeemUnderlying}
					// @ts-ignore
					isLoading={isRedeemUnderlyingResponseRunning}
					isAccountReady={isAccountReady}
					currenciesOptions={currenciesOptions}
					onCancel={closeModal}
				/>
			</ClientConfirmActionModal>
		</div>
	);
}
