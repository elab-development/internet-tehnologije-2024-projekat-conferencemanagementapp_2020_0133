<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ConferenceDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'submission_deadline' => $this->submission_deadline,
            'location' => $this->location,
            'city' => $this->city,
            'country' => $this->country,
            'type' => $this->type,
            'capacity' => $this->capacity,
            'organization' => $this->organization,
            'contact_email' => $this->contact_email,
            'contact_phone' => $this->contact_phone,
            'created_by' => $this->created_by,

            'topics' => $this->topics->pluck('name'),
            'agenda_items' => $this->agendaItems->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'description' => $item->description,
                    'start_time' => Carbon::parse($item->start_time)->toIso8601String(),
                    'end_time' => Carbon::parse($item->end_time)->toIso8601String(),
                ];
            }),
            'ticket_types' => $this->ticketTypes->map(function ($ticket) {
                return [
                    'id' => $ticket->id,
                    'name' => $ticket->name,
                    'description' => $ticket->description,
                    'price' => $ticket->price,
                    'quantity' => $ticket->quantity,
                ];
            }),
            'moderators' => $this->users->pluck('id'),
        ];
    }
}
