<?php

namespace Database\Seeders;

use App\Models\TicketType;
use App\Models\Conference;
use Illuminate\Database\Seeder;

class TicketTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Conference::all()->each(function ($conference) {
            TicketType::create([
                'conference_id' => $conference->id,
                'name' => 'Standard',
                'description' => 'Standard ticket',
                'price' => 100.00,
                'quantity' => 50,
            ]);

            TicketType::create([
                'conference_id' => $conference->id,
                'name' => 'VIP',
                'description' => 'VIP ticket',
                'price' => 250.00,
                'quantity' => 20,
            ]);
        });
    
    }
}
