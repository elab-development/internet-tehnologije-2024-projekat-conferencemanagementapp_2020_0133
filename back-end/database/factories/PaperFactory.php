<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Topic;
use App\Models\User;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Paper>
 */
class PaperFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(6),
            'abstract' => $this->faker->paragraph(4),
            'file_path' => 'papers/' . $this->faker->uuid . '.pdf',
            'status' => $this->faker->randomElement(['Submitted', 'In review', 'Accepted', 'Denied']),
            'topic_id' => Topic::factory(),
            'main_author_id' => User::factory(),
            'co_authors' => $this->faker->optional()->sentence(3),
        ];
    }
}
