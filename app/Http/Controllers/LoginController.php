<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Collection as Collection;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Login;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function ShowLoginForm()
    {
        return view('login');
    }
    public function logout()
    {
    	Auth::logout();
    	return Redirect('./');
    }
}
