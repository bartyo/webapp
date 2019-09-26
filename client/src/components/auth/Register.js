import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [ formData, setFormData ] = useState({
		firstname   : '',
		lastname    : '',
		institution : '',
		jobtitle    : '',
		email       : '',
		password    : '',
		password2   : ''
	});

	const {
		firstname,
		lastname,
		institution,
		jobtitle,
		email,
		password,
		password2
	} = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert('Passwords do not match', 'danger', 3000);
		} else {
			register({
				firstname,
				lastname,
				institution,
				jobtitle,
				email,
				password
			});
		}
	};

	if (isAuthenticated) return <Redirect to='/dashboard' />;

	//TODO: Add validation on the client side 'required'
	return (
		<Fragment>
			<h1>Sign Up</h1>
			<p>
				<i className='fas fa-user'> Create Your Account</i>
			</p>
			<form onSubmit={(e) => onSubmit(e)}>
				<div className='row'>
					<div className='six columns'>
						<label htmlFor='exFirstName'>First Name</label>
						<input
							className='u-full-width'
							type='text'
							placeholder='Dian'
							id='exFirstName'
							name='firstname'
							value={firstname}
							onChange={(e) => onChange(e)}
						/>
					</div>

					<div className='six columns'>
						<label htmlFor='exLastName'>Last Name</label>
						<input
							className='u-full-width'
							type='text'
							placeholder='Cecht'
							id='exLastName'
							name='lastname'
							value={lastname}
							onChange={(e) => onChange(e)}
						/>
					</div>
				</div>

				<div className='row'>
					<div className='six columns'>
						<label htmlFor='exInstitution'>Institution</label>
						<input
							className='u-full-width'
							type='text'
							placeholder='Hospital ...'
							id='exInstitution'
							name='institution'
							value={institution}
							onChange={(e) => onChange(e)}
						/>
					</div>

					<div className='six columns'>
						<label htmlFor='exJobTitle'>Your position</label>
						<input
							className='u-full-width'
							type='text'
							placeholder='Head of ...'
							id='exJobTitle'
							name='jobtitle'
							value={jobtitle}
							onChange={(e) => onChange(e)}
						/>
					</div>
				</div>

				<label htmlFor='exEmail'>Your email</label>
				<input
					className='u-full-width'
					type='email'
					placeholder='account@provider.ext'
					id='exEmail'
					name='email'
					value={email}
					onChange={(e) => onChange(e)}
				/>

				<div className='row'>
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
						/>
					</div>

					<div className='six columns'>
						<label htmlFor='exPass2'>Re-type Password</label>
						<input
							className='u-full-width'
							type='password'
							placeholder='Re-type password'
							id='exPass2'
							name='password2'
							value={password2}
							onChange={(e) => onChange(e)}
						/>
					</div>
				</div>

				<label className='example-send-yourself-copy'>
					<input type='checkbox' />
					<span className='label-body'>I accept the terms ...</span>
				</label>
				<input className='button-primary' type='submit' value='Submit' />
			</form>
			<p>
				Already have an account <Link to='/login'>Sign In</Link>
			</p>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert        : PropTypes.func.isRequired,
	isAuthenticated : PropTypes.bool,
	register        : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	isAuthenticated : state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
