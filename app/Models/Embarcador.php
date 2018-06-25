<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Embarcador extends Model
{
    use SoftDeletes;
	protected $table = 'embarcador';

	protected $fillable = [
		'nombre','users_id'
	];
}
