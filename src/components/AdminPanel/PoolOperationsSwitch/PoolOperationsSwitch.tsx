import React from 'react';
import PauseSpecificOperation from '../../Forms/PauseSpecificOperation/PauseSpecificOperation';
import UnpauseSpecificOperation from '../../Forms/UnpauseSpecificOperation/UnpauseSpecificOperation';
import { PoolOperationsSwitchProps } from '../AdminPanel.types';

export default function PoolOperationsSwitch(props: PoolOperationsSwitchProps) {
	const {
		account,
		keyring,
		pauseSpecificOperation,
		isPauseSpecificOperationResponseRunning,
		unpauseSpecificOperation,
		isUnpauseSpecificOperationResponseRunning,
	} = props;

	const handlePauseSpecificOperation = (form) => {
		const { poolId, operation } = form;
		pauseSpecificOperation(account, keyring, poolId, operation);
	};

	const handleUnpauseSpecificOperation = (form) => {
		const { poolId, operation } = form;
		unpauseSpecificOperation(account, keyring, poolId, operation);
	};

	return (
		<div>
			<PauseSpecificOperation
				onSubmit={handlePauseSpecificOperation}
				// @ts-ignore
				isLoading={isPauseSpecificOperationResponseRunning}
				isAccountReady={!!account}
			/>
			<UnpauseSpecificOperation
				onSubmit={handleUnpauseSpecificOperation}
				// @ts-ignore
				isLoading={isUnpauseSpecificOperationResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
