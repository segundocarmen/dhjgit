<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAerolineaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aerolinea', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre', 200);
            $table->string('nombreCorto', 20);
            $table->integer('users_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('aerolinea', function (Blueprint $table) {
            $table->foreign('users_id')->references('id')->on('users');
            //$table->foreign('proveedor_id')->references('id')->on('proveedores');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('aerolinea');
    }
}
