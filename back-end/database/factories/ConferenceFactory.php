<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Conference>
 */
class ConferenceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = [
            'conference',
            'seminar',
            'webinar',
            'workshop',
            'trade_show_expo',
            'professional_development_event',
            'other'
        ];

        $startDate = $this->faker->dateTimeBetween('+1 week', '+2 months');
        $endDate = (clone $startDate)->modify('+' . rand(1, 3) . ' days');
        $submissionDeadline = (clone $startDate)->modify('-' . rand(1, 14) . ' days');

        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'start_date' => $startDate->format('Y-m-d'),
            'end_date' => $endDate->format('Y-m-d'),
            'submission_deadline' => $submissionDeadline->format('Y-m-d'),
            'location' => $this->faker->address(),
            'city' => $this->faker->city(),
            'country' => $this->faker->country(),
            'type' => $this->faker->randomElement($types),
            'capacity' => $this->faker->numberBetween(50, 500),
            'organization' => $this->faker->company(),
            'contact_email' => $this->faker->unique()->safeEmail(),
            'contact_phone' => $this->faker->phoneNumber(),
            'created_by' => User::factory(),
        ];
    }
}
