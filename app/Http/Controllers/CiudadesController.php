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
use App\Models\Ciudades;
use Illuminate\Http\Request;

class CiudadesController extends Controller
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

	public function GetCiudades()
	{
		$ciudades = Ciudades::all();
		$result = [
			'ciudades' => $ciudades,
			'state' => true
		];
		return $result;
	}

	public function GetCiudad(Request $request)
	{
		$ciudad = Ciudades::where('id','=',$request[0])->get();
		return $ciudad;
	}

	public function SaveCiudad(Request $request)
	{
		$idUsuario = Auth::user()->id;
		$ciudad = [
			'nombre' =>  strtoupper($request->txtNombre),
			'codigo' => strtoupper($request->txtCodigo),
			'users_id' => $idUsuario
		];
		
		$idCiudad = $request->txtIdCiudad;
		if($idCiudad == ""){
			$nuevo = new Ciudades();
			$nuevo = $nuevo->create($ciudad);
		}else{
			Ciudades::where('id', '=', $idCiudad)->update($ciudad);
		}
		
		$ciudades = $this->GetCiudades();
		
		return $ciudades;
	}


	public function GetCiudadesFilter(Request $request){
		$txtSearch=$request->txtSearch;

		$ciudades = DB::select("SELECT * FROM ciudades
					WHERE nombre LIKE '%".$txtSearch."%' 
					OR codigo LIKE '%".$txtSearch."%'");
		
		$result = [
			'ciudades' => $ciudades,
			'state' => true
		];
		return $result;
	}


	public function GetCiudadesFilterExcel(Request $request){
		$txtSearch=$request->txtSearch;

		$ciudades = DB::select("SELECT * FROM ciudades
					WHERE nombre LIKE '%".$txtSearch."%' 
					OR codigo LIKE '%".$txtSearch."%'");

		$data=json_decode(json_encode($ciudades),true);
		$fechaHora=$this->dateTime();
		$fechaHora=str_replace(':','_',$fechaHora);
		$fechaHora=str_replace('-','_',$fechaHora);
		$fechaHora=str_replace(' ','_',$fechaHora);
		$filename = 'REPORTE_CIUDADES_'.$fechaHora;
		$reporte=Excel::create($filename, function($excel) use ($data) {
			$excel->sheet('REPORTE', function($sheet) use ($data) {
				$sheet->fromArray($data);
			});
		})->export('xls');//->store('xls', storage_path('exports'))->download('xls');
		return $filename;
	}

	public function DeleteCiudad(Request $request)
	{
		$cantidad = $request->cantidad;
		$data = $request->data;
		$array = array();
		for($i=0; $i < $cantidad ; $i++){
			$id = $data[$i];
			$registro = Ciudades::findOrFail($id);
			$registro->delete();
		}

		$ciudades = $this->GetCiudades();
		return $ciudades;
	}
}
