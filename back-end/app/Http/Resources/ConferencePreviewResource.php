<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ConferencePreviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'city' => $this->city,
            'country' => $this->country,
            'topics' => $this->topics->pluck('name'),
            'startDate' => Carbon::parse($this->start_date)->format('Y-m-d'),
        ];
    }
}
