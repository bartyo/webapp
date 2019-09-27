import axios from 'axios';
import { setAlert } from './alert';
import { ADMIT_PATIENT } from '../actions/types';
import setAuthToken from '../utils/setAuthToken';

// Admit patient
export const admitPatient = ({ firstname, lastname, observation }) => async (
	dispatch
) => {
	setAuthToken(localStorage.token);

	const config = {
		headers : {
			'Content-Type' : 'application/json'
		}
	};

	const body = JSON.stringify({
		firstname,
		lastname,
		observation
	});

	try {
		const res = await axios.post('/api/patients', body, config);

		dispatch({
			type    : ADMIT_PATIENT,
			payload : res.data
		});

		dispatch(setAlert('Patient Admitted', 'success'));
	} catch (err) {
		//TODO: factor to ./src/helpers/errorAlerts as a
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		//TODO:
	}
};
