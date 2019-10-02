import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/auth';
import PropTypes from 'prop-types';

const EditUser = ({ user, updateUser, history }) => {
	const [ formData, setFormData ] = useState({
		firstname   : '',
		lastname    : '',
		institution : '',
		jobtitle    : '',
		email       : '',
		password    : ''
	});

	useEffect(
		() => {
			setFormData({
				firstname   : !user.firstname ? '' : user.firstname,
				lastname    : !user.lastname ? '' : user.lastname,
				institution : !user.institution ? '' : user.institution,
				jobtitle    : !user.jobtitle ? '' : user.jobtitle,
				email       : !user.email ? '' : user.email
			});
		},
		[ user ]
	);

	const {
		firstname,
		lastname,
		institution,
		jobtitle,
		email,
		password
	} = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();

		updateUser(formData, history);
	};

	//TODO: Add validation on the client side 'required'
	return (
		<Fragment>
			<h1>Edit User</h1>
			<p>
				<i className='fas fa-user'> Edit Your Account</i>
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

				<hr />
				<h3>Validation</h3>

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
							disabled
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
						/>
					</div>
				</div>

				<Link to='/dashboard'>
					<input className='button' type='button' value='Cancel' />
				</Link>
				<input className='button button-primary' type='submit' value='Submit' />
			</form>
		</Fragment>
	);
};

EditUser.propTypes = {
	user       : PropTypes.object.isRequired,
	updateUser : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	user : state.auth.user
});

export default connect(mapStateToProps, { updateUser })(withRouter(EditUser));
