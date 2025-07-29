<?php
namespace App\Http\Controllers;
use App\Models\ContactSetting;
use Illuminate\Http\Request;
class ContactSettingController extends Controller {
  public function show(){
    $s = ContactSetting::first();
    return response()->json(['email'=>$s->email ?? '']);
  }
  public function store(Request $r){
    $r->validate(['email'=>'required|email']);
    ContactSetting::updateOrCreate([], ['email'=>$r->email]);
    return response()->json(['saved'=>true]);
  }
}
