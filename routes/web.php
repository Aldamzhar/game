<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\UserResultsController;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// routes/web.php


Route::middleware(['auth:sanctum', 'verified'])->get('/', [GameController::class, 'index'])->name('game');
Route::middleware(['auth:sanctum', 'verified'])->get('/leaderboard', [LeaderboardController::class, 'index'])->name('leaderboard');
Route::middleware(['auth:sanctum', 'verified'])->get('/user-results', [UserResultsController::class, 'index'])->name('user-results');

