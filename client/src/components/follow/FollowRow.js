import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { setPatient } from '../../actions/patient';

const FollowRow = ({ patients, type = 'white', setPatient, history }) => {
	const onClick = (e) => {
		e.preventDefault();

		setPatient(String(e.target.parentNode.id), history);
	};

	const row = patients.map((patient) => (
		<tr
			key={patient._id}
			id={patient._id}
			className={`alert-${type} pointer`}
			onClick={(e) => {
				onClick(e);
			}}
		>
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
	return <Fragment>{row}</Fragment>;
};

FollowRow.propTypes = {
	patients   : PropTypes.array.isRequired,
	setPatient : PropTypes.func.isRequired,
	type       : PropTypes.string
};

export default connect(null, { setPatient })(withRouter(FollowRow));
