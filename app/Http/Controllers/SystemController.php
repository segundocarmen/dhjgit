<?php

namespace App\Http\Controllers;

use App\Models\System;
use Illuminate\Http\Request;

class SystemController extends Controller
{
    public function ShowSystem()
    {
        return view('sistema');
    }
}
