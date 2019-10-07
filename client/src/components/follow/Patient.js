import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { dischargePatient } from '../../actions/patient';
import Moment from 'react-moment';

const Patient = ({
	patient          : { patient, measures },
	dischargePatient,
	history,
	match
}) => {
	return patient === undefined ? (
		<h1>Loading</h1>
	) : (
		<Fragment>
			<span>
				<h1>{`
					${patient.firstname} ${patient.lastname}
				 [${patient.status}]
				 `}</h1>
				<p>
					(Admitted on{' '}
					{<Moment format='DD/MM/YYYY'>{patient.admission}</Moment>})
				</p>
			</span>
			<h3>
				<i className='fas fa-list' />
				{` Observations:`}
			</h3>
			<p> {patient.observation}</p>

			<Link to={`/edit-patient/${match.params.patientId}`}>
				<input
					className='button button-warning'
					type='button'
					value='Update Patient'
				/>
			</Link>
			<input
				className='button button-danger'
				type='button'
				value='Discharge User'
				onClick={() => {
					if (window.confirm) {
						dischargePatient(match.params.patientId, history);
					}
				}}
			/>
		</Fragment>
	);
};

Patient.propTypes = {
	_id              : PropTypes.string.isRequired,
	patient          : PropTypes.object.isRequired,
	dischargePatient : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	patient : state.patient.patient
});

export default connect(mapStateToProps, { dischargePatient })(
	withRouter(Patient)
);
