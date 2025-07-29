<?php

namespace App\Http\Controllers;

use App\Models\SocialWork;
use App\Models\SocialWorkImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SocialWorkController extends Controller
{
    public function index()
        {
            return SocialWork::with('images')->orderBy('id', 'desc')->get();
        }

   public function store(Request $request)
{
    $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

    $socialWork = SocialWork::create([
        'title' => $request->title,
        'description' => $request->description
    ]);

    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $image) {
            $path = $image->store('social-work', 'public');

            SocialWorkImage::create([
                'social_work_id' => $socialWork->id,
                'path' => $path,
            ]);
        }
    }

    return response()->json(['message' => 'Social work entry created']);
}

    public function destroy($id)
    {
        $item = SocialWork::with('images')->findOrFail($id);

        foreach ($item->images as $img) {
            Storage::disk('public')->delete($img->url);
            $img->delete();
        }

        $item->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
