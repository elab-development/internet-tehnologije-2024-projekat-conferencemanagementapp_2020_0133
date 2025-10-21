<?php

namespace Database\Seeders;

use App\Models\Conference;
use App\Models\Topic;
use Illuminate\Database\Seeder;

class ConferenceTopicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $conferences = Conference::all();
        $topics = Topic::all();

        foreach ($conferences as $conference) {

            $conference->topics()->sync(
                $topics->random(rand(2, 4))->pluck('id')->toArray()
            );
        }
    }
}
