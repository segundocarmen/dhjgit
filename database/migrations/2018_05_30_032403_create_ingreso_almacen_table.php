<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIngresoAlmacenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ingreso_almacen', function (Blueprint $table) {
            $table->increments('id');
            $table->date('fecha');
            $table->string('wr', 15);
            $table->string('consignatario', 200);
            $table->string('tracking', 50);
            $table->string('ubicacion', 200)->nullable();
            $table->decimal('peso', 10, 2);
            $table->string('awb', 20);
            $table->string('estado', 2)->default('PD');
            $table->mediumText('observaciones')->nullable();
            $table->integer('users_id')->unsigned();
            $table->integer('proveedor_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('ingreso_almacen', function (Blueprint $table) {
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
        Schema::dropIfExists('ingreso_almacen');
    }
}
