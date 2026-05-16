<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Conference;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AgendaItem>
 */
class AgendaItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['lecture', 'paper_presentation', 'workshop', 'panel', 'break'];
        $start = $this->faker->dateTimeBetween('+1 days', '+10 days');
        $end = (clone $start)->modify('+' . rand(30, 120) . ' minutes');

        return [
            'conference_id' => Conference::factory(),
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->paragraph(),
            'speaker_id' => User::factory(),
            'type' => $this->faker->randomElement($types),
            'start_time' => $start,
            'end_time' => $end,
        ];
    }
}
