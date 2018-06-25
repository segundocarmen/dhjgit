import { combineReducers } from 'redux'
import { ShowIngresos } from './reducer_ingresos'

const rootReducer = combineReducers({
	ingresos: ShowIngresos
});

export default rootReducer;