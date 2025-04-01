<?php

use App\Http\Controllers\Manage\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::resources([
        'manage/users' => UserController::class,
    ]);
});
