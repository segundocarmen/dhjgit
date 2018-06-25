<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Consolidado extends Model
{
	use SoftDeletes;
	protected $table = 'consolidado';
	/**
		* The attributes that are mass assignable.
		*
		* @var array
	*/
	protected $fillable = [
		'consignatario','contenido','indicaciones','notas','valor','peso','piezas','users_id','observaciones','fecha'
	];
}
