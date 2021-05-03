import React, { ReactElement } from 'react';
import { Button } from 'semantic-ui-react';
import Loading from '../../../util/Loading';

interface Props {
	isLoading: boolean;
	disabled: boolean;
	isAccountReady: boolean;
	children: string | ReactElement<any, any>;
	type?: string;
	onClick?: Function;
}

export default function LoaderButton(props: Props) {
	const {
		isLoading,
		disabled,
		isAccountReady,
		children,
		onClick,
		type = 'button',
	} = props;

	const handleClick = (...params: any) => {
		if (onClick) {
			onClick(...params);
		}
	};

	return isLoading ? (
		<Loading />
	) : (
		<Button
			onClick={handleClick}
			role={type}
			color={isAccountReady ? 'green' : 'red'}
			disabled={disabled}
		>
			{children}
		</Button>
	);
}
