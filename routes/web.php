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

// routes/web.php

Route::get('/check-session', function () {
    return response()->json([
        'logged_in' => session('logged_in'),
        'all' => session()->all(),
    ]);
});
