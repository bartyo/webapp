// import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

// const initialState = [];

// export default function(state = initialState, action) {
// 	const { type, payload } = action;

// 	switch (type) {
// 		case SET_ALERT:
// 			return [ ...state, payload ];
// 		case REMOVE_ALERT:
// 			return state.filter((alert) => alert.id !== payload);
// 		default:
// 			return state;
// 	}
// }

import { REMOVE_ALERT } from '../actions/types';

export default function(state = [], action) {
	switch (action.type) {
		case REMOVE_ALERT:
			return state.filter((alert) => alert.id !== action.payload);
		default:
			return state;
	}
}
