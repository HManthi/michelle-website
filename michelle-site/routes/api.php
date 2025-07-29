<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AwardController;
use App\Http\Controllers\OutreachMediaController;
use App\Http\Controllers\EducationGalleryController;
use App\Http\Controllers\SocialWorkController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\ContactSettingController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AwardsPageController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::post('/login', [AuthController::class, 'login']);
Route::get('/awards', [AwardController::class, 'index']);
Route::get('/education-gallery', [EducationGalleryController::class, 'index']);
Route::get('/social-work', [SocialWorkController::class, 'index']);
Route::get('/awards-page', [AwardsPageController::class, 'index']);
Route::post('/contact',[ContactController::class,'send']);

// 🔓 Make these routes public temporarily (no Sanctum)


/*
|--------------------------------------------------------------------------
| Protected Routes (Require Sanctum Token)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // auth
    Route::post('/logout', [AuthController::class, 'logout']);

    // users
    Route::get   ('/users',       [UserController::class, 'index']);
    Route::post  ('/users',       [UserController::class, 'store']);
    Route::put   ('/users/{id}',  [UserController::class, 'update']);
    Route::delete('/users/{id}',  [UserController::class, 'destroy']);

    // awards
    Route::post  ('/awards',      [AwardController::class, 'store']);
    Route::put   ('/awards/{id}', [AwardController::class, 'update']);
    Route::delete('/awards/{id}', [AwardController::class, 'destroy']);

    // outreach media
    Route::get   ('/outreach-media',          [OutreachMediaController::class, 'index']);
    Route::post  ('/outreach-media',          [OutreachMediaController::class, 'store']);
    Route::delete('/outreach-media/{id}',     [OutreachMediaController::class, 'destroy']);

    // education gallery
    Route::post   ('/education-gallery',      [EducationGalleryController::class, 'store']);
    Route::post   ('/education-gallery/{id}', [EducationGalleryController::class, 'update']); // uses _method=PUT
    Route::delete ('/education-gallery/{id}', [EducationGalleryController::class, 'destroy']);

    Route::post('/social-work', [SocialWorkController::class, 'store']);
    Route::delete('/social-work/{id}', [SocialWorkController::class, 'destroy']);

    Route::get('/gallery', [GalleryController::class, 'index']);
    Route::post('/gallery', [GalleryController::class, 'store']);
    Route::delete('/gallery/{id}', [GalleryController::class, 'destroy']);

    Route::get('/videos', [VideoController::class, 'index']);
    Route::post('/videos', [VideoController::class, 'store']);
    Route::delete('/videos/{id}', [VideoController::class, 'destroy']);

    Route::get('/contact-settings',[ContactSettingController::class,'show']);
    Route::post('/contact-settings',[ContactSettingController::class,'store']); 

    Route::get('/admin/contacts', [ContactController::class, 'index']);
    Route::post('/admin/contacts/{id}/mark-read', [ContactController::class, 'markRead']);
    Route::delete('/admin/contacts/{id}', [ContactController::class, 'destroy']);

    Route::middleware('auth:sanctum')->get('/dashboard-stats', [DashboardController::class, 'stats']);

    Route::post('/awards-page', [AwardsPageController::class, 'store']);
    Route::delete('/awards-page/{id}', [AwardsPageController::class, 'destroy']);





});
