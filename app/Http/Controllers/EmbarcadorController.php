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
use App\Models\Embarcador;
use Illuminate\Http\Request;

class EmbarcadorController extends Controller
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

	public function GetEmbarcadores()
	{
		$embarcadores = Embarcador::all();
		$result = [
			'embarcadores' => $embarcadores,
			'state' => true
		];
		return $result;
	}

	public function GetEmbarcador(Request $request)
	{
		$embarcador = Embarcador::where('id','=',$request[0])->get();
		return $embarcador;
	}

	public function SaveEmbarcador(Request $request)
	{
		$idUsuario = Auth::user()->id;
		$embarcador = [
			'nombre' =>  strtoupper($request->txtNombre),
			'users_id' => $idUsuario
		];
		
		$idEmbarcador = $request->txtIdEmbarcador;
		if($idEmbarcador == ""){
			$nuevo = new Embarcador();
			$nuevo = $nuevo->create($embarcador);
		}else{
			Embarcador::where('id', '=', $idEmbarcador)->update($embarcador);
		}
		
		$embarcadores = $this->GetEmbarcadores();
		
		return $embarcadores;
	}


	public function GetEmbarcadoresFilter(Request $request){
		$txtSearch=$request->txtSearch;

		$embarcadores = DB::select("SELECT * FROM embarcador WHERE nombre LIKE '%".$txtSearch."%'");
		
		$result = [
			'embarcadores' => $embarcadores,
			'state' => true
		];
		return $result;
	}


	public function GetEmbarcadoresFilterExcel(Request $request){
		$txtSearch=$request->txtSearch;

		$embarcadores = DB::select("SELECT * FROM embarcador WHERE nombre LIKE '%".$txtSearch."%'");

		$data=json_decode(json_encode($embarcadores),true);
		$fechaHora=$this->dateTime();
		$fechaHora=str_replace(':','_',$fechaHora);
		$fechaHora=str_replace('-','_',$fechaHora);
		$fechaHora=str_replace(' ','_',$fechaHora);
		$filename = 'REPORTE_EMBARCADORES_'.$fechaHora;
		$reporte=Excel::create($filename, function($excel) use ($data) {
			$excel->sheet('REPORTE', function($sheet) use ($data) {
				$sheet->fromArray($data);
			});
		})->export('xls');//->store('xls', storage_path('exports'))->download('xls');
		return $filename;
	}

	public function DeleteEmbarcador(Request $request)
	{
		$cantidad = $request->cantidad;
		$data = $request->data;
		$array = array();
		for($i=0; $i < $cantidad ; $i++){
			$id = $data[$i];
			$registro = Embarcador::findOrFail($id);
			$registro->delete();
		}

		$embarcadores = $this->GetEmbarcadores();
		return $embarcadores;
	}
}
