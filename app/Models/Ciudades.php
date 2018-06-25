<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Ciudades extends Model
{
    use SoftDeletes;
	protected $table = 'ciudades';

	protected $fillable = [
		'nombre','codigo','users_id'
	];
}
