<?php

namespace App\Services;

use Carbon\Carbon;
class ModelPreparationService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public static function prepareConference($data, int $userId): array
    {
        return [
            'title' => $data['title'],
            'description' => $data['description'],
            'start_date' => $data['startDate'],
            'end_date' => $data['endDate'],
            'submission_deadline' => $data['submissionDeadline'],
            'location' => $data['location'],
            'city' => $data['city'],
            'country' => $data['country'],
            'type' => $data['type'],
            'capacity' => $data['capacity'],
            'organization' => $data['organization'],
            'contact_email' => $data['contactEmail'],
            'contact_phone' => $data['contactPhone'],
            'created_by' => $userId,
        ];
    }

    public static function prepareAgendaItem(array $item): array
    {
        return [
            'title' => $item['title'],
            'description' => $item['description'] ?? null,
            'start_time' => Carbon::parse($item['startTime'])->utc()->format('Y-m-d H:i:s'),
            'end_time' => Carbon::parse($item['endTime'])->utc()->format('Y-m-d H:i:s'),
        ];
    }

    public static function prepareTicketType(array $ticket): array
    {
        return [
            'name' => $ticket['name'],
            'description' => $ticket['description'] ?? null,
            'price' => $ticket['price'],
            'quantity' => $ticket['quantity'],
        ];
    }

    public static function preparePaper(array $paper, $filePath, $userId): array{
        return [
            'title' => $paper['title'],
            'abstract' => $paper['abstract'],
            'file_path' => $filePath,
            'conference_id' => intval($paper['conferenceId']), // mapiramo camelCase → snake_case
            'main_author_id' => $userId,
            'topic_id' => $paper['topicId'],
            'co_authors' => $paper['coAuthors'] ?? null,
        ];
    }
}
