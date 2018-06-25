<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConsolidadoPreManifiestoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('consolidado_pre_manifiesto', function (Blueprint $table) {
            $table->integer('consolidado_id')->unsigned();
            $table->integer('pre_manifiesto_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('consolidado_pre_manifiesto', function (Blueprint $table) {
            $table->foreign('consolidado_id')->references('id')->on('consolidado');
            $table->foreign('pre_manifiesto_id')->references('id')->on('pre_manifiesto');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('consolidado_pre_manifiesto');
    }
}
