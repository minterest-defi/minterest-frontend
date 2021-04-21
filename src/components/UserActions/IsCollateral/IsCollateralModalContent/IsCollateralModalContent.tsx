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
		<div className='form-block'>
			<div className='actions'>
				{isLoading ? (
					<div className='loader'>
						<Loading />
					</div>
				) : (
					<Button
						className='action'
						onClick={onSubmit}
						disabled={!isAccountReady}
					>
						Confirm
					</Button>
				)}
				<Button className='action' onClick={onCancel}>
					Cancel
				</Button>
			</div>
		</div>
	);
}
