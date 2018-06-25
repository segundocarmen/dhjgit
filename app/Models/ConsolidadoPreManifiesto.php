<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class ConsolidadoPreManifiesto extends Model
{
    protected $table = 'consolidado_pre_manifiesto';
	/**
		* The attributes that are mass assignable.
		*
		* @var array
	*/
	protected $fillable = [
		'consolidado_id','pre_manifiesto_id'
	];
}
