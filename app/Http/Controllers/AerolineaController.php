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
use App\Models\Aerolinea;
use Illuminate\Http\Request;

class AerolineaController extends Controller
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

	public function GetAerolineas()
	{
		$aerolinea = Aerolinea::all();
		$result = [
			'aerolineas' => $aerolinea,
			'state' => true
		];
		return $result;
	}

	public function GetAerolinea(Request $request)
	{
		$aerolinea = Aerolinea::where('id','=',$request[0])->get();
		return $aerolinea;
	}

	public function SaveAerolinea(Request $request)
	{
		$idUsuario = Auth::user()->id;
		$aerolinea = [
			'nombre' =>  strtoupper($request->txtNombre),
			'nombreCorto' => strtoupper($request->txtNombreCorto),
			'users_id' => $idUsuario
		];
		
		$idAerolinea = $request->txtIdAerolinea;
		if($idAerolinea == ""){
			$nuevo = new Aerolinea();
			$nuevo = $nuevo->create($aerolinea);
		}else{
			Aerolinea::where('id', '=', $idAerolinea)->update($aerolinea);
		}
		
		$aerolinea = $this->GetAerolineas();
		
		return $aerolinea;
	}


	public function GetAerolineasFilter(Request $request){
		$txtSearch=$request->txtSearch;

		$aerolinea = DB::select("SELECT * FROM aerolinea
					WHERE nombre LIKE '%".$txtSearch."%' 
					OR nombreCorto LIKE '%".$txtSearch."%'");
		
		$result = [
			'aerolineas' => $aerolinea,
			'state' => true
		];
		return $result;
	}


	public function GetAerolineasFilterExcel(Request $request){
		$txtSearch=$request->txtSearch;

		$aerolinea = DB::select("SELECT * FROM aerolinea
					WHERE nombre LIKE '%".$txtSearch."%' 
					OR nombreCorto LIKE '%".$txtSearch."%'");

		$data=json_decode(json_encode($aerolinea),true);
		$fechaHora=$this->dateTime();
		$fechaHora=str_replace(':','_',$fechaHora);
		$fechaHora=str_replace('-','_',$fechaHora);
		$fechaHora=str_replace(' ','_',$fechaHora);
		$filename = 'REPORTE_AEROLINEAS_'.$fechaHora;
		$reporte=Excel::create($filename, function($excel) use ($data) {
			$excel->sheet('REPORTE', function($sheet) use ($data) {
				$sheet->fromArray($data);
			});
		})->export('xls');//->store('xls', storage_path('exports'))->download('xls');
		return $filename;
	}

	public function DeleteAerolinea(Request $request)
	{
		$cantidad = $request->cantidad;
		$data = $request->data;
		$array = array();
		for($i=0; $i < $cantidad ; $i++){
			$id = $data[$i];
			$registro = Aerolinea::findOrFail($id);
			$registro->delete();
		}

		$aerolinea = $this->GetAerolineas();
		return $aerolinea;
	}
}
