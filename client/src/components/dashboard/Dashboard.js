import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { admitPatient } from '../../actions/patient';

const Dashboard = ({ admitPatient, auth: { loading, user } }) => {
	return loading || user === null ? (
		<h1>Loading</h1>
	) : (
		<Fragment>
			<h1>Dashboard</h1>
			<p>
				<i className='fas fa-user'>
					{` Welcome ${user.firstname} ${user.lastname}`}
				</i>
			</p>
			<p>
				<i className='fas fa-hospital'>
					{` Institution: ${user.jobtitle} @ ${user.institution}`}
				</i>
			</p>
			<p>
				<i className='fas fa-envelope'>{` Contact: ${user.email}`}</i>
			</p>

			<Link to='/add-patient'>
				<input class='button-primary' type='button' value='Patient Manager' />
			</Link>
		</Fragment>
	);
};

Dashboard.propTypes = {
	admitPatient : PropTypes.func.isRequired,
	auth         : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth    : state.auth,
	patient : state.patient
});

export default connect(mapStateToProps, { admitPatient })(Dashboard);
