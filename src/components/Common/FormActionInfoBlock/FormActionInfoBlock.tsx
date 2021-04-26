import React from 'react';
import { formatData } from '../../../util';
import { Option } from '../../UserActions/UserActions.types';

interface Props {
	fee?: string;
	newLoanToValue?: string;
	info?: Option[];
}

export default function FormActionInfoBlock(props: Props) {
	const { fee, newLoanToValue, info } = props;

	return (
		<div className='form-action-info-block'>
			<div className='block-fee'>
				<div className='label'>Estimated gas fee:</div>
				<div className='value'>
					<span className='bold'>
						{fee ? (+formatData(fee)).toFixed(2) : 'N/A'}
					</span>
				</div>
			</div>
			<div className='block-info'>
				<div className='label'>New loan to value:</div>
				<div className='value'>
					<span className='bold'>
						{newLoanToValue ? newLoanToValue : 'N/A'}
					</span>
				</div>
			</div>
			{info &&
				info.map((infoBlock) => (
					<div className='block-info' key={infoBlock.label}>
						<div className='label'>{infoBlock.label}</div>
						<div className='value'>
							<span className='bold'>{infoBlock.value}</span>
						</div>
					</div>
				))}
		</div>
	);
}
