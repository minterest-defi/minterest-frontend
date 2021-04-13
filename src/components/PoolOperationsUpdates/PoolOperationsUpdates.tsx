import React from 'react';
import PauseOperation from '../Forms/PauseOperation/PauseOperation';
import ResumeOperation from '../Forms/ResumeOperation/ResumeOperation';
import {
	PoolOperationsUpdatesProps,
	PauseOperationFormValues,
} from '../../containers/ProtocolAdmin/ProtocolAdmin.types';

export default function PoolOperationsUpdates(
	props: PoolOperationsUpdatesProps
) {
	const {
		account,
		keyring,
		currenciesOptions,
		pauseOperation,
		isPauseOperationResponseRunning,
		resumeOperation,
		isResumeOperationResponseRunning,
	} = props;

	const handlePauseOperation = (form: PauseOperationFormValues) => {
		const { poolId, operation } = form;
		if (account) {
			pauseOperation(account, keyring, poolId, operation);
		}
	};

	const handleResumeOperation = (form: PauseOperationFormValues) => {
		const { poolId, operation } = form;
		if (account) {
			resumeOperation(account, keyring, poolId, operation);
		}
	};

	return (
		<div>
			<div>
				<PauseOperation
					// @ts-ignore
					onSubmit={handlePauseOperation}
					// @ts-ignore
					isLoading={isPauseOperationResponseRunning}
					isAccountReady={!!account}
					currenciesOptions={currenciesOptions}
				/>
			</div>
			<div>
				<ResumeOperation
					// @ts-ignore
					onSubmit={handleResumeOperation}
					// @ts-ignore
					isLoading={isResumeOperationResponseRunning}
					isAccountReady={!!account}
					currenciesOptions={currenciesOptions}
				/>
			</div>
		</div>
	);
}
