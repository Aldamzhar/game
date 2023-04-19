<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResultController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'time' => 'required|integer'
        ]);

        $result = new Result([
            'user_id' => Auth::id(),
            'time' => $request->time
        ]);

        $result->save();

        return response()->json(['message' => 'Result saved successfully.']);
    }

    public function userResults()
    {
        $results = Result::where('user_id', Auth::id())->get();
        return response()->json($results);
    }

    public function leaderboard()
    {
        $results = Result::with('user')->orderBy('time')->get();
        return response()->json($results);
    }
}
