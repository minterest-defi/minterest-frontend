import React from 'react';
// @ts-ignore
import logo from '../../../img/logo.png';
import classes from './Logo.module.scss';

function Logo() {
	return (
		<div className={classes.logo}>
			<a href='/'>
				<img src={logo} alt={'logo'} />
			</a>
		</div>
	);
}

export default Logo;
