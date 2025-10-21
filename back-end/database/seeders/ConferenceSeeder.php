<?php

namespace Database\Seeders;

use App\Models\Conference;
use App\Models\User;
use Illuminate\Database\Seeder;

class ConferenceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $organizers = User::role('organizer')->get();
        $moderators = User::role('moderator')->get(); 

        foreach ($organizers as $organizer) {

            $conferences = Conference::factory()->count(290)->create([
                'created_by' => $organizer->id,
            ]);

            foreach ($conferences as $conference) {

                $assignedModerators = $moderators->random(rand(1, min(3, $moderators->count())))->pluck('id');
                $conference->moderators()->attach($assignedModerators);
            }
        }
    }
}
