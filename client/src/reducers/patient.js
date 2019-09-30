import { ADMIT_PATIENT, FOLLOW_PATIENTS } from '../actions/types';

const initialState = {
	patients : []
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
		// DISCHARGE_PATIENT has _id in payload
		// case DISCHARGE_PATIENT:
		// 	return state.filter((patient) => patient._id !== payload);

		default:
			return state;
	}
}
