<?php
namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    // Public route: submit contact
    public function send(Request $request)
    {
        $request->validate([
            'name' => 'required|max:100',
            'email' => 'required|email',
            'message' => 'required'
        ]);

        Contact::create($request->all());

        return response()->json(['success' => true]);
    }

    // Admin route: list contacts
    public function index()
    {
        return Contact::orderBy('created_at', 'desc')->get();
    }

    // Admin route: mark as read
    public function markRead($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->read = true;
        $contact->save();

        return response()->json(['success' => true]);
    }

   public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json(['success' => true]);
    }
}
