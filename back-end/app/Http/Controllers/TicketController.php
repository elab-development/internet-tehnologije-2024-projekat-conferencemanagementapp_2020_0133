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

        return DB::transaction(function () use ($request, $user) {

            $ticketType = TicketType::findOrFail($request['ticketTypeId']);
            $totalQuantity = $ticketType->quantity;
            $purchased = $ticketType->tickets()->count(); // assuming Ticket model ima relation ticketType->tickets()
            $available = $totalQuantity - $purchased;

            if ($available <= 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tickets for this type are sold out.'
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


            Mail::to($user->email)->send(new ETicketMail($user, $ticket, $ticketType, $pdf));
            
        });
    }
}
