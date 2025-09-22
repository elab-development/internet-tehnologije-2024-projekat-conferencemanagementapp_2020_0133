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
            'id' => $this['id'],
            'title' => $this['title'],
            'city' => $this['city'],
            'country' => $this['country'],
            'topics' => $this['topics']->map(function ($item) {
                return (object)[
                    'id' => $item['id'],
                    'name' => $item['name']
                ];
            }),
            'startDate' => Carbon::parse($this['start_date'])->toIso8601String(),
            'endDate' => Carbon::parse($this['end_date'])->toIso8601String(),
        ];
    }
}
