<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(['middleware' => ['json.response']], function() {

    Route::middleware('auth:api')->get('/user', function (Request $request) {
        return $request->user();
    });

    //Public routes
//    Route::post('/register', 'AuthController@register')->name('api.register');
    Route::post('/login', 'AuthController@login')->name('api.login');

    //Private routes
    Route::middleware('auth:api')->group(function() {
        Route::post('/', 'HomeController@index')->name('home');
        Route::get('/logout', 'AuthController@logout')->name('logout');

        //Only ADMIN access
        Route::middleware('check.user.role:' . \App\Role\UserRole::ROLE_ADMIN)->group(function() {
            Route::apiResource('/users', 'UserController');
        });
        Route::apiResource('/safra', 'SafraController');

        Route::put('/profile', 'UserController@updateProfile');
    });
});
