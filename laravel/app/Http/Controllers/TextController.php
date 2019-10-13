<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TextController extends Controller
{
    public function index()
    {
      return response()->json(['name' => '山田太郎', 'gender' => '男','mail' => 'yamada@test.com']);
    }

}
