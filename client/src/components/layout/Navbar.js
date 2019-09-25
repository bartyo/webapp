import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav>
			<h1>
				<Link to='/'>
					<i className='fas' />ProjSante
				</Link>
			</h1>
			<ul>
				<li />
				<Link to='/register'>Register</Link>
				<li />
				<Link to='/login'>Login</Link>
			</ul>
		</nav>
	);
};

export default Navbar;
