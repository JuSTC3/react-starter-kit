<?php

namespace App\Http\Controllers\Manage;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manage\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of users with pagination and search.
     */
    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $users = User::query()
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('manage/users/index', [
            'users' => $users,
            'filters' => ['search' => $search],
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create(): Response
    {
        return Inertia::render('manage/users/create');
    }

    /**
     * Store a newly created user in the database.
     */
    public function store(UserRequest $request)
    {
        $validated = $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    /**
     * Display the specified user.
     */
    public function show(User $user): Response
    {
        return Inertia::render('manage/users/show', [
            'user' => $user,
        ]);
    }

    /**
     * Show the form for editing a user.
     */
    public function edit(User $user): Response
    {
        return Inertia::render('manage/users/edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified user in the database.
     */
    public function update(UserRequest $request, User $user)
    {
        $validated = $request->validated();

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'] ? Hash::make($validated['password']) : $user->password,
        ]);

        return redirect()->route('manage.users.index')->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified user from the database.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('manage.users.index')->with('success', 'User deleted successfully.');
    }
}
