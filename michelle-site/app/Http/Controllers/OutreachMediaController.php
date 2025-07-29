<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OutreachMedia;
use Illuminate\Support\Facades\Storage;

class OutreachMediaController extends Controller
{
    public function index()
    {
        return OutreachMedia::orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'type' => 'required|in:image,video',
            'file' => 'required|file|max:10240'
        ]);

        $path = $request->file('file')->store('public/outreach');

        $media = OutreachMedia::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'type' => $data['type'],
            'path' => Storage::url($path)
        ]);

        return response()->json($media, 201);
    }

    public function destroy($id)
    {
        $media = OutreachMedia::findOrFail($id);
        $media->delete();
        return response()->noContent();
    }
}

