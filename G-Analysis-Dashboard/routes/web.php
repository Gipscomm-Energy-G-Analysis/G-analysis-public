<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/product-dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('product-dashboard');
Route::get('/dashboard/charts', [\App\Http\Controllers\ChartController::class, 'index'])->name('charts');
Route::get('/dashboard/table', [\App\Http\Controllers\TableController::class, 'index'])->name('tables');
Route::post('/dashboard/machine', [\App\Http\Controllers\DashboardController::class, 'getMachineDetail'])->name('machineDetails');
Route::post('/dashboard/getMachineTableData', [\App\Http\Controllers\DashboardController::class, 'getMachineTableData'])->name('getCustomTable');
Route::get('/product/data-table', [\App\Http\Controllers\TableController::class, 'getProductDataTable'])
    ->name('getProductDataTable');
Route::get('/charts-donut-ajax', [\App\Http\Controllers\ChartController::class, 'getEnergyConsumptionPerMachine'])
    ->name('getEnergyConsumptionPerMachine');
Route::get('/charts-bar-ajax', [\App\Http\Controllers\ChartController::class, 'getGoodsBarCharts'])
    ->name('getGoodsBarCharts');
Route::get('/switch-database', [\App\Http\Controllers\ManageDatabaseController::class, 'switchDatabase'])
    ->name('switchDatabase');
Route::post('/uploadImage', [\App\Http\Controllers\UploadImageController::class, 'imageUpload'])->name('imageUpload');
Route::post('/graph/filter', [\App\Http\Controllers\GraphController::class, 'getChartsData'])->name('getChartsData');
Route::post('/dashboard/propertyData', [\App\Http\Controllers\DashboardController::class, 'getPropertyData'])->name('getPropertyData');
Route::get('/dashboard/tablename', [\App\Http\Controllers\DashboardController::class, 'getAllTables'])->name('getAllTables');
Route::post('/dashboard/tableColumn', [\App\Http\Controllers\DashboardController::class, 'getTableColumns'])->name('getTableColumns');
Route::post('/dashboard/saveFields', [\App\Http\Controllers\DashboardController::class, 'saveFields'])->name('saveFields');
Route::get('/dashboard/group', [\App\Http\Controllers\DashboardController::class, 'getGroup'])->name('getGroup');
Route::post('/dashboard/saveGroupOptions', [\App\Http\Controllers\DashboardController::class, 'saveGroupOptions'])->name('saveGroupOptions');
Route::post('get-selected-configuration-data', [\App\Http\Controllers\GroupConfigurationController::class, 'getSelectedConfigurationData'])->name('getSelectedConfigurationData');
Route::post('get-configuration-data', [\App\Http\Controllers\GroupConfigurationController::class, 'getConfigurationData'])->name('getConfigurationData');
Route::post('save-configuration-data', [\App\Http\Controllers\GroupConfigurationController::class, 'saveConfigurationData'])->name('saveConfigurationData');
Route::post('get-same-type-column', [\App\Http\Controllers\GroupConfigurationController::class, 'getSameTypeColumn'])->name('getSameTypeColumn');

Route::post('get-custom-machine-data', [\App\Http\Controllers\DashboardController::class, 'getCustomTable'])->name('getCustomTable');
Route::get('get-custom-machine-columns', [\App\Http\Controllers\DashboardController::class, 'getCustomColumnName'])->name('getCustomColumnName');
Route::get('get-table-configurations', [\App\Http\Controllers\MachineConfigurationController::class, 'getMachineConfigurations'])->name('getMachineConfigurations');
Route::post('save-table-configurations', [\App\Http\Controllers\MachineConfigurationController::class, 'saveMachineConfigurations'])->name('saveMachineConfigurations');


Route::get('product-graph/{graph_id}', [\App\Http\Controllers\GraphController::class, 'showGraph'])->name('showGraph');
Route::post('product-graph/history', [\App\Http\Controllers\GraphController::class, 'historicData'])->name('historicData');
Route::get('product-graph/history/data', [\App\Http\Controllers\GraphController::class, 'historicGraph'])->name('historicGraph');
Route::post('/product-graph/save', [\App\Http\Controllers\GraphController::class, 'saveGraphConfigurations'])->name('saveGraphConfigurations');

Route::get('get-graph-configuration', [\App\Http\Controllers\GraphController::class, 'getOtherGraphData'])->name('getOtherGraphData');
Route::post('delete-graph-configuration', [\App\Http\Controllers\GraphController::class, 'deleteOtherGraphData'])->name('deleteOtherGraphData');


Route::post('/on-change', [\App\Http\Controllers\ManageDatabaseController::class, 'changeDB'])->name('onchange');

Route::post('get-other-graph-label', [\App\Http\Controllers\DashboardController::class, 'getOtherGraphLabel'])->name('getOtherGraphLabel');

Route::post('/get-points-data', [\App\Http\Controllers\GraphController::class, 'getPointsData'])->name('getPointsData');
Route::post('product-graph/history/product', [\App\Http\Controllers\DashboardController::class, 'getHistoryGraphConfigurations'])->name('getHistoryGraphConfigurations');
Route::post('mixed-graph/history/product', [\App\Http\Controllers\DashboardController::class, 'getMixedChartData'])->name('getMixedChartData');