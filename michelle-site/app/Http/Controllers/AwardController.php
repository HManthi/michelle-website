<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Award;


class AwardController extends Controller
{
    public function index()
    {
        return response()->json(Award::orderBy('year', 'desc')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'year' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $award = Award::create($request->all());

        return response()->json($award, 201);
    }

    public function update(Request $request, $id)
        {
            $award = Award::findOrFail($id);
            $request->validate([
                'title' => 'required',
                'year' => 'nullable|string',
                'description' => 'nullable|string',
            ]);
            $award->update($request->all());
            return response()->json($award);
        }

    public function destroy($id)
    {
        $award = Award::findOrFail($id);
        $award->delete();

        return response()->json(['message' => 'Award deleted']);
    }
}

?>