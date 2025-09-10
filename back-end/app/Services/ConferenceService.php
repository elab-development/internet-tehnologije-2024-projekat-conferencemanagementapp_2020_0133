<?php

namespace App\Services;


use App\Models\Conference;
use Illuminate\Support\Facades\DB;

class ConferenceService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public static function createConference(array $data, int $userId): Conference
    {
        return DB::transaction(function () use ($data, $userId) {
            
            $conference = Conference::create(
                ModelPreparationService::prepareConference($data, $userId)
            );

            
            $conference->topics()->sync($data['topics']);

            
            foreach ($data['agendaItems'] as $item) {
                $agendaItem = ModelPreparationService::prepareAgendaItem($item);
                $conference->agendaItems()->create($agendaItem);

            }


            
            foreach ($data['ticketTypes'] as $item) {
                $ticket = ModelPreparationService::prepareTicketType($item);
                $conference->ticketTypes()->create($ticket);
            }
            

            return $conference->load(['topics', 'agendaItems', 'ticketTypes']);
        });
    }
}
