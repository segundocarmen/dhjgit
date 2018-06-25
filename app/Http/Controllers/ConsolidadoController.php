<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Collection as Collection;
use Illuminate\Database\Eloquent\SoftDeletes;
use Maatwebsite\Excel\Facades\Excel;
use DB;
use App\Models\IngresoAlmacen;
use App\Models\ConsolidadoIngreso;
use App\Models\Consolidado;

use App\Models\Aerolinea;
use App\Models\Ciudades;
use App\Models\Embarcador;

use App\Models\PreManifiesto;
use App\Models\ConsolidadoPreManifiesto;

use Illuminate\Http\Request;

class ConsolidadoController extends Controller
{
	/*UTILITIES*/
	private function dateTime()
	{
		$zonaHoraria = 'America/Lima';
		date_default_timezone_set($zonaHoraria);
		return date('Y-m-d H:i:s');
	}
	private function date()
	{
		$zonaHoraria = 'America/Lima';
		date_default_timezone_set($zonaHoraria);
		return date('Y-m-d');
	}
	private function arrayToObject($array)
	{
		return json_decode(json_encode($array));
	}
	/*=============================================*/


	public function SaveLiberar(Request $request)
	{
		foreach ($request->lista as $item) {
			IngresoAlmacen::where('id','=', $item)->update(['estado' => 'PD']);
			$consolidadoIngreso = ConsolidadoIngreso::where('ingreso_almacen_id','=',$item);
			$consolidadoIngreso->delete();
		}
		return true;
	}

	public function GetDataManifiesto()
	{
		$aerolineas = Aerolinea::all();
		$ciudades = Ciudades::all();
		$embarcadores = Embarcador::all();
		$array=array();
		$array[] = $aerolineas;
		$array[] = $ciudades;
		$array[] = $embarcadores;

		return $array;
	}

	public function SaveManifiesto(Request $request){
		$idUsuario = Auth::user()->id;
		$preManifiesto = [
			'autogenerado' => strtoupper($request->txtAutogenerado),
			'embarcador_id' => $request->lstEmbarcador,
			'awb_guia' => strtoupper($request->txtAwbGuia),
			'aerolinea_id' => $request->lstAerolinea,
			'consignatario' => strtoupper($request->txtConsignatario),
			'direccion_destino' => $request->txtDireccion,
			'from_ciudades_id' => $request->lstCiudadOrigen,
			'to_ciudades_id' => $request->lstCiudadDestino,
			'vuelo' => strtoupper($request->txtVuelo),
			'fecha' => $request->txtFecha,
			'users_id' => $idUsuario,
		];

		$nuevo = new PreManifiesto();
		$nuevo = $nuevo->create($preManifiesto);
		$nuevo = $nuevo->id;
		$array = array();
		foreach ($request->consolidados as $item) {
			$datos = [
				'pre_manifiesto_id' => $nuevo,
				'consolidado_id' => $item
			];
			$array[]=$datos;
			$detalle = new ConsolidadoPreManifiesto();
			$detalle->create($datos);

			Consolidado::where('id','=', $item)->update(['estado' => 'MN']);
		}
		$consolidados = $this->GetConsolidado();
		return $consolidados;
	}

	public function GetConsolidado()
	{
		$today = $this->date();
		$consolidados =DB::table('consolidado')
				->select('id','consignatario','contenido','indicaciones','notas','valor','peso','piezas','observaciones','fecha',DB::raw('(CASE WHEN estado = "PD" THEN "PENDIENTE" ELSE "MANIFESTADO" END) AS estado'))
				->where('fecha','=', $today)
				->where('deleted_at','=', NULL)
				->get();
		$result = [
			'consolidados' => $consolidados,
			'state' => true
		];
		return $result;
	}

	public function GetDetail(Request $request)
	{
		$consolidadoIngreso = ConsolidadoIngreso::select('ingreso_almacen_id')->where('consolidado_id','=',$request[0])->get();
		$array = array();
		foreach ($consolidadoIngreso as $item) {
			$array[]=$item->ingreso_almacen_id;
		}
		$ingreso = IngresoAlmacen::wherein('id',$array)->get();
		return $ingreso;
	}

	public function GetConsolidadoFilter(Request $request){
		$startDate=$request->startDate;
		$toDate=$request->toDate;
		$txtSearch=$request->txtSearch;
		if($startDate == ""){
			$startDate = $this->date();
		}
		if($toDate == ""){
			$toDate = $this->date();
		}

		$consolidados = DB::select("SELECT id,consignatario,contenido,indicaciones,notas,valor,peso,piezas,observaciones,fecha, CASE WHEN estado = 'PD' THEN 'PENDIENTE' ELSE 'MANIFESTADO' END AS estado FROM (SELECT * FROM consolidado
					WHERE fecha BETWEEN '".$startDate."' AND '".$toDate."' AND deleted_at IS NULL) AS tabla 
					WHERE consignatario LIKE '%".$txtSearch."%' 
					OR contenido LIKE '%".$txtSearch."%' 
					OR indicaciones LIKE '%".$txtSearch."%' 
					OR notas LIKE '%".$txtSearch."%' 
					OR observaciones LIKE '%".$txtSearch."%'");
		$result = [
			'consolidados' => $consolidados,
			'state' => true
		];
		return $result;
	}


	public function GetConsolidadoFilterExcel(Request $request){
		$startDate=$request->startDate;
		$toDate=$request->toDate;
		$txtSearch=$request->txtSearch;
		$txtSearch=$request->txtSearch;
		if($startDate == ""){
			$startDate = $this->date();
		}
		if($toDate == ""){
			$toDate = $this->date();
		}

		$consolidados = DB::select("SELECT id,consignatario,contenido,indicaciones,notas,valor,peso,piezas,observaciones,fecha, CASE WHEN estado = 'PD' THEN 'PENDIENTE' ELSE 'MANIFESTADO' END AS estado FROM (SELECT * FROM consolidado
					WHERE fecha BETWEEN '".$startDate."' AND '".$toDate."' AND deleted_at IS NULL) AS tabla 
					WHERE consignatario LIKE '%".$txtSearch."%' 
					OR contenido LIKE '%".$txtSearch."%' 
					OR indicaciones LIKE '%".$txtSearch."%' 
					OR notas LIKE '%".$txtSearch."%' 
					OR observaciones LIKE '%".$txtSearch."%'");

		$data=json_decode(json_encode($consolidados),true);
		$fechaHora=$this->dateTime();
		$fechaHora=str_replace(':','_',$fechaHora);
		$fechaHora=str_replace('-','_',$fechaHora);
		$fechaHora=str_replace(' ','_',$fechaHora);
		$filename = 'REPORTE_CONSOLIDADOS_'.$fechaHora;
		$reporte=Excel::create($filename, function($excel) use ($data) {
			$excel->sheet('REPORTE', function($sheet) use ($data) {
				$sheet->fromArray($data);
			});
		})->export('xls');//->store('xls', storage_path('exports'))->download('xls');
		return $filename;
	}
}