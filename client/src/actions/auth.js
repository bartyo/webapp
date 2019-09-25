import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// Register User
export const register = ({
	firstname,
	lastname,
	institution,
	jobtitle,
	email,
	password
}) => async (dispatch) => {
	const config = {
		headers : {
			'Content-Type' : 'application/json'
		}
	};

	const body = JSON.stringify({
		firstname,
		lastname,
		institution,
		jobtitle,
		email,
		password
	});

	try {
		const res = await axios.post('/api/users', body, config);

		dispatch({
			type    : REGISTER_SUCCESS,
			payload : res.data
		});
	} catch (err) {
		//TODO: factor to ./src/helpers/errorAlerts as a
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		//TODO:

		dispatch({
			type : REGISTER_FAIL
		});
	}
};
