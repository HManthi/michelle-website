<?php

// app/Http/Controllers/DashboardController.php
namespace App\Http\Controllers;

use App\Models\Award;
use App\Models\SocialWork;
use App\Models\EducationGallery;
use App\Models\Gallery;
use App\Models\Video;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats()
    {
        $videos = Video::all();
        $videoCategories = [
            'dramas' => $videos->where('category', 'dramas')->count(),
            'movies' => $videos->where('category', 'movies')->count(),
            'songs' => $videos->where('category', 'songs')->count(),
            'musical' => $videos->where('category', 'musical')->count(),
        ];

        return response()->json([
            'awards' => Award::count(),
            'social_works' => SocialWork::count(),
            'totalUsers' => User::count(),
            'education_galleries' => EducationGallery::count(),            
            'galleries' => Gallery::count(),
            'videos' => $videoCategories
        ]);
    }
}
