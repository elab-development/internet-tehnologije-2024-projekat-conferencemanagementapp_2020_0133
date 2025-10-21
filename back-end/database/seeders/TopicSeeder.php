<?php

namespace Database\Seeders;

use App\Models\Topic;
use Illuminate\Database\Seeder;

class TopicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $topics = [
            'Artificial Intelligence',
            'Cybersecurity',
            'Data Science',
            'Cloud Computing',
            'Software Engineering',
            'Human-Computer Interaction',
            'Networking',
            'Machine Learning'
        ];

        foreach ($topics as $topicName) {
            Topic::firstOrCreate(['name' => $topicName]);
        }
    }
}
