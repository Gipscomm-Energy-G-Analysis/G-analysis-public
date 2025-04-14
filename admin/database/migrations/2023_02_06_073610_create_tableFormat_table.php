<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tableFormat', function (Blueprint $table) {
            $table->id();
            $table->integer('number_records')->nullable();        
            $table->integer('pages_count')->nullable();        
            $table->integer('page_value')->nullable();        
            $table->string('type')->nullable();        
            $table->string('row_click')->nullable();        
            $table->text('query_data_records')->nullable();       
            $table->text('query_max_val')->nullable();       
            $table->string('tile_title')->nullable();        
            $table->text('tile_html')->nullable();       
            $table->integer('height')->nullable();   
            $table->integer('width')->nullable();   
            $table->integer('input_height')->nullable();   
            $table->integer('input_width')->nullable();   
            $table->string('tile_record_type')->nullable();        
            $table->string('tile_data_type')->nullable();        
            $table->string('username')->nullable();        
            $table->integer('mst_id')->nullable();   
            $table->string('table_other')->nullable();        
            $table->integer('priority')->nullable();   
            $table->string('chart_filter')->nullable();        
            $table->string('chart_type')->nullable();        
            $table->string('chart_time_interval')->nullable();        
            $table->integer('expand_view')->nullable();   
            $table->integer('outside_tile_checkbox')->nullable();   
            $table->integer('outside_tile_input_height')->nullable();   
            $table->integer('outside_tile_input_width')->nullable();   
            $table->integer('outside_tile_chart_display')->nullable();   
            $table->integer('outer_table_column_limit')->nullable();   
            $table->integer('prd_anlagen_config_id')->nullable();   
            $table->string('database_name')->nullable();        
            $table->text('prd_all_columns_automatic')->nullable();       
            $table->text('prd_all_columns_type_automatic')->nullable();       
            $table->string('database_table')->nullable();        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tableFormat');
    }
};
