<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    // Optional: Only allow authenticated users
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Admin dashboard info (extend this as needed).
     */
    public function dashboard()
    {
        return response()->json([
            'message' => 'Welcome to the Admin Dashboard',
            // You can add counts or stats here, e.g.:
            // 'users' => User::count(),
            // 'awards' => Award::count(),
        ]);
    }

    /**
     * Example: Get contact email setting
     */
    public function getContactEmail()
    {
        $email = setting('contact_email'); // Assume you're using a settings system
        return response()->json(['email' => $email]);
    }

    /**
     * Example: Update contact email setting
     */
    public function updateContactEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        // Save setting to DB or config file
        setting(['contact_email' => $request->email])->save();

        return response()->json(['message' => 'Contact email updated successfully']);
    }
}
