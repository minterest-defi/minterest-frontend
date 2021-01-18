import React from 'react';
import logo from '../../../img/logo.png';
import classes from './Logo.module.css';

function Logo() {
	return (
		<div className={classes.logo}>
			<img src={logo} alt={'logo'} />
		</div>
	);
}

export default Logo;
