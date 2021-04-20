import React from 'react';
import { Button } from 'semantic-ui-react';
import Loading from '../../../../util/Loading';
import './IsCollateralModalContent.scss';

interface Props {
	onSubmit: () => void;
	onCancel: () => void;
	isLoading: boolean;
	isAccountReady: boolean;
}

export default function IsCollateralModalContent(props: Props) {
	const { onSubmit, onCancel, isLoading, isAccountReady } = props;

	return (
		<div>
			{isLoading ? (
				<Loading />
			) : (
				<Button
					onClick={onSubmit}
					color={isAccountReady ? 'green' : 'red'}
					disabled={!isAccountReady}
				>
					Confirm
				</Button>
			)}
			<Button onClick={onCancel} color='red'>
				Cancel
			</Button>
		</div>
	);
}
