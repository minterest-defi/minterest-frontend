import React from 'react';
import PauseSpecificOperation from '../../Forms/PauseSpecificOperation/PauseSpecificOperation';

export default function PoolOperationsSwitch(props) {
	const {
		account,
		keyring,
		pauseSpecificOperation,
		isPauseSpecificOperationResponseRunning,
	} = props;

	// const unlock = async () => {
	// 	setLoading(true);
	// 	const currentUser = keyring.getPair(account);
	// 	try {
	// 		if (currentUser.isLocked) {
	// 			const injector = await web3FromAddress(account);
	// 			await api.tx.controller
	// 				.unpauseSpecificOperation(asset, operation)
	// 				.signAndSend(
	// 					account,
	// 					{ signer: injector.signer },
	// 					transactionCallback
	// 				);
	// 		} else {
	// 			await api.tx.controller
	// 				.unpauseSpecificOperation(asset, operation)
	// 				.signAndSend(currentUser, transactionCallback);
	// 		}
	// 	} catch (err) {
	// 		setLoading(false);
	// 		alert(err.toString());
	// 	}
	// 	setInitialStates();
	// };

	const handlePauseSpecificOperation = (form) => {
		const { poolId, operation } = form;
		pauseSpecificOperation(account, keyring, poolId, operation);
	};

	return (
		<div>
			<PauseSpecificOperation
				onSubmit={handlePauseSpecificOperation}
				// @ts-ignore
				isLoading={isPauseSpecificOperationResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
