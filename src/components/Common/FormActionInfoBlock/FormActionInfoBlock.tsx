import React from 'react';
import classnames from 'classnames';
import { formatData } from '../../../util';
import { Option } from '../../UserActions/UserActions.types';
import { EMPTY_VALUE } from '../../../util/constants';
import './FormActionInfoBlock.scss';

interface Props {
	fee?: string;
	newLoanToValue?: string;
	info?: Option[];
}

export default function FormActionInfoBlock(props: Props) {
	const { fee, newLoanToValue, info } = props;

	const renderInfoBlock = (infoBlock: Option) => {
		const blockInfoClasses = classnames('block-info', {
			warned: !!infoBlock.isWarning,
		});
		return (
			<div className={blockInfoClasses} key={infoBlock.label}>
				<div className='label'>{infoBlock.label}</div>
				<div className='value'>
					<span className='bold'>{infoBlock.value}</span>
				</div>
			</div>
		);
	};

	return (
		<div className='form-action-info-block'>
			<div className='block-fee'>
				<div className='label'>Estimated gas fee:</div>
				<div className='value'>
					<span className='bold'>
						{fee ? (+formatData(fee)).toFixed(2) + ' MNT' : EMPTY_VALUE}
					</span>
				</div>
			</div>
			<div className='block-info'>
				<div className='label'>New loan to value:</div>
				<div className='value'>
					<span className='bold'>
						{newLoanToValue ? newLoanToValue : EMPTY_VALUE}
					</span>
				</div>
			</div>
			{info && info.map(renderInfoBlock)}
		</div>
	);
}
