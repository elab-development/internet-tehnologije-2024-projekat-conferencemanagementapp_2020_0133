<?php

namespace App\Mail;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ETicketMail extends Mailable
{
    use Queueable, SerializesModels;


    public $user;
    public $tickets;
    public $ticketTypes;
    public $pdfs;
    
    /**
     * Create a new message instance.
     */
    public function __construct($user, $ticket, $ticketType, $pdf)
    {
    $this->user = $user;
    $this->tickets = $ticket;
    $this->ticketTypes = $ticketType;
    $this->pdfs = $pdf;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $conferenceTitle = isset($this->ticketTypes[0]) ? $this->ticketTypes[0]->conference->title : 'Conference';
        return new Envelope(
            subject: 'E-Tickets for ' . $conferenceTitle,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'ticket_mail',
            with: [
                'user' => $this->user,
                'tickets' => $this->tickets,
                'ticketTypes' => $this->ticketTypes,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {

        $attachments = [];
        foreach ($this->pdfs as $pdfData) {
            $attachments[] = Attachment::fromData(function () use ($pdfData) {
                return $pdfData['pdf']->output();
            }, $pdfData['filename'], 'application/pdf');
        }
        return $attachments;
    }
}
