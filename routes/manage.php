<?php

use App\Http\Controllers\Manage\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {

    Route::get('manage/users', [UserController::class, 'index'])->name('users.index');

});
