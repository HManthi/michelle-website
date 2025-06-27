<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AwardController;

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/
Route::post('/login',  [AuthController::class, 'login']);
Route::get ('/awards', [AwardController::class, 'index']);

/*
|--------------------------------------------------------------------------
| Protected (Bearer token / Sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // authentication
    Route::post('/logout', [AuthController::class, 'logout']);

    // users
    Route::get   ('/users',       [UserController::class, 'index']);
    Route::post  ('/users',       [UserController::class, 'store']);
    Route::put   ('/users/{id}',  [UserController::class, 'update']);
    Route::delete('/users/{id}',  [UserController::class, 'destroy']);

    // awards (create / delete)
    Route::post  ('/awards',      [AwardController::class, 'store']);
    Route::delete('/awards/{id}', [AwardController::class, 'destroy']);
    Route::put('/awards/{id}', [AwardController::class, 'update']);
});
