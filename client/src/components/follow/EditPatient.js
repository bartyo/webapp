import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { editPatient } from '../../actions/patient';

const EditPatient = ({ patient: { patient }, match, history, editPatient }) => {
	const [ formData, setFormData ] = useState({
		status      : '',
		firstname   : '',
		lastname    : '',
		observation : ''
	});

	useEffect(
		() => {
			setFormData({
				status      : !patient.status ? '--' : patient.status,
				firstname   : !patient.firstname ? '--' : patient.firstname,
				lastname    : !patient.lastname ? '--' : patient.lastname,
				observation : !patient.observation ? '--' : patient.observation
			});
		},
		[ patient ]
	);

	const { status, firstname, lastname, observation } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();

		editPatient(formData, match.params.patientId, history);
	};

	return (
		<Fragment>
			<h1>Patient Followup</h1>
			<form onSubmit={(e) => onSubmit(e)}>
				<div className='row'>
					<div className='two columns'>
						<label for='exPatientStatus'>Status</label>
						<input
							className='u-full-width'
							type='text'
							placeholder='surgery...'
							id='exPatientStatus'
							name='status'
							value={status}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className='five columns'>
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
					<div className='five columns'>
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

				<Link to='/follow'>
					<input className='button' type='button' value='Cancel' />
				</Link>
				<input className='button-primary' type='submit' value='Submit' />
			</form>
		</Fragment>
	);
};

EditPatient.propTypes = {
	patient : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	patient : state.patient.patient
});

export default connect(mapStateToProps, { editPatient })(
	withRouter(EditPatient)
);
