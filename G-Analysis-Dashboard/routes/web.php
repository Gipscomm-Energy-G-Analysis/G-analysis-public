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

Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
Route::get('/dashboard/charts', [\App\Http\Controllers\ChartController::class, 'index'])->name('charts');
Route::get('/dashboard/table', [\App\Http\Controllers\TableController::class, 'index'])->name('tables');
Route::post('/dashboard/machine', [\App\Http\Controllers\DashboardController::class, 'getMachineDetail'])->name('machineDetails');
Route::post('/dashboard/getMachineTableData', [\App\Http\Controllers\DashboardController::class, 'getMachineTableData'])->name('getMachineTableData');
Route::get('/product/data-table', [\App\Http\Controllers\TableController::class, 'getProductDataTable'])
    ->name('getProductDataTable');
Route::get('/charts-donut-ajax', [\App\Http\Controllers\ChartController::class, 'getEnergyConsumptionPerMachine'])
    ->name('getEnergyConsumptionPerMachine');
Route::get('/charts-bar-ajax', [\App\Http\Controllers\ChartController::class, 'getGoodsBarCharts'])
    ->name('getGoodsBarCharts');
Route::post('/switch-database', [\App\Http\Controllers\ManageDatabaseController::class, 'switchDatabase'])
    ->name('switchDatabase');
Route::post('/uploadImage', [\App\Http\Controllers\UploadImageController::class, 'imageUpload'])->name('imageUpload');
Route::post('/graph/filter', [\App\Http\Controllers\DashboardController::class, 'getChartsData'])->name('getChartsData');
