import React from 'react';

import { Loader } from 'semantic-ui-react';

function Loading() {
	return <Loader active inline='centered' content='Transaction in progress' />;
}

export default Loading;
