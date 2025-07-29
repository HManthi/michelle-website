<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index()
    {
        return Gallery::with('images')->orderBy('id', 'desc')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'images.*' => 'required|image|max:2048'
        ]);

        $gallery = Gallery::create([
            'title' => $request->title,
            'description' => $request->description
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('gallery', 'public');

                GalleryImage::create([
                    'gallery_id' => $gallery->id,
                    'url' => $path
                ]);
            }
        }

        return response()->json(['message' => 'Gallery entry created']);
    }

    public function destroy($id)
    {
        $entry = Gallery::with('images')->findOrFail($id);

        foreach ($entry->images as $img) {
            Storage::disk('public')->delete($img->url);
            $img->delete();
        }

        $entry->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
