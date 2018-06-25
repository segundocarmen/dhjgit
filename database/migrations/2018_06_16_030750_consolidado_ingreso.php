<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ConsolidadoIngreso extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('consolidado_ingreso', function (Blueprint $table) {
            $table->integer('consolidado_id')->unsigned();
            $table->integer('ingreso_almacen_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();
        });


        Schema::table('consolidado_ingreso', function (Blueprint $table) {
            $table->foreign('consolidado_id')->references('id')->on('consolidado');
            $table->foreign('ingreso_almacen_id')->references('id')->on('ingreso_almacen');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
