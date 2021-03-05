import React from 'react';
// @ts-ignore
import logo from '../../../img/logo.png';
// @ts-ignore
import classes from './Logo.module.css';

function Logo() {
	return (
		<div className={classes.logo}>
			<img src={logo} alt={'logo'} />
		</div>
	);
}

export default Logo;
