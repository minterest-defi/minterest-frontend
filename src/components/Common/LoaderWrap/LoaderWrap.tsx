import { Dimmer, Loader } from 'semantic-ui-react';
import React from 'react';

interface Props {
	text: string;
}

const LoaderWrap = ({ text }: Props) => (
	<Dimmer active>
		<Loader size='small'>{text}</Loader>
	</Dimmer>
);

export default LoaderWrap;
