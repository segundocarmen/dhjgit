
export const SHOW_INGRESOS = 'SHOW_INGRESOS'

export function GetIngresos(){
	return (dispatch, getState) =>{
		const  url = './api/GetIngresos';
		axios.get(url)
			.then((response) => dispatch({ type: SHOW_INGRESOS, payload: response.data }))
	}
}