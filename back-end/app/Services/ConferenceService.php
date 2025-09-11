<?php

namespace App\Services;


use App\Models\Conference;
use Illuminate\Support\Facades\DB;
use App\Models\User;

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

            if (!empty($data['moderators'])) {
                $moderators = User::whereIn('email', $data['moderators'])
                    ->role('moderator')
                    ->get();

                $conference->users()->attach($moderators->pluck('id'));
            }

            return $conference->load(['topics', 'agendaItems', 'ticketTypes']);
        });
    }

    public static function updateConference(array $data, Conference $conference): Conference
    {
        return DB::transaction(function () use ($data, $conference) {
            $conference->update(
                ModelPreparationService::prepareConference($data, $conference->created_by)
            );

            $conference->topics()->sync($data['topics']);

            $existingAgendaIds = $conference->agendaItems()->pluck('id')->toArray();
            $newAgendaIds = [];

            
            foreach ($data['agendaItems'] as $item) {
                if (isset($item['id']) && in_array($item['id'], $existingAgendaIds)) {
                    $agenda = $conference->agendaItems()->find($item['id']);
                    $agenda->update(
                        ModelPreparationService::prepareAgendaItem($item)
                    );
                    $newAgendaIds[] = $agenda->id;
                } else {

                    $agenda = $conference->agendaItems()->create(
                        ModelPreparationService::prepareAgendaItem($item)
                    );
                    $newAgendaIds[] = $agenda->id;
                }
            }

            $toDelete = array_diff($existingAgendaIds, $newAgendaIds);
            $conference->agendaItems()->whereIn('id', $toDelete)->delete();


            $existingTicketIds = $conference->ticketTypes()->pluck('id')->toArray();
            $newTicketIds = [];

            foreach ($data['ticketTypes'] as $ticket) {
                if (isset($ticket['id']) && in_array($ticket['id'], $existingTicketIds)) {
                    $ticketType = $conference->ticketTypes()->find($ticket['id']);
                    $ticketType->update(
                        ModelPreparationService::prepareTicketType($ticket)
                    );
                    $newTicketIds[] = $ticketType->id;
                } else {
                    $ticketType = $conference->ticketTypes()->create(
                        ModelPreparationService::prepareTicketType($ticket)
                    );
                    $newTicketIds[] = $ticketType->id;
                }
            }
            $toDeleteTickets = array_diff($existingTicketIds, $newTicketIds);
            $conference->ticketTypes()->whereIn('id', $toDeleteTickets)->delete();

            return $conference;
        });
    }
}
