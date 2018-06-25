<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(create_users_table::class);
        $this->call(create_proveedor_table::class);
        $this->call(create_ingreso_almacen_table::class);
        $this->call(create_aerolinea_table::class);
        $this->call(create_ciudades_table::class);
        $this->call(create_embarcador_table::class);
    }
}
