<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DatabaseController;
use Illuminate\Support\Facades\Artisan;


Route::get('/clear-cache', function () {
    Artisan::call('optimize:clear');
    return Artisan::output();
});

Route::get('/', [DatabaseController::class, 'drugLoader']);
Route::view('/about', 'about');

