import React from 'react';
import SwitchMode from '../../Forms/SwitchMode/SwitchMode';

export default function ProtocolOperationMode(props) {
	const {
		account,
		keyring,
		whitelistMode,
		switchMode,
		isSwitchModeResponseRunning,
	} = props;

	const handleSwitchMode = (form) => {
		switchMode(account, keyring);
	};

	return (
		<div>
			<h2>Protocol Operation Mode</h2>
			<div>{whitelistMode}</div>
			<SwitchMode
				onSubmit={handleSwitchMode}
				// @ts-ignore
				isLoading={isSwitchModeResponseRunning}
				isAccountReady={!!account}
			/>
		</div>
	);
}
