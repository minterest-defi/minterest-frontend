import React from 'react';
import PauseSpecificOperation from '../Forms/PauseSpecificOperation/PauseSpecificOperation';
import UnpauseSpecificOperation from '../Forms/UnpauseSpecificOperation/UnpauseSpecificOperation';
import {
	PoolOperationsUpdatesProps,
	PauseSpecificOperationFormValues,
} from '../../containers/ProtocolAdmin/ProtocolAdmin.types';

export default function PoolOperationsUpdates(
	props: PoolOperationsUpdatesProps
) {
	const {
		account,
		keyring,
		pauseSpecificOperation,
		isPauseSpecificOperationResponseRunning,
		unpauseSpecificOperation,
		isUnpauseSpecificOperationResponseRunning,
	} = props;

	const handlePauseSpecificOperation = (
		form: PauseSpecificOperationFormValues
	) => {
		const { poolId, operation } = form;
		if (account) {
			pauseSpecificOperation(account, keyring, poolId, operation);
		}
	};

	const handleUnpauseSpecificOperation = (
		form: PauseSpecificOperationFormValues
	) => {
		const { poolId, operation } = form;
		if (account) {
			unpauseSpecificOperation(account, keyring, poolId, operation);
		}
	};

	return (
		<div>
			<PauseSpecificOperation
				// @ts-ignore
				onSubmit={handlePauseSpecificOperation}
				// @ts-ignore
				isLoading={isPauseSpecificOperationResponseRunning}
				isAccountReady={!!account}
			/>
			<UnpauseSpecificOperation
				// @ts-ignore
				onSubmit={handleUnpauseSpecificOperation}
				// @ts-ignore
				isLoading={isUnpauseSpecificOperationResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
