<?php

use Illuminate\Database\Seeder;
use App\Models\Embarcador;
class create_embarcador_table extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $embarcador1 = new Embarcador();
        $embarcador1->nombre='ALL CARRIER';
        $embarcador1->users_id=1;
        $embarcador1->save();
    }
}
