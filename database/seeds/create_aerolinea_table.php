<?php

use Illuminate\Database\Seeder;
use App\Models\Aerolinea;
class create_aerolinea_table extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $aerolinea1 = new Aerolinea();
        $aerolinea1->nombre='Latam Airlines';
        $aerolinea1->nombreCorto='Lan';
        $aerolinea1->users_id=1;
        $aerolinea1->save();
    }
}
