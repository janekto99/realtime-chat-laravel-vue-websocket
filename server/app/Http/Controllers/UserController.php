<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getUsers(): Collection
    {
        return User::query()
            ->where('id', '!=', Auth::id())
            ->get();
    }
}
