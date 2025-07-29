<?php

namespace App\Http\Controllers;

use App\Models\EducationGallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EducationGalleryController extends Controller
{
    public function index()
    {
        return EducationGallery::orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:image,video',
            'source' => 'required|in:upload,facebook',
            'url' => $request->source === 'upload' ? 'required|file|mimes:jpeg,png,jpg,mp4,mov,avi' : 'required|url'
        ]);

        if ($request->source === 'upload') {
            $file = $request->file('url');
            $path = $file->store('education-gallery', 'public');
            $data['url'] = $path;
        }

        return EducationGallery::create($data);
    }

    public function destroy($id)
    {
        $item = EducationGallery::findOrFail($id);

        // delete uploaded file if stored locally
        if ($item->source === 'upload' && Storage::disk('public')->exists($item->url)) {
            Storage::disk('public')->delete($item->url);
        }

        $item->delete();
        return response()->noContent();
    }

    public function update(Request $request, $id)
{
    $entry = EducationGallery::findOrFail($id);

    $data = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'type' => 'required|in:image,video',
        'source' => 'required|in:upload,facebook',
        'url' => $request->source === 'upload' ? 'nullable|file|mimes:jpeg,png,jpg,mp4,mov,avi' : 'required|url'
    ]);

    if ($request->source === 'upload' && $request->hasFile('url')) {
        // delete old file if exists
        if ($entry->url && Storage::disk('public')->exists($entry->url)) {
            Storage::disk('public')->delete($entry->url);
        }

        $file = $request->file('url');
        $path = $file->store('education-gallery', 'public');
        $data['url'] = $path;
    }

    $entry->update($data);
    return response()->json($entry);
}

}
