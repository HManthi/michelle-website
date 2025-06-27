<?php
// app/Http/Controllers/UserController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    public function index()   { return User::orderBy('created_at','desc')->get(); }

    public function store(Request $r)
    {
        $data = $r->validate([
            'name'     => 'required|string',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|min:6'
        ]);

        $data['password'] = Hash::make($data['password']);
        return User::create($data);
    }

    public function update(Request $r, $id)
    {
        $user = User::findOrFail($id);
        $data = $r->validate([
            'name'  => 'sometimes|required|string',
            'email' => "sometimes|required|email|unique:users,email,$id",
            'password' => 'nullable|min:4'
        ]);

        if (!empty($data['password'])) $data['password'] = Hash::make($data['password']);
        else unset($data['password']);

        $user->update($data);
        return $user;
    }

    public function destroy($id) { User::findOrFail($id)->delete(); return response()->noContent(); }
}
