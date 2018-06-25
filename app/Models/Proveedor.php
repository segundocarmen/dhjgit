<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
	use SoftDeletes;
	protected $table = 'proveedores';
	/**
		* The attributes that are mass assignable.
		*
		* @var array
	*/
	protected $fillable = [
		'proveedor','users_id'
	];
}
