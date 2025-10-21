<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('paper_id')->constrained('papers')->cascadeOnDelete();
            $table->foreignId('reviewer_id')->constrained('users')->cascadeOnDelete();
            $table->text('comments')->nullable();
            $table->enum('recommendation', ['Accept', 'Reject']);
            $table->timestamps();
        });

        DB::unprepared('
            CREATE TRIGGER update_paper_status_after_review
            AFTER INSERT ON reviews
            FOR EACH ROW
            BEGIN
                IF NEW.recommendation = "Accept" THEN
                    UPDATE papers SET status = "Accepted" WHERE id = NEW.paper_id;
                ELSEIF NEW.recommendation = "Reject" THEN
                    UPDATE papers SET status = "Denied" WHERE id = NEW.paper_id;
                END IF;
            END
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS update_paper_status_after_review');
        Schema::dropIfExists('reviews');
    }
};
