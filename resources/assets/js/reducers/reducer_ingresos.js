import { SHOW_INGRESOS } from '../actions';

const initialState = {
	list: []
}

export function ShowIngresos(state = initialState,action){
	switch(action.type){
		case SHOW_INGRESOS:
			return Object.assign({}, state, {list: action.payload})
		default:
			return state;
	}
}