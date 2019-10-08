import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { admitPatient } from '../../actions/patient';
import PropTypes from 'prop-types';

const AddPatient = ({ admitPatient, history }) => {
	const [ formData, setFormData ] = useState({
		firstname   : '',
		lastname    : '',
		observation : ''
	});

	const { firstname, lastname, observation } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();

		admitPatient(formData, history);
	};

	return (
		<Fragment>
			<h1>Patient Admission</h1>
			<form onSubmit={(e) => onSubmit(e)}>
				<div className='row'>
					<div className='six columns'>
						<label for='exPatientFirstName'>Patient First Name</label>
						<input
							className='u-full-width'
							type='text'
							placeholder='First Name...'
							id='exPatientFirstName'
							name='firstname'
							value={firstname}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className='six columns'>
						<label for='exPatientLastName'>Patient Last Name</label>
						<input
							className='u-full-width'
							type='text'
							placeholder='Last Name...'
							id='exPatientLastName'
							name='lastname'
							value={lastname}
							onChange={(e) => onChange(e)}
						/>
					</div>
				</div>
				<label for='exObservation'>Observations</label>
				<textarea
					className='u-full-width'
					placeholder='Reason patient is here, insurances, etc'
					id='exObservation'
					name='observation'
					value={observation}
					onChange={(e) => onChange(e)}
				/>
				<input className='button-primary' type='submit' value='Submit' />
			</form>
		</Fragment>
	);
};

AddPatient.propTypes = {
	admitPatient : PropTypes.func.isRequired
};

export default connect(null, { admitPatient })(withRouter(AddPatient));
