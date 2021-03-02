import { Dimmer, Loader } from 'semantic-ui-react';
import React from 'react';

const LoaderWrap = ({ text }) => (
	<Dimmer active>
		<Loader size='small'>{text}</Loader>
	</Dimmer>
);

export default LoaderWrap;
