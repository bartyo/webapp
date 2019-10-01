import axios from 'axios';
import { setAlert } from './alert';
import { FOLLOW_PATIENTS } from '../actions/types';
import setAuthToken from '../utils/setAuthToken';

// Admit patient
export const admitPatient = (formData, history) => async (dispatch) => {
	setAuthToken(localStorage.token);

	const config = {
		headers : {
			'Content-Type' : 'application/json'
		}
	};

	try {
		await axios.post('/api/patients', formData, config);

		dispatch(setAlert('Patient Admitted', 'success'));

		history.push('/follow');
	} catch (err) {
		//TODO: factor to ./src/helpers/errorAlerts as a
		const errors = err.response ? err.response.data.errors : null;
		if (errors) {
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, 'danger'));
			});
		}
		//TODO:
		//TODO: Add ADMIT_PATIENT_ERROR type and reducer
	}
};

// Fetch all patients
export const fetchPatients = () => async (dispatch) => {
	setAuthToken(localStorage.token);

	try {
		const res = await axios.get('/api/relays');
		dispatch({
			type    : FOLLOW_PATIENTS,
			payload : res.data
		});
	} catch (err) {
		//TODO: factor to ./src/helpers/errorAlerts as a
		const errors = err.response ? err.response.data.errors : null;
		if (errors) {
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, 'danger'));
			});
		}
		//TODO:
	}
};
