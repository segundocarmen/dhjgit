<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Aerolinea extends Model
{
    use SoftDeletes;
	protected $table = 'aerolinea';

	protected $fillable = [
		'nombre','nombreCorto','users_id'
	];
}
