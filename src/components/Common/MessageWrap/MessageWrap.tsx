import React from 'react';
import { Dimmer } from 'semantic-ui-react';
// @ts-ignore
import classes from './MessageWrapp.module.scss';

const MessageWrap = () => (
	<Dimmer active>
		<div className={classes.errorMessage}>
			Connection Failure. Please, check your Internet connection
		</div>
	</Dimmer>
);

export default MessageWrap;
