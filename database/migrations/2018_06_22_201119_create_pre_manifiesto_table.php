<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePreManifiestoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pre_manifiesto', function (Blueprint $table) {
            $table->increments('id');
            $table->string('autogenerado', 10);
            $table->integer('embarcador_id')->unsigned();
            $table->string('awb_guia', 20);
            $table->integer('aerolinea_id')->unsigned();
            $table->string('consignatario', 200);
            $table->string('direccion_destino', 200);
            $table->integer('from_ciudades_id')->unsigned();
            $table->integer('to_ciudades_id')->unsigned();
            $table->string('vuelo', 200);
            $table->date('fecha');
            $table->integer('users_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('pre_manifiesto', function (Blueprint $table) {
            $table->foreign('embarcador_id')->references('id')->on('embarcador');
            $table->foreign('aerolinea_id')->references('id')->on('aerolinea');
            $table->foreign('from_ciudades_id')->references('id')->on('ciudades');
            $table->foreign('to_ciudades_id')->references('id')->on('ciudades');
            $table->foreign('users_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pre_manifiesto');
    }
}