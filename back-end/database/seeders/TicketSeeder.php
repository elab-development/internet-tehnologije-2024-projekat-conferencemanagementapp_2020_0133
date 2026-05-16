<?php

namespace Database\Seeders;

use App\Models\Ticket;
use App\Models\TicketType;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $attenders = User::role('attender')->get();

        TicketType::all()->each(function ($ticketType) use ($attenders) {
            $attenders->random(min(10, $attenders->count()))->each(function ($user) use ($ticketType) {
                Ticket::create([
                    'ticket_type_id' => $ticketType->id,
                    'user_id' => $user->id,
                    'payment_method' => 'Credit card',
                    'delivery_method' => 'E-ticket',
                    'qr_code' => Str::uuid(), 
                ]);
            });
        });
    }
}
