import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPatients } from '../../actions/patient';
import FollowRow from './FollowRow';

const Follow = ({
	patient       : { patients },
	preferences   : { pulse, oxygensat },
	fetchPatients
}) => {
	useEffect(() => {
		const interval = setInterval(() => {
			fetchPatients();
		}, 5000);
		return () => clearInterval(interval);
	});

	let followDanger = [];
	let followWarning = [];
	let followNormal = [];

	if (patients.length !== 0) {
		patients.forEach((patient) => {
			if (patient.measures.length !== 0) {
				if (
					patient.measures[0].pulse > pulse.danger.maxLevel ||
					patient.measures[0].pulse < pulse.danger.minLevel ||
					patient.measures[0].oxygensat > oxygensat.danger.maxLevel ||
					patient.measures[0].oxygensat < oxygensat.danger.minLevel
				) {
					followDanger.push(patient);
				} else if (
					patient.measures[0].pulse > pulse.warning.maxLevel ||
					patient.measures[0].pulse < pulse.warning.minLevel ||
					patient.measures[0].oxygensat > oxygensat.warning.maxLevel ||
					patient.measures[0].oxygensat < oxygensat.warning.minLevel
				) {
					followWarning.push(patient);
				} else {
					followNormal.push(patient);
				}
			} else {
				followNormal.push(patient);
			}
		});
	}

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
					<tbody>
						<FollowRow patients={followDanger} type={'danger'} />
						<FollowRow patients={followWarning} type={'warning'} />
						<FollowRow patients={followNormal} />
					</tbody>
				</table>
			)}
		</Fragment>
	);
};

Follow.propTypes = {
	patients      : PropTypes.array.isRequired,
	preferences   : PropTypes.object.isRequired,
	fetchPatients : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	patient     : state.patient,
	preferences : state.auth.user.preferences
});

export default connect(mapStateToProps, { fetchPatients })(Follow);
