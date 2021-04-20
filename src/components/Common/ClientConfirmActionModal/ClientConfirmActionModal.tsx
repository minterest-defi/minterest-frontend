import React, { ReactElement } from 'react';
import ReactModal from 'react-modal';
import './ClientConfirmActionModal.scss';
import { Option } from '../../UserActions/UserActions.types';

interface Props {
	isOpen: boolean;
	title: string;
	children: ReactElement<any, any>;
	onClose: () => void;
	fee?: string;
	info?: Option[];
}

export default function ClientConfirmActionModal(props: Props) {
	const { isOpen, title, children, onClose, fee, info } = props;

	return (
		<ReactModal
			isOpen={isOpen}
			shouldCloseOnOverlayClick={true}
			onRequestClose={onClose}
			className='modal'
		>
			<div className='block-header'>Confirm Action</div>
			<div className='title'>Action: {title}</div>
			<div className='block-fee'>
				<div className='label'>Estimated fee:</div>
				<div className='value'>
					<span className='bold'>{fee}</span>
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

			<div className='child'>{children}</div>
		</ReactModal>
	);
}
