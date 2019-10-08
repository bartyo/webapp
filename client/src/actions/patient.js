import axios from 'axios';
import { setAlert } from './alert';
import {
	FOLLOW_PATIENTS,
	SET_PATIENT,
	DISCHARGE_PATIENT
} from '../actions/types';
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

// Get information about patient._id
export const setPatient = (patientId, history) => async (dispatch) => {
	setAuthToken(localStorage.token);

	try {
		const res = await axios.get(`/api/patients/${patientId}`);

		dispatch({
			type    : SET_PATIENT,
			payload : res.data
		});

		history.push(`/patient/${patientId}`);
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

// Edit patient
export const editPatient = (formData, patientId, history) => async (
	dispatch
) => {
	setAuthToken(localStorage.token);

	const config = {
		headers : {
			'Content-Type' : 'application/json'
		}
	};

	try {
		await axios.put(`/api/patients/${patientId}`, formData, config);

		dispatch(setAlert('Patient Updated', 'success'));

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

export const dischargePatient = (id, history) => async (dispatch) => {
	setAuthToken(localStorage.token);

	if (window.confirm('Are you sure? This can NOT be undone!')) {
		try {
			const res = await axios.delete(`/api/patients/${id}`);

			dispatch(setAlert('Patient Discharged, data deleted', 'success'));

			dispatch({
				type    : DISCHARGE_PATIENT,
				payload : res.data
			});

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
		}
	}
};
