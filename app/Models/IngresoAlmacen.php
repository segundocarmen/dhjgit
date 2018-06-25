<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class IngresoAlmacen extends Model
{
	use SoftDeletes;
	protected $table = 'ingreso_almacen';
	/**
		* The attributes that are mass assignable.
		*
		* @var array
	*/
	protected $fillable = [
		'fecha','wr','consignatario','tracking','ubicacion','peso','awb','users_id','observaciones','estado','proveedor_id'
	];
}
