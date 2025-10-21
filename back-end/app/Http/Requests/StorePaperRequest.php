<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePaperRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'abstract' => 'required|string',
            'file' => 'required|file|mimes:pdf,doc,docx|max:20480',
            'topicId' => 'required|exists:topics,id',
            'conferenceId' => 'required|exists:conferences,id',
            'coAuthors' => 'nullable|string',
        ];
    }
}
