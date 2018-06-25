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
use App\Models\Proveedor;
use Illuminate\Http\Request;

class IngresoAlmacenController extends Controller
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

	public function GetProviders()
	{
		$today = $this->date();
		$providers = Proveedor::all();
		return $providers;
	}

	public function GetIngresos()
	{
		$today = $this->date();
		$ingresos = IngresoAlmacen::where('fecha','=',$today)->get();
		$result = [
			'ingresos' => $ingresos,
			'state' => true
		];
		return $result;
	}

	public function GetIngreso(Request $request)
	{
		$ingreso = IngresoAlmacen::where('id','=',$request[0])->get();
		return $ingreso;
	}

	public function SaveIngreso(Request $request)
	{
		$idUsuario = Auth::user()->id;
		$ingreso = [
			'fecha' => $request->txtFecha,
			'wr' => $request->txtWR,
			'consignatario' => strtoupper($request->txtConsignatario),
			'tracking' => $request->txtTracking,
			'proveedor_id' => $request->lstProveedor,
			'ubicacion' => strtoupper($request->txtUbicacion),
			'peso' => $request->txtPeso,
			'awb' => strtoupper($request->txtAWB),
			'users_id' => $idUsuario,
			'observaciones' => $request->txtObservacion,
		];
		
		$nuevo = new IngresoAlmacen();
		$idIngreso = $request->txtIdIngreso;
		if($idIngreso == ""){
			$nuevo = $nuevo->create($ingreso);
		}else{
			IngresoAlmacen::where('id', '=', $idIngreso)->update($ingreso);
		}
		
		$ingresos = $this->GetIngresos();
		
		return $ingresos;
	}


	public function GetIngresosFilter(Request $request){
		$startDate=$request->startDate;
		$toDate=$request->toDate;
		$txtSearch=$request->txtSearch;
		if($startDate == ""){
			$startDate = $this->date();
		}
		if($toDate == ""){
			$toDate = $this->date();
		}

		$ingresos = DB::select("SELECT * FROM (SELECT * FROM ingreso_almacen
					WHERE fecha BETWEEN '".$startDate."' AND '".$toDate."' AND deleted_at IS NULL) AS tabla 
					WHERE wr LIKE '%".$txtSearch."%' 
					OR consignatario LIKE '%".$txtSearch."%' 
					OR tracking LIKE '%".$txtSearch."%' 
					OR ubicacion LIKE '%".$txtSearch."%' 
					OR awb LIKE '%".$txtSearch."%'");
		
		$result = [
			'ingresos' => $ingresos,
			'state' => true
		];
		return $result;
	}


	public function GetIngresosFilterExcel(Request $request){
		$startDate=$request->startDate;
		$toDate=$request->toDate;
		$txtSearch=$request->txtSearch;
		if($startDate == ""){
			$startDate = $this->date();
		}
		if($toDate == ""){
			$toDate = $this->date();
		}

		$ingresos = DB::select("SELECT * FROM (SELECT * FROM ingreso_almacen
					WHERE fecha BETWEEN '".$startDate."' AND '".$toDate."' AND deleted_at IS NULL) AS tabla 
					WHERE wr LIKE '%".$txtSearch."%' 
					OR consignatario LIKE '%".$txtSearch."%' 
					OR tracking LIKE '%".$txtSearch."%' 
					OR ubicacion LIKE '%".$txtSearch."%' 
					OR awb LIKE '%".$txtSearch."%'");

		$data=json_decode(json_encode($ingresos),true);
		$fechaHora=$this->dateTime();
		$fechaHora=str_replace(':','_',$fechaHora);
		$fechaHora=str_replace('-','_',$fechaHora);
		$fechaHora=str_replace(' ','_',$fechaHora);
		$filename = 'REPORTE_INGRESOS_'.$fechaHora;
		$reporte=Excel::create($filename, function($excel) use ($data) {
			$excel->sheet('REPORTE', function($sheet) use ($data) {
				$sheet->fromArray($data);
			});
		})->export('xls');//->store('xls', storage_path('exports'))->download('xls');
		return $filename;
	}

	public function DeleteIngresos(Request $request)
	{
		$cantidad = $request->cantidad;
		$data = $request->data;
		$array = array();
		for($i=0; $i < $cantidad ; $i++){
			$id = $data[$i];
			$ingreso = IngresoAlmacen::findOrFail($id);
			$ingreso->delete();
		}

		$ingresos = $this->GetIngresos();
		return $ingresos;
	}
}