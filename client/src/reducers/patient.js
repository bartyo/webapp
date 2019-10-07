import {
	ADMIT_PATIENT,
	FOLLOW_PATIENTS,
	SET_PATIENT,
	RESET_PATIENTS,
	DISCHARGE_PATIENT
} from '../actions/types';

const initialState = {
	patients : [],
	patient  : {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case ADMIT_PATIENT:
			return {
				...state,
				patients : payload
			};
		case FOLLOW_PATIENTS:
			return {
				...state,
				patients : payload
			};
		case SET_PATIENT:
			return {
				...state,
				patient : payload
			};
		case RESET_PATIENTS:
			return {
				...state,
				patients : []
			};
		case DISCHARGE_PATIENT:
			return {
				...state,
				patients : payload,
				patient  : {}
			};

		default:
			return state;
	}
}
