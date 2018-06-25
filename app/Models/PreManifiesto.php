<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class PreManifiesto extends Model
{
    use SoftDeletes;
	protected $table = 'pre_manifiesto';
	/**
		* The attributes that are mass assignable.
		*
		* @var array
	*/
	protected $fillable = [
		'autogenerado','embarcador_id','awb_guia','aerolinea_id','consignatario','direccion_destino','from_ciudades_id','to_ciudades_id','vuelo','fecha','users_id'
	];
}
