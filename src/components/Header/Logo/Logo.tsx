import React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import logo from '../../../img/logo.png';
import classes from './Logo.module.scss';

function Logo() {
	return (
		<div className={classes.logo}>
			<Link to='/'>
				<img src={logo} alt={'logo'} />
			</Link>
		</div>
	);
}

export default Logo;
