<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConsolidadoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('consolidado', function (Blueprint $table) {
            $table->increments('id');
            $table->string('consignatario', 200);
            $table->string('contenido', 200)->nullable();
            $table->string('indicaciones', 200)->nullable();
            $table->string('notas', 200)->nullable();
            $table->decimal('valor', 10, 2)->nullable();
            $table->decimal('peso', 10, 2)->nullable();
            $table->integer('piezas' )->nullable();
            $table->string('observaciones', 200)->nullable();
            $table->string('estado', 2)->default('PD');
            $table->date('fecha');
            $table->integer('users_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();
        });


        Schema::table('consolidado', function (Blueprint $table) {
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
        Schema::dropIfExists('consolidado');
    }
}
