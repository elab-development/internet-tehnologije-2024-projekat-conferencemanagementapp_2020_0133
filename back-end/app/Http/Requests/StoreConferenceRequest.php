<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;



/**
 * @method \App\Models\User user()
 */
class StoreConferenceRequest extends FormRequest
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
            'description' => 'nullable|string',
            'startDate' => 'required|date',
            'endDate' => 'required|date|after_or_equal:startDate',
            'submissionDeadline' => 'required|date|before_or_equal:startDate',
            'location' => 'required|string|max:255',
            'city' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'type' => 'required|in:conference,seminar,webinar,workshop,trade_show_expo,professional_development_event,other',
            'capacity' => 'nullable|integer|min:1',
            'organization' => 'nullable|string|max:255',
            'contactEmail' => 'required|email',
            'contactPhone' => 'nullable|string|max:50',

            // Topics
            'topics' => 'required|array|min:1',
            'topics.*' => 'required|exists:topics,id',

            // Agenda Items
            'agendaItems' => 'required|array|min:1',
            'agendaItems.*.title' => 'required|string|max:255',
            'agendaItems.*.description' => 'nullable|string',
            'agendaItems.*.startTime' => 'required|date_format:Y-m-d\TH:i:sP',
            'agendaItems.*.endTime' => 'required|date_format:Y-m-d\TH:i:sP|after_or_equal:agendaItems.*.startTime',

            // Ticket Types
            'ticketTypes' => 'required|array|min:1',
            'ticketTypes.*.name' => 'required|string|max:255',
            'ticketTypes.*.description' => 'nullable|string',
            'ticketTypes.*.price' => 'required|numeric|min:0',
            'ticketTypes.*.quantity' => 'required|integer|min:1',
        ];
    }
}
