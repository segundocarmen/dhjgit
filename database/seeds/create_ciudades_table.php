<?php

use Illuminate\Database\Seeder;
use App\Models\Ciudades;
class create_ciudades_table extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       	$ciudades1 = new Ciudades();
        $ciudades1->nombre='Miami';
        $ciudades1->codigo='MIA';
        $ciudades1->users_id=1;
        $ciudades1->save();

        $ciudades2 = new Ciudades();
        $ciudades2->nombre='Perú';
        $ciudades2->codigo='PER';
        $ciudades2->users_id=1;
        $ciudades2->save();
    }
}
