<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        User::factory()->count(10)->create()->each(function ($user) {
            $user->assignRole('attender');
        });

        
        User::factory()->count(2)->create()->each(function ($user) {
            $user->assignRole('moderator');
        });

        
        User::factory()->count(1)->create()->each(function ($user) {
            $user->assignRole('organizer');
        });
    }
}
