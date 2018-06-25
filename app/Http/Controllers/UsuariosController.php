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
use App\User;
use Illuminate\Http\Request;

class UsuariosController extends Controller
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

	public function GetUsuarios()
	{
		$usuarios = User::all();
		$result = [
			'usuarios' => $usuarios,
			'state' => true
		];
		return $result;
	}

	public function GetUsuario(Request $request)
	{
		$usuario = User::where('id','=',$request[0])->get();
		return $usuario;
	}

	public function SaveUsuario(Request $request)
	{
		$usuario = [
			'name' =>  strtoupper($request->txtNombre),
			'email' => $request->txtCorreo,
			'password' => Hash::make($request->txtClave)
		];
		
		$idUsuario = $request->txtIdUsuario;
		if($idUsuario == ""){
			$nuevo = new User();
			$nuevo = $nuevo->create($usuario);
		}else{
			User::where('id', '=', $idUsuario)->update($usuario);
		}
		
		$usuarios = $this->GetUsuarios();
		
		return $usuarios;
	}


	public function GetUsuariosFilter(Request $request){
		$txtSearch=$request->txtSearch;

		$usuarios = DB::select("SELECT * FROM users
					WHERE name LIKE '%".$txtSearch."%' 
					OR email LIKE '%".$txtSearch."%'");
		
		$result = [
			'usuarios' => $usuarios,
			'state' => true
		];
		return $result;
	}


	public function GetUsuariosFilterExcel(Request $request){
		$txtSearch=$request->txtSearch;

		$usuarios = DB::select("SELECT * FROM users
					WHERE name LIKE '%".$txtSearch."%' 
					OR email LIKE '%".$txtSearch."%'");

		$data=json_decode(json_encode($usuarios),true);
		$fechaHora=$this->dateTime();
		$fechaHora=str_replace(':','_',$fechaHora);
		$fechaHora=str_replace('-','_',$fechaHora);
		$fechaHora=str_replace(' ','_',$fechaHora);
		$filename = 'REPORTE_USUARIOS_'.$fechaHora;
		$reporte=Excel::create($filename, function($excel) use ($data) {
			$excel->sheet('REPORTE', function($sheet) use ($data) {
				$sheet->fromArray($data);
			});
		})->export('xls');//->store('xls', storage_path('exports'))->download('xls');
		return $filename;
	}

	public function DeleteUsuario(Request $request)
	{
		$cantidad = $request->cantidad;
		$data = $request->data;
		$array = array();
		for($i=0; $i < $cantidad ; $i++){
			$id = $data[$i];
			$registro = User::findOrFail($id);
			$registro->delete();
		}

		$ciudades = $this->GetUsuarios();
		return $ciudades;
	}
}
