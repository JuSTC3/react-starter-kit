<?php

namespace App\Http\Requests\Manage;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:2',
            'email' => 'required|email|unique:users,email,' . $this->route('manage/user'),
            'password' => 'nullable|min:6|confirmed',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
