<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class ConsolidadoIngreso extends Model
{
	use SoftDeletes;
	protected $table = 'consolidado_ingreso';
	/**
		* The attributes that are mass assignable.
		*
		* @var array
	*/
	protected $fillable = [
		'consolidado_id','ingreso_almacen_id'
	];
}




