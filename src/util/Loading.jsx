import React from 'react';

import { Dimmer, Loader } from 'semantic-ui-react';

function Loading() {
	return (
		<Dimmer active>
			<Loader size='small'>Loading...</Loader>
		</Dimmer>
	);
}

export default Loading;
