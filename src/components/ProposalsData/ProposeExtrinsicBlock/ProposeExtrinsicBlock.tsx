import React from 'react';
import { Metadata } from '../../../util/types';

interface Props {
	metadata: Metadata;
}

export default function ProposeExtrinsicBlock(props: Props) {
	const { metadata } = props;
	console.log(metadata);
	return <div className='propose-extrinsic-block'>Test + FORM</div>;
}
