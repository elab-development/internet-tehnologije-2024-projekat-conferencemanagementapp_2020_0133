<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Conference;
use App\Models\Paper;
use Illuminate\Database\Seeder;

class PaperSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $authors = User::role('attender')->get();
        $conferences = Conference::all();

        foreach ($conferences as $conference) {
            $topics = $conference->topics;

            $authors->random(rand(2, 5))->each(function ($author) use ($conference, $topics) {
                Paper::factory()->create([
                    'main_author_id' => $author->id,
                    'conference_id' => $conference->id,
                    'topic_id' => $topics->random()->id,
                ]);
            });
        }
    }
}
