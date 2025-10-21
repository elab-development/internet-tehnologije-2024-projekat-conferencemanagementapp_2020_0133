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
        Schema::create('papers', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('abstract');
            $table->string('file_path');
            $table->timestamp('submission_date')->useCurrent();
            $table->enum('status', ['Submitted', 'In review', 'Accepted', 'Denied'])->default('Submitted');
            $table->foreignId('topic_id')->constrained('topics')->cascadeOnDelete();
            $table->foreignId('main_author_id')->constrained('users')->cascadeOnDelete();
            $table->text('co_authors')->nullable();
            $table->foreignId('conference_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('papers');
    }
};
