<?php

namespace App\Http\Controllers;

use App\Http\Requests\PurchaseTicketRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Models\Ticket;
use App\Models\TicketType;
use App\Mail\ETicketMail;
use App\Models\User;
use Illuminate\Support\Facades\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    public function purchaseTicket(PurchaseTicketRequest $request) {


        

        $user = User::findOrFail(Auth::id());
        $pdfs = [];
        $tickets = [];
        $ticketTypes = [];

        DB::beginTransaction();
        try {
            foreach ($request['tickets'] as $ticketData) {
                $ticketType = TicketType::findOrFail($ticketData['ticketTypeId']);
                $conferenceId = $ticketType->conference_id;
                $totalQuantity = $ticketType->quantity;
                $purchased = $ticketType->tickets()->count();
                $available = $totalQuantity - $purchased;

                // Provera da li korisnik već ima kartu za ovu konferenciju
                $alreadyHasTicket = Ticket::where('user_id', $user->id)
                    ->whereHas('ticketType', function ($query) use ($conferenceId) {
                        $query->where('conference_id', $conferenceId);
                    })
                    ->exists();

                if ($alreadyHasTicket) {
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'message' => 'You have already purchased a ticket for conference: ' . $ticketType->conference->title
                    ], 400);
                }

                if ($available <= 0) {
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'message' => 'Tickets for type ' . $ticketType->name . ' are sold out.'
                    ], 400);
                }

                $qrText = Str::uuid()->toString();

                $ticket = Ticket::create([
                    'ticket_type_id' => $ticketType->id,
                    'user_id' => $user->id,
                    'payment_method' => $request['paymentMethod'],
                    'delivery_method' => 'E-ticket',
                    'qr_code' => $qrText,
                ]);

                $qrUrl = "https://quickchart.io/barcode?type=qrcode&text=" . urlencode($qrText);
                $qrImage = file_get_contents($qrUrl);
                $qrBase64 = 'data:image/png;base64,' . base64_encode($qrImage);

                $pdf = Pdf::loadView('eticket', [
                    'user' => $user,
                    'ticket' => $ticket,
                    'ticketType' => $ticketType,
                    'qrBase64' => $qrBase64,
                ]);

                $pdfs[] = [
                    'pdf' => $pdf,
                    'filename' => $ticketType->conference->title . '-e-ticket.pdf'
                ];
                $tickets[] = $ticket;
                $ticketTypes[] = $ticketType;
            }

            DB::commit();

            // Send one email with multiple PDF attachments
            Mail::to($user->email)->send(new ETicketMail($user, $tickets, $ticketTypes, $pdfs));

            return response()->json([
                'success' => true,
                'message' => 'Tickets purchased successfully.'
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'An error occurred: ' . $e->getMessage()
            ], 500);
        }
    }
}
