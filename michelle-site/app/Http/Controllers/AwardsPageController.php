<?php

namespace App\Http\Controllers;

use App\Models\AwardsPage;
use App\Models\AwardsPageImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AwardsPageController extends Controller
{
    public function index()
    {
        return AwardsPage::with('images')->orderBy('id', 'desc')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string',
            'description' => 'nullable|string',
            'images'      => 'required|array',
            'images.*'    => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        $award = AwardsPage::create([
            'title'       => $request->title,
            'description' => $request->description
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('awards-page', 'public');

                AwardsPageImage::create([
                    'awards_page_id' => $award->id,
                    'url'           => $path,
                ]);
            }
        }

        return response()->json(['message' => 'Awards entry created']);
    }

    public function destroy($id)
    {
        $item = AwardsPage::with('images')->findOrFail($id);

        foreach ($item->images as $img) {
            Storage::disk('public')->delete($img->url);  // path not url
            $img->delete();
        }

        $item->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
