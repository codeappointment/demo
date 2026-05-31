<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\DatabaseController;
use Spatie\Browsershot\Browsershot;

// Route::get('/', function () {
//     return view('welcome');
// });

// Route::get('/welcome2', function () {
//     return view('welcome2');
// });

Route::get('/', [DatabaseController::class, 'drugLoader']);

Route::get('/forms', function () {
    return view('forms', [
        'result' => '',
        'id_num1' => '',
    ]);
})->name('forms');

Route::post('/forms', function (Request $request) {
    $num1 = $request->input('post_num1');

    return view('forms', [
        'result' => $num1,
        'id_num1' => $num1,
    ]);
});

Route::get('/welcome2', [DatabaseController::class, 'dbLoader']);

Route::get('/welcome', function () {
    Browsershot::url('https://grenyt.com')->save('example.pdf');
    return view('welcome');
});
