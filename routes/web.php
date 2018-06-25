<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();
Route::get('/', 'LoginController@ShowLoginForm')->middleware('logedinlogin');
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login')->middleware('logedinlogin');

Route::get('/logout', 'LoginController@logout');
Route::group(['prefix' => 'sistema',  'middleware' => 'auth'], function(){
	Route::get('/', 'SystemController@ShowSystem')->name('home');
	Route::get('/ingreso', 'SystemController@ShowSystem');
	Route::get('/consolidar-ingreso', 'SystemController@ShowSystem');
	Route::get('/consolidado', 'SystemController@ShowSystem');
	Route::get('/pre-manifiesto', 'SystemController@ShowSystem');
	Route::get('/crear-aerolinea', 'SystemController@ShowSystem');
	Route::get('/crear-ciudad', 'SystemController@ShowSystem');
	Route::get('/crear-embarcador', 'SystemController@ShowSystem');
	Route::get('/usuarios', 'SystemController@ShowSystem');
	Route::get('/logout', 'LoginController@logout');

	/*API ROUTES*/
	Route::get('api/GetIngresos', 'IngresoAlmacenController@GetIngresos');
	Route::get('api/GetProviders', 'IngresoAlmacenController@GetProviders');
	Route::get('api/GetIngreso', 'IngresoAlmacenController@GetIngreso');
	Route::post('api/GetIngresosFilter', 'IngresoAlmacenController@GetIngresosFilter');
	Route::get('api/GetIngresosFilterExcel', 'IngresoAlmacenController@GetIngresosFilterExcel');
	Route::post('api/SaveIngreso', 'IngresoAlmacenController@SaveIngreso');
	Route::post('api/DeleteIngresos', 'IngresoAlmacenController@DeleteIngresos');

	Route::get('api/GetIngresosConsolidar', 'ConsolidarController@GetIngresosConsolidar');
	Route::post('api/GetIngresosFilterConsolidar', 'ConsolidarController@GetIngresosFilterConsolidar');
	Route::get('api/GetIngresosFilterExcelConsolidar', 'ConsolidarController@GetIngresosFilterExcelConsolidar');
	Route::post('api/SaveConsolidado', 'ConsolidarController@SaveConsolidado');
	Route::post('api/SaveLiberar', 'ConsolidarController@SaveLiberar');
	
	Route::get('api/GetDataManifiesto', 'ConsolidadoController@GetDataManifiesto');
	Route::post('api/SaveManifiesto', 'ConsolidadoController@SaveManifiesto');
	Route::get('api/GetConsolidado', 'ConsolidadoController@GetConsolidado');
	Route::post('api/GetConsolidadoFilter', 'ConsolidadoController@GetConsolidadoFilter');
	Route::get('api/GetConsolidadoFilterExcel', 'ConsolidadoController@GetConsolidadoFilterExcel');
	Route::post('api/GetDetail', 'ConsolidadoController@GetDetail');

	Route::get('api/GetAerolineas', 'AerolineaController@GetAerolineas');
	Route::get('api/GetAerolinea', 'AerolineaController@GetAerolinea');
	Route::post('api/SaveAerolinea', 'AerolineaController@SaveAerolinea');
	Route::post('api/GetAerolineasFilter', 'AerolineaController@GetAerolineasFilter');
	Route::get('api/GetAerolineasFilterExcel', 'AerolineaController@GetAerolineasFilterExcel');
	Route::post('api/DeleteAerolinea', 'AerolineaController@DeleteAerolinea');

	Route::get('api/GetCiudades', 'CiudadesController@GetCiudades');
	Route::get('api/GetCiudad', 'CiudadesController@GetCiudad');
	Route::post('api/SaveCiudad', 'CiudadesController@SaveCiudad');
	Route::post('api/GetCiudadesFilter', 'CiudadesController@GetCiudadesFilter');
	Route::get('api/GetCiudadesFilterExcel', 'CiudadesController@GetCiudadesFilterExcel');
	Route::post('api/DeleteCiudad', 'CiudadesController@DeleteCiudad');

	Route::get('api/GetEmbarcadores', 'EmbarcadorController@GetEmbarcadores');
	Route::get('api/GetEmbarcador', 'EmbarcadorController@GetEmbarcador');
	Route::post('api/SaveEmbarcador', 'EmbarcadorController@SaveEmbarcador');
	Route::post('api/GetEmbarcadoresFilter', 'EmbarcadorController@GetEmbarcadoresFilter');
	Route::get('api/GetEmbarcadoresFilterExcel', 'EmbarcadorController@GetEmbarcadoresFilterExcel');
	Route::post('api/DeleteEmbarcador', 'EmbarcadorController@DeleteEmbarcador');

	Route::get('api/GetUsuarios', 'UsuariosController@GetUsuarios');
	Route::get('api/GetUsuario', 'UsuariosController@GetUsuario');
	Route::post('api/SaveUsuario', 'UsuariosController@SaveUsuario');
	Route::post('api/GetUsuariosFilter', 'UsuariosController@GetUsuariosFilter');
	Route::get('api/GetUsuariosFilterExcel', 'UsuariosController@GetUsuariosFilterExcel');
	Route::post('api/DeleteUsuario', 'UsuariosController@DeleteUsuario');
});