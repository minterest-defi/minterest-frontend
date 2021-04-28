import React, { ReactElement } from 'react';
import ReactModal from 'react-modal';
import './ClientConfirmActionModal.scss';
import classnames from 'classnames';

interface Props {
	isOpen: boolean;
	title: string;
	children: ReactElement<any, any>;
	onClose: () => void;
	className?: string;
}

export default function ClientConfirmActionModal(props: Props) {
	const { isOpen, title, children, onClose, className = '' } = props;

	const classesString = classnames('modal', { [className]: !!className });

	return (
		<ReactModal
			isOpen={isOpen}
			shouldCloseOnOverlayClick={true}
			onRequestClose={onClose}
			className={classesString}
		>
			<div className='block-header'>Confirm {title}</div>
			<div className='child'>{children}</div>
		</ReactModal>
	);
}
