import axios from 'axios';
import { setAlert } from './alert';
import { ADMIT_PATIENT } from '../actions/types';
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
		const res = await axios.post('/api/patients', formData, config);

		dispatch({
			type    : ADMIT_PATIENT,
			payload : res.data
		});

		dispatch(setAlert('Patient Admitted', 'success'));

		history.push('/dashboard');
	} catch (err) {
		//TODO: factor to ./src/helpers/errorAlerts as a
		// const errors = err.response ? err.response.data.errors : null;
		// if (errors) {
		// 	errors.forEach((error) => {
		// 		dispatch(setAlert(error.msg, 'danger'));
		// 	});
		// }
		//TODO:
		//TODO: Add ADMIT_PATIENT_ERROR type and reducer
		// dispatch({
		// 	type    : ADMIT_PATIENT_ERROR,
		// 	payload : { msg: err.response.statusText, status: err.response.status }
		// });
	}
};
