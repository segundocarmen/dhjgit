<?php

use Illuminate\Database\Seeder;
use App\Models\Proveedor;
class create_proveedor_table extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $proveedor1 = new Proveedor();
		$proveedor1->proveedor = 'EBAY';
		$proveedor1->users_id = 1;
		$proveedor1->save();

		$proveedor2 = new Proveedor();
		$proveedor2->proveedor = 'AMAZON';
		$proveedor2->users_id = 1;
		$proveedor2->save();
    }
}
