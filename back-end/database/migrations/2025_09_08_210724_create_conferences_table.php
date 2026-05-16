<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('conferences', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->date('submission_deadline');
            $table->string('location');
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->enum('type', [
                'conference',
                'seminar',
                'webinar',
                'workshop',
                'trade_show_expo',
                'professional_development_event',
                'other'
            ]);
            $table->unsignedInteger('capacity')->nullable();
            $table->string('organization')->nullable();
            $table->string('contact_email');
            $table->string('contact_phone')->nullable();
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conferences');
    }
};
