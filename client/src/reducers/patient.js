import { ADMIT_PATIENT } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case ADMIT_PATIENT:
			return [ ...state, payload ];
		// DISCHARGE_PATIENT has _id in payload
		// case DISCHARGE_PATIENT:
		// 	return state.filter((patient) => patient._id !== payload);

		default:
			return state;
	}
}
