import React from 'react';
import { Button } from 'semantic-ui-react';
import Loading from '../../../../util/Loading';
import './IsCollateralModalContent.scss';
import { formatData } from '../../../../util';

interface Props {
	onSubmit: () => void;
	onCancel: () => void;
	isLoading: boolean;
	isAccountReady: boolean;
	fee?: string;
}

export default function IsCollateralModalContent(props: Props) {
	const { onSubmit, onCancel, isLoading, isAccountReady, fee } = props;

	return (
		<div className='form-block'>
			<div className='form-action-info-block'>
				<div className='block-fee'>
					<div className='label'>Estimated Gas Fee:</div>
					<div className='value'>
						<span className='bold'>
							{fee ? (+formatData(fee)).toFixed(2) : 'N/A'}
						</span>
					</div>
				</div>
			</div>

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
