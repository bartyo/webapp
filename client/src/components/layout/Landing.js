import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<section className='landing'>
			<div className='buttons'>
				<Link to='/register'>Register</Link>
				<Link to='/login'>Login</Link>
			</div>
		</section>
	);
};

export default Landing;
