/*INGRESOS*/
let GET_INGRESOS = './api/GetIngresos';
let GET_PROVIDERS = './api/GetProviders';
let GET_INGRESOS_FILTER = './api/GetIngresosFilter';
let GET_INGRESOS_FILTER_EXCEL = '/api/GetIngresosFilterExcel';
let GET_INGRESO = './api/GetIngreso';
let SAVE_INGRESO = './api/SaveIngreso';
let DELETE_INGRESOS = './api/DeleteIngresos';
/*CONSOLIDAR*/
let GET_INGRESOS_CONSOLIDAR = './api/GetIngresosConsolidar';
let GET_INGRESOS_FILTER_CONSOLIDAR = './api/GetIngresosFilterConsolidar';
let GET_INGRESOS_FILTER_EXCEL_CONSOLIDAR = '/api/GetIngresosFilterExcelConsolidar';
let SAVE_CONSOLIDADO = './api/SaveConsolidado';
let SAVE_LIBERAR = './api/SaveLiberar';
/*CONSOLIDADO*/
let GET_DATA_MANIFIESTO = './api/GetDataManifiesto';
let SAVE_MANIFIESTO = './api/SaveManifiesto';
let GET_CONSOLIDADO = './api/GetConsolidado';
let GET_CONSOLIDADO_FILTER = './api/GetConsolidadoFilter';
let GET_CONSOLIDADO_FILTER_EXCEL = '/api/GetConsolidadoFilterExcel';
let VIEW_DETAIL_CONSOLIDADO = './api/GetDetail';
/*AEROLINEAS*/
let GET_AEROLINEAS = './api/GetAerolineas';
let GET_AEROLINEA = './api/GetAerolinea';
let SAVE_AEROLINEA = './api/SaveAerolinea';
let GET_AEROLINEAS_FILTER = './api/GetAerolineasFilter';
let GET_AEROLINEAS_FILTER_EXCEL = '/api/GetAerolineasFilterExcel';
let DELETE_AEROLINEAS = './api/DeleteAerolinea';
/*CIUDADES*/
let GET_CIUDADES = './api/GetCiudades';
let GET_CIUDAD = './api/GetCiudad';
let SAVE_CIUDAD = './api/SaveCiudad';
let GET_CIUDADES_FILTER = './api/GetCiudadesFilter';
let GET_CIUDADES_FILTER_EXCEL = '/api/GetCiudadesFilterExcel';
let DELETE_CIUDAD = './api/DeleteCiudad';
/*EMBARCADORES*/
let GET_EMBARCADORES = './api/GetEmbarcadores';
let GET_EMBARCADOR = './api/GetEmbarcador';
let SAVE_EMBARCADOR = './api/SaveEmbarcador';
let GET_EMBARCADORES_FILTER = './api/GetEmbarcadoresFilter';
let GET_EMBARCADORES_FILTER_EXCEL = '/api/GetEmbarcadoresFilterExcel';
let DELETE_EMBARCADOR = './api/DeleteEmbarcador';
/*USUARIOS*/
let GET_USUARIOS = './api/GetUsuarios';
let GET_USUARIO = './api/GetUsuario';
let SAVE_USUARIO = './api/SaveUsuario';
let GET_USUARIOS_FILTER = './api/GetUsuariosFilter';
let GET_USUARIO_FILTER_EXCEL = '/api/GetUsuariosFilterExcel';
let DELETE_USUARIO = './api/DeleteUsuario';

/*HHTP_REQUEST*/
let ServiceGet = (url,data,callback) =>{
	axios.get(url,{ params: data })
	.then(function (response) {
		if(typeof callback === 'function') {
			callback(response.data)
		}else{
			console.log(response)
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

let ServicePost = (url,data,callback) =>{
	axios.post(url,data)
	.then(function (response) {
		if(typeof callback === 'function') {
			callback(response.data)
		}else{
			console.log(response)
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

export {
	GET_INGRESOS,
	GET_PROVIDERS,
	GET_INGRESO,
	GET_INGRESOS_FILTER,
	GET_INGRESOS_FILTER_EXCEL,
	GET_INGRESOS_CONSOLIDAR,
	GET_INGRESOS_FILTER_CONSOLIDAR,
	GET_INGRESOS_FILTER_EXCEL_CONSOLIDAR,
	SAVE_CONSOLIDADO,
	SAVE_LIBERAR,
	SAVE_INGRESO,
	DELETE_INGRESOS,
	GET_DATA_MANIFIESTO,
	SAVE_MANIFIESTO,
	GET_CONSOLIDADO,
	GET_CONSOLIDADO_FILTER,
	GET_CONSOLIDADO_FILTER_EXCEL,
	VIEW_DETAIL_CONSOLIDADO,
	GET_AEROLINEAS,
	GET_AEROLINEA,
	SAVE_AEROLINEA,
	GET_AEROLINEAS_FILTER,
	GET_AEROLINEAS_FILTER_EXCEL,
	DELETE_AEROLINEAS,
	GET_CIUDADES,
	GET_CIUDAD,
	SAVE_CIUDAD,
	GET_CIUDADES_FILTER,
	GET_CIUDADES_FILTER_EXCEL,
	DELETE_CIUDAD,
	GET_EMBARCADORES,
	GET_EMBARCADOR,
	SAVE_EMBARCADOR,
	GET_EMBARCADORES_FILTER,
	GET_EMBARCADORES_FILTER_EXCEL,
	DELETE_EMBARCADOR,
	GET_USUARIOS,
	GET_USUARIO,
	SAVE_USUARIO,
	GET_USUARIOS_FILTER,
	GET_USUARIO_FILTER_EXCEL,
	DELETE_USUARIO,
	ServicePost,
	ServiceGet
}