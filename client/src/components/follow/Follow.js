import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPatients } from '../../actions/patient';
import Moment from 'react-moment';

const Follow = ({ patient: { patients }, fetchPatients }) => {
	useEffect(() => {
		const interval = setInterval(() => {
			fetchPatients();
		}, 5000);
		return () => clearInterval(interval);
	});

	const follow = patients.map((patient) => (
		<tr key={patient._id}>
			<td>{patient.patient.status}</td>
			<td>{patient.patient.firstname}</td>
			<td>{patient.patient.lastname}</td>
			<td>{patient.measures.length === 0 ? '-' : patient.measures[0].pulse}</td>
			<td>
				{patient.measures.length === 0 ? '-' : patient.measures[0].oxygensat}
			</td>
			<td>
				<Moment interval={5000} fromNow ago>
					{patient.patient.admission}
				</Moment>
			</td>
		</tr>
	));

	return (
		<Fragment>
			{patients === [] ? (
				<h2>Loading...</h2>
			) : (
				<table class='u-full-width'>
					<thead>
						<tr>
							<th>St</th>
							<th>Name</th>
							<th>Surname</th>
							<th>Pulse</th>
							<th>O2 sat</th>
							<th>Since</th>
						</tr>
					</thead>
					<tbody>{patients === [] ? 'AddPatient' : follow}</tbody>
				</table>
			)}
		</Fragment>
	);
};

Follow.propTypes = {
	patients      : PropTypes.array.isRequired,
	fetchPatients : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	patient : state.patient
});

export default connect(mapStateToProps, { fetchPatients })(Follow);
