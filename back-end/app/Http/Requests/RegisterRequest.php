<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'required|string|max:40',
            'city' => 'required|string|max:100',
            'country' => 'required|string|max:100',
            'profile_image' => 'nullable|string|max:255',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'first_name' => $this->input('firstName'),
            'last_name' => $this->input('lastName'),
            'profile_image' => $this->input('profileImage'),
        ]);
    }
}
