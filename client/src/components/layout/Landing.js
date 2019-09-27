import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<section className='landing'>
			<div className='buttons'>
				<h1>Landing Page</h1>
				<Link to='/register'>Register</Link>
				<Link to='/login'>Login</Link>
			</div>
		</section>
	);
};

Landing.propTypes = {
	isAuthenticated : PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated : state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
