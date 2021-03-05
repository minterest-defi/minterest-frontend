import React from 'react';
// @ts-ignore
import classes from './Menu.module.css';

function Menu() {
	return (
		<div className={classes.menu}>
			<div className={classes.item}>User</div>
			<div className={classes.item}>Admin</div>
		</div>
	);
}

export default Menu;
