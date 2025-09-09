<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\TicketType;
use App\Models\User;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ticket_type_id' => TicketType::factory(),
            'user_id' => User::factory(),
            'purchase_date' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'payment_method' => 'Credit card',
            'delivery_method' => 'E-ticket',
            'qr_code' => Str::uuid(),
        ];
    }
}
