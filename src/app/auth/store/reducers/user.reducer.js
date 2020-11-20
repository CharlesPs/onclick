import * as Actions from '../actions';

const initialState = {
	role: [], // guest
	landing: {}, // guest
	data: {
		displayName: 'Miguel Sumaran',
		photoURL: 'assets/images/avatars/Velazquez.jpg',
		email: 'johndoe@withinpixels.com',
		shortcuts: ['calendar', 'mail', 'contacts', 'todo']
	}
};

const user = (state = initialState, action) => {
	switch (action.type) {
		case Actions.SET_USER_DATA: {
			return {
				...initialState,
				...action.payload
			};
		}
		case Actions.REMOVE_USER_DATA: {
			return {
				...initialState
			};
		}
		case Actions.USER_LOGGED_OUT: {
			return initialState;
		}
		case Actions.SAVE_USER_LANDING: {
			return {
				...state,
				landing: { ...state.landing, body: {...action.payload.body} } // .body
			};
		}
		default: {
			return state;
		}
	}
};

export default user;
