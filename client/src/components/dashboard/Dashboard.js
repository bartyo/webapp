import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteUser } from '../../actions/auth';

const Dashboard = ({ auth: { loading, user }, deleteUser, history }) => {
	return loading || user === null || user.preferences === undefined ? (
		<h1>Loading</h1>
	) : (
		<Fragment>
			<h1>Dashboard</h1>

			<h3>Contact Data</h3>
			<p>
				<i className='fas fa-user' />
				{` Welcome ${user.firstname} ${user.lastname}`}
			</p>
			<p>
				<i className='fas fa-hospital' />
				{` Institution: ${user.jobtitle} @ ${user.institution}`}
			</p>
			<p>
				<i className='fas fa-envelope' />
				{` Contact: ${user.email}`}
			</p>

			<br />
			<h3>Preferences</h3>
			<h5>Pulse</h5>
			<p>
				<span>
					<i className='fas fa-heartbeat danger' />
					{` Danger max: ${user.preferences.pulse.danger.maxLevel} `}
					{` min: ${user.preferences.pulse.danger.minLevel}`}
				</span>
			</p>
			<p>
				<span>
					<i className='fas fa-heartbeat warning' />
					{` Warning max: ${user.preferences.pulse.warning.maxLevel} `}
					{` min: ${user.preferences.pulse.warning.minLevel}`}
				</span>
			</p>

			<h5>Oxygen Saturation</h5>
			<p>
				<span>
					<i className='fas fa-heartbeat danger' />
					{` Danger max: ${user.preferences.oxygensat.danger.maxLevel} `}
					{` min: ${user.preferences.oxygensat.danger.minLevel}`}
				</span>
			</p>
			<p>
				<span>
					<i className='fas fa-heartbeat warning' />
					{` Warning max: ${user.preferences.oxygensat.warning.maxLevel} `}
					{` min: ${user.preferences.oxygensat.warning.minLevel}`}
				</span>
			</p>

			<Link to='/follow'>
				<input className='button button-primary' type='button' value='Follow' />
			</Link>
			<Link to='/add-patient'>
				<input
					className='button button-primary'
					type='button'
					value='Add Patient'
				/>
			</Link>

			<Link to='/edit-user'>
				<input
					className='button button-warning'
					type='button'
					value='Edit User'
				/>
			</Link>
			<input
				className='button button-danger'
				type='button'
				value='Delete User'
				onClick={() => {
					deleteUser(history);
				}}
			/>
		</Fragment>
	);
};

Dashboard.propTypes = {
	auth       : PropTypes.object.isRequired,
	deleteUser : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth    : state.auth,
	patient : state.patient
});

export default connect(mapStateToProps, { deleteUser })(withRouter(Dashboard));
