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
		pdmax       : '',
		pwmax       : '',
		pwmin       : '',
		pdmin       : '',
		odmax       : '',
		owmax       : '',
		owmin       : '',
		odmin       : '',
		email       : '',
		password    : '',
		password2   : ''
	});

	const {
		firstname,
		lastname,
		institution,
		jobtitle,
		pdmax,
		pwmax,
		pwmin,
		pdmin,
		odmax,
		owmax,
		owmin,
		odmin,
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
			const preferences = {
				pulse     : {
					danger  : { minLevel: pdmin, maxLevel: pdmax },
					warning : { minLevel: pwmin, maxLevel: pwmax }
				},
				oxygensat : {
					danger  : { minLevel: odmin, maxLevel: odmax },
					warning : { minLevel: owmin, maxLevel: owmax }
				}
			};

			register({
				firstname,
				lastname,
				institution,
				jobtitle,
				preferences,
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

				<hr />
				<h3>Preferences Setup</h3>

				<h5>Pulse</h5>
				<div className='row'>
					<div className='three columns'>
						<label htmlFor='pdmin'>Pulse Danger Min</label>
						<input
							className='u-full-width'
							type='text'
							placeholder='Ex 60.7'
							id='pdmin'
							name='pdmin'
							value={pdmin}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className='three columns'>
						<label htmlFor='pwmin'>Pulse Warning Min</label>
						<input
							className='u-full-width'
							type='text'
							placeholder='Ex 80.3'
							id='pwmin'
							name='pwmin'
							value={pwmin}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className='three columns'>
						<label htmlFor='pwmax'>Pulse Warning Max</label>
						<input
							className='u-full-width'
							type='text'
							placeholder='Ex 167.02'
							id='pwmax'
							name='pwmax'
							value={pwmax}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className='three columns'>
						<label htmlFor='pdmax'>Pulse Danger Max</label>
						<input
							className='u-full-width'
							type='text'
							placeholder='Ex 180.21'
							id='pdmax'
							name='pdmax'
							value={pdmax}
							onChange={(e) => onChange(e)}
						/>
					</div>
				</div>

				<br />
				<h5>Oxygen Saturation</h5>
				<div className='row'>
					<div className='three columns'>
						<label htmlFor='odmin'>O2 Saturation Danger Min</label>
						<input
							className='u-full-width'
							type='text'
							placeholder='Ex 0.47'
							id='odmin'
							name='odmin'
							value={odmin}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className='three columns'>
						<label htmlFor='owmin'>O2 Saturation Warning Min</label>
						<input
							className='u-full-width'
							type='text'
							placeholder='Ex 0.63'
							id='owmin'
							name='owmin'
							value={owmin}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className='three columns'>
						<label htmlFor='owmax'>O2 Saturation Warning Max</label>
						<input
							className='u-full-width'
							type='text'
							placeholder='Ex 1.72'
							id='owmax'
							name='owmax'
							value={owmax}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className='three columns'>
						<label htmlFor='odmax'>O2 Saturation Danger Max</label>
						<input
							className='u-full-width'
							type='text'
							placeholder='Ex 2.121'
							id='odmax'
							name='odmax'
							value={odmax}
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
