import React from 'react';
import { useParams } from 'react-router-dom';
import { AssetProps, AssetParams } from './Asset.types';

function Asset(props: AssetProps) {
	let { assetId } = useParams<AssetParams>();
	console.log(assetId);

	return <div>Asset</div>;
}

export default Asset;
