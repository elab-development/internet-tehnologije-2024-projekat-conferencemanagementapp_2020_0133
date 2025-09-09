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
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone' => 'required|string|max:40',
            'city' => 'required|string|max:100',
            'country' => 'required|string|max:100',
            'profileImage' => 'nullable|string|max:255',
        ];
    }

    public function validatedSnakeCase(): array
    {
        $data = $this->validated();
        return [
            'first_name' => $data['firstName'],
            'last_name'  => $data['lastName'],
            'email'      => $data['email'],
            'password'   => $data['password'],
            'phone'      => $data['phone'],
            'city'       => $data['city'],
            'country'    => $data['country'],
            'profile_image' => $data['profileImage'] ?? null,
        ];
    }

}
