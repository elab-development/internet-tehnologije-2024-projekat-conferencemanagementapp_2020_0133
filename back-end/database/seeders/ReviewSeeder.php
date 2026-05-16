<?php

namespace Database\Seeders;

use App\models\Paper;
use App\models\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Paper::all()->each(function ($paper) {
            
            $moderators = $paper->conference->moderators;

            if ($moderators->isEmpty()) {
                return; 
            }

            $moderator = $moderators->random();

            Review::factory()->create([
                'paper_id' => $paper->id,
                'reviewer_id' => $moderator->id,
                'recommendation' => ['Accept', 'Reject'][rand(0, 1)],
            ]);
        });
    }
}
