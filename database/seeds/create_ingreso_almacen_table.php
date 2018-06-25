<?php

use Illuminate\Database\Seeder;
use App\Models\IngresoAlmacen;
class create_ingreso_almacen_table extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		$ingreso1 = new IngresoAlmacen();
		$ingreso1->fecha = date('Y-m-d');
		$ingreso1->wr = '010218-01';
		$ingreso1->consignatario = 'CARLOS UBILLUS';
		$ingreso1->tracking = '1z08e1450312495586';
		$ingreso1->ubicacion = '';
		$ingreso1->peso = 2;
		$ingreso1->awb = 'DH04984';
		$ingreso1->users_id = 1;
		$ingreso1->proveedor_id = 1;
		$ingreso1->save();
	}
}
