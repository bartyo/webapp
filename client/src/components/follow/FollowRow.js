import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const FollowRow = ({ patients, type = null }) => {
	const row = patients.map((patient) => (
		<tr key={patient._id} className={type && `alert-${type}`}>
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
	patients : PropTypes.array.isRequired,
	type     : PropTypes.string
};

export default FollowRow;
