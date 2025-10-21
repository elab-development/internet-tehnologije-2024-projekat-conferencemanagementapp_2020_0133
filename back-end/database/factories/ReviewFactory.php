<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Paper;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'paper_id' => Paper::factory(),
            'reviewer_id' => User::factory(),
            'comments' => $this->faker->paragraph(),
            'recommendation' => $this->faker->randomElement(['Accept', 'Reject']),
        ];
    }
}
