import React from 'react';
import { Button } from 'semantic-ui-react';
import Loading from '../../util/Loading';
import { WhitelistModeModeProps } from '../../containers/ProtocolAdmin/ProtocolAdmin.types';
// @ts-ignore
import classes from './WhitelistMode.module.css';

export default function WhitelistMode(props: WhitelistModeModeProps) {
	const {
		account,
		keyring,
		whitelistMode,
		switchWhitelistMode,
		isSwitchModeResponseRunning,
	} = props;

	const handleSwitchMode = () => {
		if (account) switchWhitelistMode(account, keyring);
	};

	if (isSwitchModeResponseRunning) return <Loading />;

	return (
		<div className={classes.wrapper}>
			<h2 className={classes.item}>Whitelist Mode:</h2>
			<Button.Group>
				<Button
					onClick={handleSwitchMode}
					color={whitelistMode === 'false' ? 'green' : 'grey'}
					disabled={whitelistMode === 'true'}
				>
					Enabled
				</Button>
				<Button
					onClick={handleSwitchMode}
					color={whitelistMode === 'true' ? 'green' : 'grey'}
					disabled={whitelistMode === 'false'}
				>
					Disabled
				</Button>
			</Button.Group>
		</div>
	);
}
