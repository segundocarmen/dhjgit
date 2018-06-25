<?php

use Illuminate\Database\Seeder;
use App\User;
class create_users_table extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $usuario1 = new User();
		$usuario1->name = 'SEGUNDO CARMEN DOMINGUEZ';
		$usuario1->email = 'segundocardom@gmail.com';
		$usuario1->password = Hash::make('45629406');
		$usuario1->save();
    }
}
