import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAuth } from '../../actions/auth';
import PropTypes from 'prop-types';

const Login = ({ loginAuth, isAuthenticated }) => {
	const [ formData, setFormData ] = useState({
		email    : '',
		password : ''
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		loginAuth({ email, password });
	};

	if (isAuthenticated) return <Redirect to='/dashboard' />;

	return (
		<Fragment>
			<h1>Login</h1>
			<p>
				<i className='fas fa-user'> Sign Into Your Account</i>
			</p>
			<form onSubmit={(e) => onSubmit(e)}>
				<div className='row'>
					<div className='six columns'>
						<label htmlFor='exEmail'>Your email</label>
						<input
							className='u-full-width'
							type='email'
							placeholder='account@provider.ext'
							id='exEmail'
							name='email'
							value={email}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>

					<div className='six columns'>
						<label htmlFor='exPass1'>Password</label>
						<input
							className='u-full-width'
							type='password'
							placeholder='At least 5 characters ...'
							id='exPass1'
							name='password'
							value={password}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
				</div>
				<input className='button-primary' type='submit' value='Login' />
			</form>
			<p>
				Don't have an account <Link to='/register'>Register</Link>
			</p>
		</Fragment>
	);
};

Login.propTypes = {
	isAuthenticated : PropTypes.bool,
	loginAuth       : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	isAuthenticated : state.auth.isAuthenticated
});

export default connect(mapStateToProps, { loginAuth })(Login);
