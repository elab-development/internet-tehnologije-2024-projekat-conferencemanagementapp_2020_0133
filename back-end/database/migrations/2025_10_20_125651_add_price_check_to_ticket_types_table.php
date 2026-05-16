<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        
        $violations = DB::table('ticket_types')->where('price', '>=', 10000000)->count();
        if ($violations > 0) {
            throw new \RuntimeException("There are {$violations} ticket_types with price >= 10000000. Fix or remove them before running this migration.");
        }

       
        DB::statement("ALTER TABLE ticket_types ADD CONSTRAINT chk_ticket_types_price_lt_10000000 CHECK (price < 10000000)");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        
        try {
            DB::statement("ALTER TABLE ticket_types DROP CONSTRAINT IF EXISTS chk_ticket_types_price_lt_10000000");
        } catch (\Throwable $e) {
            try {
                DB::statement("ALTER TABLE ticket_types DROP CHECK chk_ticket_types_price_lt_10000000");
            } catch (\Throwable $e) {
                // ignore if DB does not support dropping this way
            }
        }
    }
};
