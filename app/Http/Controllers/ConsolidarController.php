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
use Illuminate\Http\Request;

class ConsolidarController extends Controller
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


	public function SaveConsolidado(Request $request){
		$today=$this->date();
		$idUsuario = Auth::user()->id;
		$consolidado = [
			'consignatario' => strtoupper($request->txtConsignatario),
			'contenido' => strtoupper($request->txtContenido),
			'indicaciones' => $request->txtIndicaciones,
			'notas' => $request->txtNotas,
			'valor' => $request->txtValor,
			'peso' => $request->txtPeso,
			'piezas' => $request->txtPiezas,
			'observaciones' => strtoupper($request->txtObservacion),
			'users_id' => $idUsuario,
			'fecha' => $today,
		];
		$nuevo = new Consolidado();
		$nuevo = $nuevo->create($consolidado);
		$nuevo = $nuevo->id;
		foreach ($request->ingresos as $item) {
			$datos = [
				'consolidado_id' => $nuevo,
				'ingreso_almacen_id' => $item
			];
			$ConsolidadoIngreso = new ConsolidadoIngreso();
			$ConsolidadoIngreso->create($datos);

			IngresoAlmacen::where('id','=', $item)->update(['estado' => 'CS']);
		}
		$ingresos = $this->GetIngresosConsolidar('PD');
		
		return $ingresos;
	}

	public function SaveLiberar(Request $request)
	{
		foreach ($request->lista as $item) {
			IngresoAlmacen::where('id','=', $item)->update(['estado' => 'PD']);
			$consolidadoIngreso = ConsolidadoIngreso::where('ingreso_almacen_id','=',$item);
			$consolidadoIngreso->delete();
		}
		$ingresos = $this->GetIngresosConsolidar($request->estado);
		
		return $ingresos;
	}

	public function GetIngresosConsolidar($estado = 'PD')
	{
		$today = $this->date();
		$ingresos = DB::table('ingreso_almacen')
				->select('id','fecha','wr','consignatario','tracking','ubicacion','peso',DB::raw('(CASE WHEN estado = "PD" THEN "PENDIENTE" WHEN estado = "CS" THEN "CONSOLIDADO" ELSE "CONFIRMADO" END) AS estado'),'awb','observaciones','users_id')
				->where('fecha','=', $today)
				->where('estado','=', $estado)
				->get();

		$result = [
			'ingresos' => $ingresos,
			'state' => true
		];
		return $result;
	}

	public function GetIngresosFilterConsolidar(Request $request){
		$startDate=$request->startDate;
		$toDate=$request->toDate;
		$txtSearch=$request->txtSearch;
		$estado=$request->lstEstadoIngreso;
		if($startDate == ""){
			$startDate = $this->date();
		}
		if($toDate == ""){
			$toDate = $this->date();
		}

		$ingresos = DB::select("SELECT id,fecha,wr,consignatario,tracking,ubicacion,peso,(CASE WHEN estado = 'PD' THEN 'PENDIENTE' WHEN estado ='CS' THEN 'CONSOLIDADO' ELSE 'CONFIRMADO' END) AS estado,awb,observaciones,users_id FROM (SELECT * FROM ingreso_almacen
					WHERE fecha BETWEEN '".$startDate."' AND '".$toDate."' AND estado='".$estado."' AND deleted_at IS NULL) AS tabla 
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


	public function GetIngresosFilterExcelConsolidar(Request $request){
		$startDate=$request->startDate;
		$toDate=$request->toDate;
		$txtSearch=$request->txtSearch;
		$txtSearch=$request->txtSearch;
		$estado=$request->estado;
		if($startDate == ""){
			$startDate = $this->date();
		}
		if($toDate == ""){
			$toDate = $this->date();
		}

		$ingresos = DB::select("SELECT id,fecha,wr,consignatario,tracking,ubicacion,peso,(CASE WHEN estado = 'PD' THEN 'PENDIENTE' WHEN estado ='CS' THEN 'CONSOLIDADO' ELSE 'CONFIRMADO' END) AS estado,awb,observaciones,users_id FROM (SELECT * FROM ingreso_almacen
					WHERE fecha BETWEEN '".$startDate."' AND '".$toDate."' AND estado='".$estado."' AND deleted_at IS NULL) AS tabla 
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
		$filename = 'REPORTE_INGRESOS_CONSOLIDADOS_'.$fechaHora;
		$reporte=Excel::create($filename, function($excel) use ($data) {
			$excel->sheet('REPORTE', function($sheet) use ($data) {
				$sheet->fromArray($data);
			});
		})->export('xls');//->store('xls', storage_path('exports'))->download('xls');
		return $filename;
	}
}