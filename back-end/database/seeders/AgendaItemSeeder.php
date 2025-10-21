<?php

namespace Database\Seeders;

use App\Models\Conference;
use App\Models\User;
use App\Models\AgendaItem;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class AgendaItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $conferences = Conference::all();
        $speakers = User::role('attender')->get();

        $durations = [
            'lecture' => 60,
            'paper_presentation' => 45,
            'workshop' => 90,
            'panel' => 60,
            'break' => 15,
        ];

        foreach ($conferences as $conference) {
            $start = Carbon::parse($conference->start_date)->setTime(9, 0); 
            
            for ($i = 0; $i < 5; $i++) {
                $type = ['lecture', 'paper_presentation', 'workshop', 'panel', 'break'][rand(0, 4)];
                $speaker = $type === 'break' ? null : $speakers->random()->id;

                $agendaStart = $start;
                $agendaEnd = $agendaStart->copy()->addMinutes($durations[$type]);
                $start = $agendaEnd;
                AgendaItem::create([
                    'conference_id' => $conference->id,
                    'title' => ucfirst($type) . " #" . ($i + 1),
                    'description' => "Description for " . $type,
                    'speaker_id' => $speaker,
                    'type' => $type,
                    'start_time' => $agendaStart,
                    'end_time' => $agendaEnd,
                ]);
            }
        }
    }
}
