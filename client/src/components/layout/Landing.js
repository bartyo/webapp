import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import img3 from '../../img/surgery.jpg';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Fragment>
			<div className='section hero'>
				<div className='container'>
					<div className='row'>
						<div className='one-half column'>
							<h4 className='hero-heading'>Let's help the Helpers</h4>
							<Link className='button' to='/login'>
								Sign In
							</Link>
							<br />
							<Link className='button button-primary' to='/register'>
								Register
							</Link>
						</div>
						<div className='one-half column land-pics'>
							<img alt='Landpage' className='land-pic' src={img3} />
						</div>
					</div>
				</div>
			</div>

			<div className='section values'>
				<div className='container'>
					<div className='row'>
						<div className='one-third column value'>
							<h2 className='value-multiplier'>20,3M</h2>
							<h5 className='value-heading'>Visits</h5>
							<p className='value-description'>
								Amount of patients admitted into hospitals last year
							</p>
						</div>
						<div className='one-third column value'>
							<h2 className='value-multiplier'>90%</h2>
							<h5 className='value-heading'>Multi-device Users</h5>
							<p className='value-description'>
								Most of the world accesses the internet on multiple devices.
							</p>
						</div>
						<div className='one-third column value'>
							<h2 className='value-multiplier'>27%</h2>
							<h5 className='value-heading'>Sad Users</h5>
							<p className='value-description'>
								Percentage of patients that are forgot in the ER hallways
							</p>
						</div>
					</div>
				</div>
			</div>

			<div class='section get-help'>
				<div class='container'>
					<h3 class='section-heading'>Want more information?</h3>
					<p class='section-description'>
						Follow is an amazingly easy to implement in your Health Software.
						<br />
						If you want to learn more, just send us a message!
					</p>
					<a
						class='button button-primary'
						href='mailto:follower@goconcept.com?subject=[Information] - &body='
					>
						Contact FollowER
					</a>
				</div>
			</div>

			<div className='section categories'>
				<div className='container'>
					<h3 className='section-heading'>Centralized Information</h3>
					<p className='section-description'>
						FollowER information easily and elegantly available.
						<br />
						Information about patients is updated automatically.
					</p>
				</div>
			</div>
		</Fragment>
	);
};

Landing.propTypes = {
	isAuthenticated : PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated : state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
